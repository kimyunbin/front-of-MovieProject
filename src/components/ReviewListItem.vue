<template>
  <body>
    <div class="card">
      <div class="card-image" v-bind:style="{backgroundImage:'url('+this.bgImg+')'}"></div>
      <div class="card-text">
        <span class="date">{{review.created_at}}</span>
        <h2>{{review.title}}</h2>
        <p>{{review.content}}내용내용내용내용내용내용내용 내용은 지우면 됩니다. reviewlistitem 에서 </p>
      </div>
      <div class="card-stats">
        <div class="stat">
          <div class="value">{{review.movie.vote_average}}</div>
          <div class="type">average</div>
        </div>
        <div class="stat border">
          <div class="value">5123</div>
          <div class="type">views</div>
        </div>
        <div class="stat">
          <div class="value">32</div>
          <div class="type">comments</div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  
  name: 'ReviewListItem',
  props: {
    review: {
      type: Object,
    }
  },
  data: function () {
    return {
      bgImg : ''
    }
  },
  created: function () {
    // console.log(this.review.movie.poster_path);
    this.bgImg = `https://image.tmdb.org/t/p/w500/${this.review.movie.poster_path}`
  }
}
</script>

<style scoped>
body{
  /* width: 33vw; */
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #262626; */
  
  overflow: hidden;
}
.card {
  display: grid;
  grid-template-columns: 300px;
  grid-template-rows: 210px 210px 80px;
  grid-template-areas: "image" "text" "stats";

  font-family: roboto;
  border-radius: 18px;
  background: white;
  box-shadow: 5px 5px 15px rgba(0,0,0,0.9);
  text-align: center;

  transition: 0.5s ease;
  cursor: pointer;
}
.card-image{
  grid-area: image ;
  /* background: url(`review.movie.poster_path`') */
  border-top-left-radius:15px;
  border-top-right-radius: 15px;
  background-size: cover;
}
.card-text {
  grid-area: text;
  margin: 25px;
}
.card-text .date{
  color: rgb(255,7,110);
  font-size: 13px;
}
.card-text p{
  color:grey;
  font-size: 15px;
  font-weight: 300;

}
.card-text h2{
  margin-top: 0px;
  font-size: 28px;
}
.card-stats {
  grid-area: stats;
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background: rgb(255,7,110)
}
.card-stats .stat {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding:10px;
  color: white;
}
.card-stats .type {
  font-size: 11px;
  font-weight: 300;
  text-transform: uppercase;
}
.card-stats .value {
  font-size: 22px;
  font-weight: 500;
}
.card-stats .border {
  border-left: 1px solid rgb(172,26,87);
  border-right: 1px solid rgb(172,26,87);
}
.card-stats .value sup {
  font-size: 12px;
}
.card:hover {
  transform: scale(1.2);
  box-shadow: 5px 5px 15px rgba(0,0,0,0.6);
}

</style>