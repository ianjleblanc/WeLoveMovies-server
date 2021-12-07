const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const moviesService = require("./movies.service");

async function list(req, res) {
  const { is_showing } = req.query;
  let data;

  if (is_showing) {
    data = await moviesService.listMoviesCurrentlyShowing()
  } else {
    data = await moviesService.list();
  }

  res.json({ data });
}

async function read(req, res) {
  const { movie } = res.locals;
  const data = await moviesService.read(movie.movie_id);
  res.json({ data });
}

async function readMovieAndTheaters(req, res) {
  const { movie } = res.locals;
  const data = await moviesService.readMovieAndTheaters(movie.movie_id);
  res.json({ data });
}

async function readMovieAndReviews(req, res) {
  const { movie } = res.locals;
  const data = await moviesService.readMovieAndReviews(movie.movie_id);
  res.json({ data });
}

// VALIDATION
async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const validMovie = await moviesService.read(movieId);

  if (validMovie) {
    res.locals.movie = validMovie;
    return next();
  } else {
    next({
      status: 404,
      message: "Movie cannot be found",
    });
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  readMovieAndTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readMovieAndTheaters),
  ],
  readMovieAndReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readMovieAndReviews),
  ],
};