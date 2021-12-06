// if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = required("cors");
const app = express();

app.use(cors())
app.use(express.json());

const notFoundHandler = require('./errors/notFoundHandler');
const errorHandler = require('./errors/errorHandler');

const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

app.use(notFoundHandler);
app.use(errorHandler);


module.exports = app;
