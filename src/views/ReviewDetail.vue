<template>
  <div class="wrapper">
    <header class="header">
      <h1>영화정보</h1>
    </header>
    <article class="main">
      <!-- <ReviewContent /> -->
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

// import ReviewContent from '@/components/ReviewContent'
import userInformation from '@/components/userInformation'
export default {
  name:'ReviewDetail',
  components : {
    // ReviewContent,
    userInformation,
  },
  
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
.header{
  background: tomato;
  height: 120px;
}

.footer{
  background:lightgreen;
  height: 80px;
}

.main {
  text-align: left;
  background: orangered;
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