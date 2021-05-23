export default {
  filters : {
    imageURL : function (movie) {
      console.log(movie)
      return "https://image.tmdb.org/t/p/w500"+movie.poster_path
    }
  }
}