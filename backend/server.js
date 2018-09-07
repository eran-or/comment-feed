const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').load();
const commentRoutes = require("./routes/comments");

const app = express();

const PORT = process.env.PORT || process.env.API_PORT || 3333;
const db = mongoose.connection;
//mongoose.connect( `mongodb+srv://eran:${process.env.MONGO_ATLAS_PW}@comment-feed-mziep.mongodb.net/test?retryWrites=true` );
mongoose.connect( "mongodb+srv://eran:"+process.env.MONGO_ATLAS_PW+"@comment-feed-mziep.mongodb.net/test?retryWrites=true");
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use("/comments", commentRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
