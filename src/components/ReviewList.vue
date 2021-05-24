<template>
<div class="container">
  <div class="row">
    <!-- -cols-sm-12 row-cols-md-6 row-cols-lg-4 row-cols-xl-3 -->
    <ReviewListItem 
      v-for="(review, idx) in reviews"
      :key ="idx"
      :review="review"
      class="col d-flex"
    />
    <!-- -sm-12 col-md-6 col-lg-4 col-xl-3 -->
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
      reviews: [],
      page : 1,
      dupCheck : true
    }
  },
  components : {
    ReviewListItem
  },
  methods : {
    // 무한스크롤 정의
    handleNotificationListScroll : function(e) {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
      // 일정 한도 밑으로 내려오면 함수 실행
      if (isAtTheBottom) this.getData();
    },

    getData : function(){
      if(this.dupCheck){
        this.dupCheck=false
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
        this.page++
        this.dupCheck = true
      }
    }

  },

  created : function () {
    this.getData()
  }
  
}
</script>

<style scoped>
</style>