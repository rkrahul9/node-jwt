const mongoose = require('mongoose');

mongoose.connect(`${process.env.DB_HOST}/book-my-deal`, { useNewUrlParser: true });

mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', function (err) {
  console.log("Connected to DB Successfully...");
});

// Error handler
mongoose.connection.on('error', function (err) {
  console.log("Error", err);
});