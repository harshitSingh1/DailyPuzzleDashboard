// server\routes\puzzleRoutes.js
const express = require('express');
const router = express.Router();
const puzzleController = require('../controllers/puzzleController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route   POST /api/puzzles
// @desc    Create new puzzle
router.post('/', authMiddleware, puzzleController.createPuzzle);

// @route   GET /api/puzzles
// @desc    Get all puzzles
router.get('/', puzzleController.getPuzzles);

// @route   DELETE /api/puzzles/:id
// @desc    Delete puzzle
router.delete('/:id', authMiddleware, puzzleController.deletePuzzle);
router.put('/:id', authMiddleware, puzzleController.updatePuzzle);

const Puzzle = require("../models/Puzzle");
const upload = require("../middlewares/upload");
const sharp = require("sharp");
const fs = require("fs-extra");
const cloudinary = require("../config/cloudinary");

function formatDate() {
  const d = new Date();
  const day = d.getDate();
  const suffix =
    day % 10 === 1 && day !== 11 ? "st" :
    day % 10 === 2 && day !== 12 ? "nd" :
    day % 10 === 3 && day !== 13 ? "rd" : "th";

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${day}${suffix} ${months[d.getMonth()]}`;
}

function parseFilename(filename) {
  const match = filename.match(/^(.+?)\s#(\d+)(?:_(\d+))?/i);
  if (!match) return null;
  return { game: match[1].trim(), number: match[2] };
}

router.post(
  "/bulk-upload",
  authMiddleware,
  upload.array("images"),
  async (req, res) => {
    try {
      const files = req.files;
      if (!files.length) return res.status(400).json({ message: "No files" });

      const grouped = {};

      // GROUP FILES
      for (const file of files) {
        const parsed = parseFilename(file.originalname);
        if (!parsed) continue;

        const key = `${parsed.game}-${parsed.number}`;
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(file.path);
      }

      // PROCESS EACH PUZZLE
      for (const key in grouped) {
        const [game, number] = key.split("-");
        const uploadedUrls = [];

        for (const imgPath of grouped[key]) {
          const compressedPath = imgPath + "-compressed.png";

          await sharp(imgPath)
            .resize({ width: 1200 })
            .png({ quality: 80 })
            .toFile(compressedPath);

          const result = await cloudinary.uploader.upload(compressedPath, {
            folder: "daily-puzzle-solve/puzzles",
          });

          uploadedUrls.push(result.secure_url);

          await fs.remove(imgPath);
          await fs.remove(compressedPath);
        }

        const heading = `Linkedin ${game} Solution #${number} (${formatDate()})`;

        await Puzzle.create({
          heading,
          ytVideo: "",
          screenshots: uploadedUrls,
        });

        const regex = new RegExp(game, "i");

        const oldPuzzles = await Puzzle.find({
          heading: { $regex: regex },
        })
          .sort({ createdAt: -1 })
          .skip(10); // keep latest 10

        for (const old of oldPuzzles) {
          for (const url of old.screenshots) {
            try {
              const publicId = url
                .split("/upload/")[1]
                .split(".")[0];

              await cloudinary.uploader.destroy(publicId);
            } catch (e) {}
          }
          await Puzzle.findByIdAndDelete(old._id);
        }
      }

      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

module.exports = router;

