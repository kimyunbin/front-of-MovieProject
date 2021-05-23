<template>
  <div class="wrapper">
    <div class="header">
      <MovieDetailMain :movie="detail.movie"/>
    </div>
    <article class="main">
      <ReviewContent />
    </article>
    <aside class="aside aside1">
      <userInformation />
    </aside>
    <!-- <aside class="aside aside2">
      <h1>Aside2</h1>
    </aside> -->
    <footer class="footer">
      <h1>댓글</h1>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'

const BACKEND = process.env.VUE_APP_BACKEND_LINK
import ReviewContent from '@/components/ReviewContent'
import MovieDetailMain from '@/components/MovieDetailMain.vue'
import userInformation from '@/components/userInformation'
export default {
  name:'ReviewDetail',
  data : function(){
    return {
      detail : "",
    }
  },
  components : {
    ReviewContent,
    userInformation,
    MovieDetailMain,
  },
  created: function () {
    axios({
        method: 'get',
        url: `${BACKEND}community/${this.$route.params.detail}`,
      })
        .then(res => {
          console.log(res)
          this.detail = res.data[0]
        })
        .catch(err => {
          console.log(err)
        })
  }
  
}
</script>

<style scoped>
.wrapper{
  display: flex;
  flex-flow: row wrap;
  text-align: center;
}

.wrapper > * {
  padding: 10px;
  margin: 10px;
  flex: 1 100%;
  border-radius: 10px;
}

.footer{
  background:lightgreen;
  height: 80px;
}

.main {
  text-align: left;
  /* background: orangered; */
  height: 300px;
  font-size: 24px;
}

.aside1{
  background: gold;
}
.aside2{
  /* background: hotpink; */
}

@media all and (min-width: 800px){
  .main {
    flex: 3;
  }
  .aside1 {
    order: 1;
  }
  .aside2 {
    order: 2;

  }
  .main{
    order: 2;
  }
  .footer{
    order: 4;
  }
}

@media all and (min-width: 600px){
  .aside{
    flex:1;
  }
}
</style>