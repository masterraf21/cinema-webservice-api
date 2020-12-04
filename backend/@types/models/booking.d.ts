declare global {
  namespace Model {
    interface BookingType {
      user: Model.UserType
      showtime: Model.ShowtimeType
      movies: Array<Model.MovieType>
    }

    interface IBooking extends Document {
      user?: Model.IUser
      showtime?: Model.IShowtime
      movies?: Array<Model.IMovie>
    }
  }
}

export {}
