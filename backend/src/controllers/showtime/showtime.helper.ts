import { Model } from 'mongoose'
import { ShowtimeModel, MovieModel } from '../../models'

async function getMoviebyName(movies: string[]): Promise<(Model.IMovie | null)[]> {
  const promises = movies.map(async (movie) => {
    const imovie: Model.IMovie | null = await MovieModel.findOne({
      title: movie
    })
    return imovie
  })
  const result = await Promise.all(promises)
  return result
}
async function createShowtimeMovieName(when: Date, movies: string[]) {
  try {
    const movieObj = await getMoviebyName(movies)
    // const filtered = movieObj.filter(function (el) {
    //   return el != null
    // })
    return movieObj
    // const showtime: Model.ShowtimeType = {
    //   date: when,
    //   movies: movieFiltered
    // }
    // const result = await createShowtime(showtime)
    // return result
  } catch (err) {
    return new Error(err.message)
  }
}
const createShowtime = async (showtimeData: Model.ShowtimeType) => {
  try {
    const showtime: Model.IShowtime = new ShowtimeModel(showtimeData)
    const result = await showtime.save()
    return result
  } catch (err) {
    throw new Error(err.message)
  }
}

export { getMoviebyName, createShowtime, createShowtimeMovieName }
