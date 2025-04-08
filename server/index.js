// index.js
const app = require('./app');
const PORT = process.env.PORT || 5000;

// Only listen locally when not in production
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;