/* eslint-disable @typescript-eslint/no-unused-vars */
// import from

import * as uHelper from '../src/controllers/user/user.helper'
import * as movieHelper from '../src/controllers/movie/movie.helper'
import * as showtimeHelper from '../src/controllers/showtime/showtime.helper'
import * as showController from '../src/controllers/showtime/showtime.controller'
import { connectDB, closeDB } from '../src/utils'
import { Model } from 'mongoose'
import { ShowtimeModel } from '../src/models'

async function testUserHelper(): Promise<void> {
  try {
    connectDB()
    const userData: Model.UserType = {
      username: 'sna',
      password: 'asdfa',
      full_name: 'salroi',
      email: 'coretanaku@gmail.com',
      gender: 'Female'
    }
    const result = await uHelper.createUser(userData)
    if (result) {
      console.log(`Created with username ${result.username} and password ${result.password}`)
    }
    await closeDB()
    process.exit(0)
  } catch (err) {
    console.error(`${err}`)
    await closeDB()
    process.exit(0)
  }
}

async function testMovieHelper(): Promise<void> {
  try {
    connectDB()
    const movieData: Model.MovieType = {
      title: `To All The Boys I've loved Before`,
      director: 'Jeff Kinney',
      rating: 5.0,
      summary: 'A guys meets girl then falls in love'
    }
    const result = await movieHelper.createMovie(movieData)
    if (result) {
      console.log(`Created movie with title: ${result.title}`)
    }
    await closeDB()
    process.exit(0)
  } catch (err) {
    console.error(`${err}`)
    await closeDB()
    process.exit(0)
  }
}

async function getMovieName(): Promise<void> {
  try {
    connectDB()
    const movies: string[] = ['2001: A Space Oddysey', 'Eyes wide', 'the good place']
    const result = await showtimeHelper.getMoviebyName(movies)
    console.log(result)
    await closeDB()
    process.exit(0)
  } catch (err) {
    console.error(`${err}`)
    await closeDB()
    process.exit(0)
  }
}

async function testShowtime() {
  try {
    const movies: string[] = ['2001: A Space Oddysey', 'Eyes wide', 'the good place']
    const moviee = await showtimeHelper.createShowtimeMovieName(new Date('2020-01-01'), movies)
    console.log(moviee)
  } catch (err) {
    console.error(`${err}`)
    await closeDB()
    process.exit(0)
  }
}

function testValidate() {
  try {
    // connectDB()
    const arr: any[] = ['5fca334278ab5a1100e6890e', 'aaa']
    const res = showController.validateObj(arr)
    console.log(res)
    process.exit(0)
  } catch (error) {
    process.exit(0)
  }
}

async function testValidateMovie() {
  try {
    await connectDB()
    //  '5fca33a37008cb5828aee15d'
    const arr: any[] = ['5fca334278ab5a1100e6890e', '5fca33a37008cb5828aee15d']
    const res = await showController.validateMovie(arr)
    console.log(res)
    await closeDB()
    process.exit(0)
  } catch (err) {
    console.error(`${err}`)
    await closeDB()
    process.exit(0)
  }
}

async function createShowtime() {
  try {
    await connectDB()
    const showtime = {
      date: new Date(Date.now()),
      movies: ['5fca334278ab5a1100e6890e', '5fca35645eb3b551c4f0b1de']
    }
    const show = new ShowtimeModel(showtime)
    await show.save()
    console.log(show)
    await closeDB()
    process.exit(0)
  } catch (err) {
    console.error(`${err}`)
    await closeDB()
    process.exit(0)
  }
}
// testUserHelper()
// testMovieHelper()
// getMovieName()
// testShowtime()
// testValidateMovie()
createShowtime()
