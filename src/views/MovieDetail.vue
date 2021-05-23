<template>
  <div id="container">
    <MovieDetailMain :movie="movie"/>
    <iframe width="100%" height="700px" :src="movie | videoURL" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</template>

<script>
import MovieDetailMain from '@/components/MovieDetailMain.vue'
import axios from 'axios'

const BACKEND = process.env.VUE_APP_BACKEND_LINK


export default {
  name : 'MovieDetail',
  components : {
    MovieDetailMain,
  },
  data : function(){
    return {
      movie : ''
    }
  },
  methods : {
    getMovie : function(){
      const url = BACKEND + 'movies/detail/' + this.$route.params.movie_pk
      console.log(url)
      axios.get(url)
        .then((res) => {
          console.log(res)
          this.movie = res.data[0]
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  filters : {
    videoURL : function(movie) {
      const youtubeURL = "https://www.youtube.com/embed/"
      return youtubeURL+movie.video_path
    }
  },
  created : function(){
    this.getMovie()
  }
}
</script>

<style>
#container {
 background: #13151f;
}
</style>