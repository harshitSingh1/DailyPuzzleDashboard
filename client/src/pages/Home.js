// client\src\pages\Home.js
import { useState, useEffect } from 'react';
import PuzzleForm from '../components/PuzzleForm';
import PuzzleList from '../components/PuzzleList';
import { getPuzzles, createPuzzle, deletePuzzle, updatePuzzle } from '../api';

const Home = () => {
  const [puzzles, setPuzzles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPuzzles = async () => {
      try {
        const { data } = await getPuzzles();
        setPuzzles(data);
      } catch (err) {
        setError('Failed to load puzzles');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPuzzles();
  }, []);

  const handleAddPuzzle = async (puzzle) => {
    try {
      const { data } = await createPuzzle(puzzle);
      setPuzzles([data, ...puzzles]);
    } catch (err) {
      setError('Failed to add puzzle');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePuzzle(id);
      setPuzzles(puzzles.filter(puzzle => puzzle._id !== id));
    } catch (err) {
      setError('Failed to delete puzzle');
      console.error(err);
    }
  };

  const handleUpdate = async (id, updatedPuzzle) => {
    try {
      const { data } = await updatePuzzle(id, updatedPuzzle);
      setPuzzles(puzzles.map(puzzle => 
        puzzle._id === id ? data : puzzle
      ));
    } catch (err) {
      setError('Failed to update puzzle');
      console.error(err);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page">
      <h1>Puzzle Solutions</h1>
      <PuzzleForm onSubmit={handleAddPuzzle} />
      <PuzzleList 
        puzzles={puzzles} 
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default Home;

