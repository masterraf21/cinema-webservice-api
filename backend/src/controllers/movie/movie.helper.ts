import { MovieModel } from '../../models'

const createMovie = async (movieData: Model.MovieType) => {
  try {
    const movie: Model.IMovie = new MovieModel(movieData)
    const result = await movie.save()
    return result
  } catch (err) {
    throw new Error(err.message)
  }
}

export { createMovie }
