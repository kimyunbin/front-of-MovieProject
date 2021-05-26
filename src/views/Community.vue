<template>
  <div id="background" ref="scrollTarget"> 
    <!--  @scroll="handleNotificationListScroll"  -->
    <ReviewList :reviews="reviews" />
  </div>
</template>

<script>
import ReviewList from '@/components/ReviewList'
import axios from 'axios'
const BACKEND = process.env.VUE_APP_BACKEND_LINK

export default {
  name: 'Community',
  data: function () {
    return {
      reviews: [],
      page : 1,
      dupCheck : true
    }
  },
  components : {
    ReviewList
  },
  methods : {
    // 무한스크롤 정의
    handleNotificationListScroll : function() {
      console.log("작동체크")
      const { scrollHeight, scrollTop, clientHeight } = this.$refs.scrollTarget //e.target;//
      const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
      console.log(scrollHeight, scrollTop, clientHeight,isAtTheBottom)
      // 일정 한도 밑으로 내려오면 함수 실행
      if (isAtTheBottom) this.getData();
    },

    getData : function(){
      if(this.dupCheck){
        this.dupCheck=false
        console.log("페이지:"+this.page)
        axios({
          method: 'get',
          url: `${BACKEND}community/?page=${this.page}`,
        })
          .then(res => {
            console.log(res)

            this.reviews= this.reviews.concat(res.data)

            
            // this.$store.dispatch('login',res)
            // this.$router.push({ name: 'Movies'})
            // commit('LOGIN',res)
            // localStorage.setItem('jwt', res.data.token)
            // this.$emit('login')
            // this.$router.push({ name: 'Intro' })
            this.page++
            this.dupCheck = true
          })
          .catch(err => {
            console.log('sdsdsd');
            console.log(err)
          })

      }
    }

  },

  created : function () {
    this.getData()
  },
  mounted () {
    window.addEventListener('scroll', this.handleNotificationListScroll)
  }
}
</script>


<style scoped>

#background{
  background-color: #E6E6E6;
}
</style>