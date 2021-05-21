<template>
	<swiper class="swiper" ref="mySwiper" 
		:options="swiperOptions" 
		@slideChange="slideChangeTransitionStart"
	>

		<swiper-slide>
      <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
    </swiper-slide>
		
		<!-- pagination -->
		<div class="swiper-pagination" slot="pagination"></div>
        
		<!-- navigation -->
		<div class="swiper-button-prev swiper-btn-prev" slot="button-prev"></div>
		<div class="swiper-button-next swiper-btn-next" slot="button-next"></div>
	</swiper>
</template>


<script>
	import Vue from 'vue'
	import VueAwesomeSwiper from 'vue-awesome-swiper'
	import 'swiper/css/swiper.css'
	Vue.use(VueAwesomeSwiper);

	import {Swiper,SwiperSlide} from 'vue-awesome-swiper'

	export default {
		name: 'ListItem',
		components: {
			Swiper,
			SwiperSlide
		},
		methods: {
			slideChangeTransitionStart() {
				console.log(this.swiper.activeIndex); //현재 index값 얻기
			}
		},
		data() {
			return {
				swiperOptions: {
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          coverflowEffect: {
            rotate: 30,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows : true,
          },
          autoplay: {
            delay: 2500,
            disableOnInteraction: true,
          },
          loop : true,
					pagination: {
						el: '.swiper-pagination'
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},                    
				},
			}
		},

		//참조하고 있는 값이 변경될 때마다 정의된 계산식에 따라 값을 출력
		computed: {
			swiper() {
				return this.$refs.mySwiper.$swiper;
			}
		},

		//el이 새로 생성된 vm.$el로 인스턴스가 마운트 된 직후
		mounted() {
			//console.log('Current Swiper instance object', this.swiper)
			//this.swiper.slideTo(3, 1000, false)
		}


	}
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}
.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 500px;
  height: 600px;
  background: #fff;
  /* 반사 */
  -webkit-box-reflect : below 1px linear-gradient(transparent, transparent, #0006);
}

.swiper-slide img {
  display: block;
  width: 100%;
}
/* 경계선 */
.contentBx
{
  display : flex;
  flex-direction : column;
  justify-content: flex-end;
  text-align: center;
  transition: 1s;
  padding-bottom : 50px;
}
.contentBx h2
{
  position: absolute;
  top: 85%;
  right : 50%;
  transform : translateX(50%);
  font-weight: 600;
  letter-spacing: 1px;
  color: #fff;
  transition: 0.5s;
}
.contentBx:hover h2{
  top: 68%;
}


.contentBx .size,
.contentBx .color
{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  transition: 0.5s;
  opacity: 0;
  visibility: hidden;
}
.contentBx:hover  .size
{
  /* opacity: 1; */
  opacity: 1;
  visibility: visible;
  transition-delay: 0.6s;
}
.contentBx:hover .color
{
  /* opacity: 1; */
  opacity: 1;
  visibility: visible;
  transition-delay: 0.5s;
}
.contentBx .size h3,
.contentBx .color h3
{
  color: #fff;
  font-weight: 300;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-right: 10px;
}
.contentBx .size span
{
  width: 26px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  font-size: 14px;
  display: inline-block;
  color: #111;
  background: #fff;
  transition: 0.5s;
  color: #111;
  border-radius: 4px;
  margin-right: 7px;
  cursor: pointer;
}
.swiper-slide .contentBx .size span:hover
{
  background: #9bdc28;
}
.swiper-slide .contentBx .color span
{
  width: 20px;
  height: 20px;
  background: #ff0;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
}

.contentBx a
{
  display: inline-block;
  padding: 10px 20px;
  background: #fff;
  border-radius: 4px;
  margin-top: 10px;
  text-decoration: none;
  font-weight: 600;
  width : 100px;
  color: #111;
  margin-left : auto;
  margin-right: auto;
  opacity: 0;
  transform: translateY(50px);
  transition: 0.5s;
}
.contentBx:hover a
{
  opacity: 1;
  transform: translateY(0px);
  transition-delay: 0.75s;
}


</style>