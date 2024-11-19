const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

//connect to MongoDB
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect('mongodb://localhost:27017/gigfinder', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Successfully connected to database'))
    .catch((err: Error) => console.error('Database connection error:', err));
}

// Start server
if (require.main === module) {
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}