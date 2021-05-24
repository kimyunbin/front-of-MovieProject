export default {
  methods : {
    setToken: function (token) {
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
  },
  filters : {
    imageURL : function (movie) {
      console.log(movie)
      return "https://image.tmdb.org/t/p/w500"+movie.poster_path
    }
  }
}