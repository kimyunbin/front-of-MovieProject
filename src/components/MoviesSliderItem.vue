<template>
  <!-- <img class="swiper-slide" :src="imgSrc"/> -->
  <div class="swiper-slide"></div>
</template>

<script>
export default {
  name : 'MoviesSliderItem',
  props : {
    movie : {
      type : Object
    }
  },
  computed : {
    imgSrc : function(){
      return "https://image.tmdb.org/t/p/w500"+this.movie.poster_path
    },
    styleSwiper : function(){
      return "background-image:url("+this.imgSrc+")"
    }
  },

}
</script>

<style>

</style>