<template>
  <div>

    <MoviesSlider :movies="latest_movies"/>
  </div>
</template>

<script>
import MoviesSlider from '@/components/MoviesSlider.vue'

import axios from 'axios'

const BACKEND = process.env.VUE_APP_BACKEND_LINK
export default {
  
  name : 'Movies',
  components : {
    MoviesSlider,

  },
  data : function(){
    return {
      latest_movies : [],
      highscore_movies : [],
      like_movies : [],
    }
  },
  methods : {
    getLatestMovies : function(){
      const link = 'movies'
      axios.get(BACKEND+link)
        .then(res =>{
          this.latest_movies = res.data.latest_movies
          this.highscore_movies = res.data.highscore_movies
          this.like_movies = res.data.like_movies
        })
    }
  },
  created : function(){
    this.getLatestMovies()
  }
}
</script>

<style>

</style>