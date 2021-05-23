<template>
<div class="container">
  <div class="row">
    <ReviewListItem 
      v-for="(review, idx) in reviews"
      :key ="idx"
      :review="review"
      class="col-sm-12 col-md-6 col-lg-4"
    />
  </div>
</div>

</template>

<script>
import ReviewListItem from'@/components/ReviewListItem'
import axios from 'axios'
const BACKEND = process.env.VUE_APP_BACKEND_LINK
export default {
  name: 'ReviewList',
  data: function () {
    return {
      reviews: []
    }
  },
  components : {
    ReviewListItem
  },
  created : function () {
      axios({
          method: 'get',
          url: `${BACKEND}community/`,
        })
        .then(res => {
          console.log(res)
          this.reviews = res.data
          // this.$store.dispatch('login',res)
          // this.$router.push({ name: 'Movies'})
          // commit('LOGIN',res)
          // localStorage.setItem('jwt', res.data.token)
          // this.$emit('login')
          // this.$router.push({ name: 'Intro' })
        })
        .catch(err => {
          console.log('sdsdsd');
          console.log(err)
        })
    }
  
}
</script>

<style scoped>
.container{
  background: url("../assets/review/background.jpg");
}
</style>