<template>
  <div>
    <div class="container">
    <div class="card" v-bind:class="{active:isActive}">
      <div class="icon">
        <div v-if ="detail.liked">
          <span class="value"><i class="fas fa-thumbs-up fa-lg"></i></span>
          <span class="type">이 영화를 추천해요!</span>
        </div>
        <div v-else>
          <div class="value"><i class="far fa-angry fa-lg"></i></div>
          <div class="type">이 영화는 별로..</div>
        </div>
      </div>
      <div class="content"> 
         <h3>{{detail.title}}</h3>
          <p>{{detail.content}}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad in illum, quis veritatis iste iure placeat illo ex amet deserunt at cum voluptates quibusdam eveniet dolor atque est sequi eos!
          </p>
      </div>
      <a class="more" v-bind:class="{active:isActive}" @click="readmore"></a>
    </div>
  </div>
    <hr>
      <vue-star animate="animated bounceIn" color="#F05654">
        <i slot="icon" class="fa fa-heart"></i>
      </vue-star>

  </div>
</template>

<script>
import axios from 'axios'
import VueStar from 'vue-star'
const BACKEND = process.env.VUE_APP_BACKEND_LINK
export default {
  name:'ReviewContent',
  components : {
    VueStar,
  },
  data: function () {
    return {
      detail : '',
      isActive: false,
    }
  },
  method:{
    readmore : function () {
      this.isActive = !this.isActive
    },

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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins',sans-serif;
}

.type{
  color: #fff;
}
body {
  display:flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #313131;
}
.container{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width:auto;
  flex-wrap: wrap;
}
.container .card{
  position: relative;
  width: 300px;
  padding:20px;
  margin: 20px;
  background: #3f3f3f;
}
.container .card::before{
  content:'';
  position: absolute;
  top: 0;
  right: 0;
  border:20px solid transparent;
  border-top:20px solid #17e78c;
  border-right: 20px solid #17e78c;
}
.container .card.active::before{
  border-top: 20px solid #ff3b7e;
  border-right: 20px solid #ff3b7e;
}
.container .card .icon {
  margin-bottom: 10px;
}
.container .card .icon img {
  max-width: 90ox;
}
.container .card.active .content {
  height: auto;

}
.container .card .content::before{
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(transparent,#3f3f3f);
}
.container .card.active .content::before{
  display:none;
}
.container .card .content {
  position: relative;
  height:215px;
  overflow: hidden;
}
.container .card .content h3{
  color: #fff;
  font-size: 1.4em;
  font-weight: 600;
  margin-bottom: 10px;
}
.container .card .content p {
  font-weight: 300;
  color: #ccc;

}
.container .card .more {
  position: relative;
  padding: 10px 15px;
  background: #17e78c;
  margin-top: 15px;
  display: inline-block;
  cursor: pointer;
  text-transform: uppercase;
  color: #383838;
  font-weight: 500;
  letter-spacing: 2px;
  font-size: 14px;
}
.container .card.active .more{
  background: #ff3b7e;
  color: #fff;
}
.container .card .more::before{
  content:'Read more';
}
.container .card.active .more::before{
  content:'Read Less';
}
</style>