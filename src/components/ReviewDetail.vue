<template>
  <div class="ink_wrap lightmode" style="padding-bottom:189px;">
	<div id="container" class="ink_container header_typeB3 containerN">
	<div id="ink_wrapper" class="ink_wrapper clearfix">
	<div id="content" class="ink_content" role="main">
	<section class="ink_board guest_mode">

  <article class="ink_atc round20 has_list ">
		<!-- 글제목 부분 -->
		<header class="atc_header">
			<h1>
				<a href="" class="atc_title">{{detail.title}}</a>
			</h1>
			<div class="atc_info clearfix">
				<span class="atc_nickname">
				<span class="inkpf color round small"><Gravatar :email="detail.user.email" class="profile-img inkpf_img"/></span>
					<router-link :to="{name : 'Mypage', params : {username: this.detail.user.username}}">{{detail.user.username}}</router-link>
        </span>
				<span class="text_en atc_date font_grey1"><time datetime="2021-05-22T18:05:58+09:00">{{ detail.created_at | timeFor }}</time></span>
				<div class="atc_info_right text_en font_grey1">				
					<span class="count_vote pt_col"><i class="fas fa-heart" title="추천 수"></i> {{like_users+funny_users+helpful_users}}</span>		 		
					<span class="count_cmt pt_col2"><i class="fas fa-comment-dots" tilte="댓글"></i> {{detail.comment_count}}</span>
				</div>
			</div>
		</header>
    
		<div class="atc_body">
		  <!-- 글 내용 부분 -->
			<div class="document_65603779_42982247 rhymix_content xe_content" data-pswp-uid="1">
				<p>
					<img :src="detail.movie|imageURL" alt="movie_poster" data-pswp-pid="1">
				</p>
        <br>
				<p>{{detail.content}}</p>
			</div>
      <br>
      <br>

			<!-- 좋아요 및 버튼부분 -->
			<div class="atc_buttons clearfix ">
				<span class="atc_vote " >
						<button class="bt_vote vote_area " type="button">
							   <VueStar animate="animated bounceIn" color="#F05654"  >
    								<i slot="icon" class="fa fa-heart " @click="likeusers"></i>
									</VueStar>
              <span class="voted_count text_en">{{like_users}}</span>
            </button>
				</span>
				<span class="atc_vote">
						<!-- <button class="bt_vote vote_area" type="button" @click="funnyusers">
							<vue-star animate="animated bounceIn" color="#F05654">
    								<i slot="icon" class="far fa-grin-hearts"></i>
							</vue-star>
              <span class="voted_count text_en">{{funny_users}}</span>
						</button> -->

						<button class="bt_vote vote_area" type="button">
							<VueStar animate="animated bounceIn" color="#F05654" >
								<i slot="icon" class="far fa-grin-hearts" ref="funnyusers"  @click="funnyusers"></i>
							</VueStar>
              <span class="voted_count text_en">{{funny_users}}</span>
						</button>

				</span>
				<span class="atc_vote">
						<button class="bt_vote vote_area" type="button">
							<VueStar animate="animated bounceIn" color="#F05654" :check="true" >
									<i slot="icon" class="fas fa-award" @click="helpfulusers"></i>
									{{helpful_users}}
							</VueStar>
						<span class="voted_count text_en">{{helpful_users}}</span></button>
				</span>
			</div>
		</div>

		<!--댓글부분  -->
		<div id="comment" class="cmt cmt_bubble">
			<div class="cmt_wrap has_top">
				<!-- 댓글리스트 -->
				<div class="cmt_list">
          <CommentListItem 
            v-for="(comment, idx) in comments"
            :key ="idx"
            :comment="comment"
            />
			</div>
			</div>

			<!-- 댓글 작성부분 -->
			<div class="cmt_write cmt_write_unit">
				<span class="inkpf round"><Gravatar :email="useremail" class="profile-img inkpf_img"/></span>
				<form v-on:submit.prevent="commentCreate" action="/" method="post" class="cmt_form" onsubmit="" editor_sequence="65603779">
					<input type="hidden" name="error_return_url" value="/movietalk/65603779?category=376">
					<input type="hidden" name="act" value="dispBoardContent">
					<input type="hidden" name="mid" value="movietalk">
					<input type="hidden" name="document_srl" value="65603779">
					<input type="hidden" name="comment_srl" value="">
					<input type="hidden" name="content" value="">
					<div class="cmt_write_input text_ver">
						<input type="hidden" name="use_html" value="Y">
						<input type="hidden" id="htm_65603779" value="n">
						<textarea class="cmt_textarea" id="editor_65603779" cols="50" rows="4" placeholder="댓글 내용을 입력해주세요." style="width: 100%;" @keyup.enter="commentCreate" v-model="commentContent"></textarea>
					</div>
					<div class="cmt_write_option">
						<!-- <button class="bt_write_type unit" type="button" onclick="">
							<i class="fas fa-chevron-circle-right"></i> 에디터 모드
						</button> -->
						<!-- <span class="write_option"></span> -->
						<div class="bt_area bt_right">
							<!-- <button class="ib ib2 ib_mono bt_vote_submit" onclick="" type="submit">
								<i class="fas fa-heart pt_col"></i> + 등록
							</button>											 -->
							<button class="ib ib2 ib_color" type="submit">댓글 등록</button>
						</div>
					</div>
				</form>
			</div>

			<!-- 댓글부분 끝 -->
		</div>

	</article>

	</section>
	</div>
	</div>
	</div>
	</div>
</template>

<script>
import axios from 'axios'
import Gravatar from 'vue-gravatar'
import jwt_decode from "jwt-decode";
//import VueStar from 'vue-star'
import movieMixin from "@/mixins/movieMixin"
import CommentListItem from '@/components/CommentListItem'
import VueStar from '@/components/VueStar'

const BACKEND = process.env.VUE_APP_BACKEND_LINK
export default {
  name : "ReviewDetail",
  components : {
    CommentListItem,
		Gravatar,
    VueStar,
  },
  mixins : [movieMixin],
  data: function () {
    return {
      detail : '',
      like_users: '',
      funny_users:'',
      helpful_users: '',
      comments: [],
			commentContent: '',
			useremail:'',
			isActive:'heart-active',
    }
  },
  methods:{
    setToken: function () {
      const config = {
        Authorization: `JWT ${this.$store.state.token}`
      }
      return config
    },
    likeusers : function () {
      axios({
        method: 'post',
        url: `${BACKEND}community/${this.$route.params.detail}/like/`,
        headers: this.setToken(),
      })
        .then(res => {
          // console.log(res)
          this.like_users = res.data.count
        })
        .catch(err => {

          console.log(err)
        })
    },
    funnyusers : function () {
			// this.$refs.funnyusers.click()
      axios({
        method: 'post',
        url: `${BACKEND}community/${this.$route.params.detail}/funny/`,
        headers: this.setToken(),
      })
        .then(res => {
          // console.log(res)
          this.funny_users = res.data.count       
        })
        .catch(err => {
          console.log(err)
        })
    },
    helpfulusers : function () {
      axios({
        method: 'post',
        url: `${BACKEND}community/${this.$route.params.detail}/helpful/`,
        headers: this.setToken(),
      })
        .then(res => {
          // console.log(res)
          this.helpful_users = res.data.count        
        })
        .catch(err => {
          console.log(err)
        })
    },
		commentCreate: function () {
			axios({
        method: 'post',
        url: `${BACKEND}community/${this.detail.id}/comment/`,
        headers: this.setToken(),
				data: {
					'content':this.commentContent
					}
      })
        .then(res => {
          console.log(res)
					this.$set(this.comments,0,res.data.content)
					this.test()
					this.commentContent = ''
        })
        .catch(err => {
          console.log(err)
        })
		},
		test : function () {
			axios({
        method: 'get',
        url: `${BACKEND}community/${this.$route.params.detail}`,
      })
      .then(res => {
        // console.log(res)
        this.detail = res.data[0]
        this.comments = res.data[0].comment_set
        this.like_users = res.data[0].like_users.length
        this.funny_users = res.data[0].funny_users.length
        this.helpful_users = res.data[0].helpful_users.length
      })
      .catch(err => {
        console.log(err)
      })
		
		},
   
  },
  created: function () {
    axios({
        method: 'get',
        url: `${BACKEND}community/${this.$route.params.detail}`,
      })
      .then(res => {
        // console.log(res)
        this.detail = res.data[0]
        this.comments = res.data[0].comment_set
        this.like_users = res.data[0].like_users.length
        this.funny_users = res.data[0].funny_users.length
        this.helpful_users = res.data[0].helpful_users.length
				const decoded = jwt_decode(this.$store.state.token)
		    this.useremail = decoded.email
      })
      .catch(err => {
        console.log(err)
      })
		
  }
}
</script>

<style>
.VueStar {
	position: absolute;
	transform: translate(-48%,-30%);
}
/* * {
  background: #262626;

} */
	a img
{
	border:0
}
	[hidden]
{
	display:none
}
.rhymix_content,.xe_content
{
	font-family:나눔고딕,NanumGothic,Malgun Gothic,sans-serif;
	font-size:13px;
	line-height:180%;
	word-break:normal;
	word-wrap:break-word
}
	a
{
	text-decoration:none;
	outline:0
}
	a:hover
{
	text-decoration:none
}
	a:visited
{
	text-decoration:none
}
	a:active
{
	text-decoration:none
}
	button
{
	outline:0;
	margin:0
}
	header,section
{
	display:block
}
	button
{
	cursor:pointer;
	margin:0;
	-webkit-font-smoothing:subpixel-antialiased!important;
	border:none
}
	button
{
	padding:0;
	background:0 0
}
	h1,h2,h3,h4,h5
{
	padding:0;
	margin:0;
	font-weight:400
}
	p
{
	padding:0;
	margin:0
}
.round10
{
	border-radius:10px
}
.round15
{
	border-radius:15px
}
.round20
{
	border-radius:20px
}
.pt_star
{
	font:15px/15px verdana
}
.inkpf
{
	display:inline-block;
	width:40px;
	height:40px;
	background-size:cover;
	overflow:hidden;
	vertical-align:middle
}
.inkpf.round
{
	border-radius:50%
}
.inkpf.small
{
	width:30px;
	height:30px
}
.inkpf.color
{
	background-color:#efefef
}
.inkpf_img
{
	width:100%;
	height:auto
}
.ib
{
	display:inline-block
}
.ib i
{
	margin-right:3px
}
.ib i.only
{
	margin-right:0;
	transition-property:color;
	transition-duration:.3s
}
.ib_color
{
	color:#fff
}
.ib.ib_color i.only
{
	color:#fff
}
.bt_right .ib
{
	margin-left:3px;
	vertical-align:middle
}
.ink_wrap
{
	position:relative;
	min-height:100%;
	box-sizing:border-box;

}
	body
{
	font-size:14px;
	-webkit-font-smoothing:subpixel-antialiased
}
	a,button
{
	transition-property:color,background-color,border-color;
	transition-duration:.3s
}
	button
{
	font-size:14px
}
.ib
{
	height:42px;
	line-height:42px;
	padding:0 20px;
	border-radius:10px;
	position:relative;
	overflow:hidden;
	font-size:14px;
	z-index:1
}
.ib::before
{
	content:'';
	position:absolute;
	left:0;
	top:100%;
	width:100%;
	height:100%;
	border-radius:50%;
	transition-property:top,border-radius;
	transition-duration:.5s;
	z-index:-1
}
.ib:hover::before
{
	top:50%
}
.ib2
{
	height:32px;
	line-height:32px;
	padding:0 11px;
	border-radius:5px;
	font-size:13px
}
.ink_wrap .xe_content
{
	font-family:NanumGothic,'apple sd gothic neo',sans-serif
}
.ink_bubble_wrap
{
	position:relative;
	display:inline-block
}
.ink_bubble:not(.bubble_left)
{
	left:50%;
	top:-35px;
	transform:translateX(-50%);
	transition-property:top,opacity
}
.ink_bubble
{
	position:absolute;
	width:0;
	height:0;
	overflow:hidden;
	background-color:#222;
	border-radius:5px;
	white-space:nowrap;
	font-size:11px!important;
	line-height:100%!important;
	font-weight:400!important;
	color:#fff;
	opacity:0;
	transition-duration:.3s;
	z-index:1
}
.has_bubble:hover+.ink_bubble:not(.bubble_left)
{
	top:-25px;
	opacity:1;
	width:auto;
	height:auto;
	padding:6px 6px 4px;
	overflow:visible
}

.ink_wrap
{
	padding-bottom:200px
}
.ink_container
{
	margin:0 auto;
	border-top:1px solid transparent
}
.ink_header
{
	margin-bottom:25px
}
.ink_wrapper
{

	padding-bottom:25px
}
.ink_content
{
	width:100%;
}
.ink_bt_top
{
	display:none;
	position:fixed;
	right:25px;
	bottom:25px;
	width:40px;
	height:40px;
	line-height:40px;
	border-radius:20px;
	z-index:99
}
.ink_board
{
	position:relative;
}
.atc_vote button
{
	display:inline-block;
	height:36px;
	line-height:36px;
	padding:0 15px
}
.atc_vote .bt_vote
{
	margin-right:5px
}
.atc_vote .voted_count
{
	display:inline-block;
	padding-left:15px;
	margin-left:15px;
	transition-property:border-color;
	transition-duration:.3s
}
.atc_buttons_etc .ink_bubble_wrap
{
	display:inline-block;
	margin-left:5px
}
.atc_buttons_etc .ib
{
	display:inline-block;
	width:36px;
	height:36px;
	line-height:36px;
	padding:0;
	overflow:visible
}
.atc_buttons_etc .bt_report
{
	position:relative
}
.atc_share .share_list
{
	margin-bottom:15px
}
.atc_share .share_list>a
{
	display:inline-block;
	width:40px;
	height:40px;
	border-radius:7px;
	overflow:hidden;
	margin:0 5px 10px 5px
}
.atc_share .share_list img
{
	width:40px;
	height:40px
}
.cmt_member_only
{
	padding:50px 0
}
.cmt_member_only p
{
	display:inline-block;
	padding:12px 15px;
	margin-bottom:15px;
	border-radius:20px
}
.cmt_member_only i
{
	margin-right:5px
}
.cmt_member_only a
{
	margin:0 5px
}
.cmt_title
{
	position:relative
}
.cmt_title h3
{
	display:inline-block
}
.cmt_unit
{
	position:relative
}
.cmt_unit .cmt_rank
{
	display:inline-block;
	position:relative;
	margin-right:3px;
	border-radius:5px;
	color:#fff;
	vertical-align:bottom
}
.cmt_unit .cmt_rank i
{
	position:absolute;
	left:5px;
	top:1px;
	font-size:14px
}
.cmt_unit .cmt_rank1
{
	background-color:#d4af37
}
.cmt_unit .cmt_rank2
{
	background-color:#a9a9a9
}
.cmt_unit .cmt_rank3
{
	background-color:#b08d55
}
.cmt_unit .nickname
{
	font-weight:700
}
.cmt_buttons
{
	position:relative;
	height:24px;
	margin-top:10px
}
.cmt_buttons:empty
{
	display:none
}
.cmt_buttons .bt_wrap
{
	display:inline-block;
	border-radius:5px;
	vertical-align:middle
}
.cmt_buttons .bt_wrap .bt
{
	display:inline-block;
	margin-right:1px;
	padding:0 8px;
	line-height:24px
}
.cmt_buttons .bt_wrap .bt:first-of-type
{
	border-top-left-radius:5px;
	border-bottom-left-radius:5px
}
.cmt_buttons .bt_wrap .bt:last-of-type
{
	margin-right:0;
	border-top-right-radius:5px;
	border-bottom-right-radius:5px
}
.cmt_buttons .bt_cmt_report
{
	margin-right:2px
}
.cmt_bubble .cmt_unit:first-of-type
{
	margin-top:0
}
.cmt_bubble .inkpf_wrap
{
	position:absolute;
	left:0;
	top:0;
	text-align:center
}
.cmt_bubble .cmt_unit:not(.no_profile) .cmt_rank
{
	position:absolute;
	left:-5px;
	top:-5px;
	margin-right:0;
	padding:0;
	width:22px;
	height:22px;
	line-height:22px;
	border-radius:50%
}
.cmt_bubble .cmt_header
{
	padding-bottom:5px
}
.cmt_bubble .cmt_body
{
	position:relative;
	display:inline-block;
	box-sizing:border-box;
	vertical-align:bottom
}
.cmt_bubble .cmt_date_wrap
{
	position:absolute;
	left:100%;
	bottom:0;
	margin-left:5px;
	vertical-align:bottom;
	white-space:nowrap
}
.cmt_bubble .cmt_date_wrap .cmt_time
{
	opacity:0;
	transition-property:opacity;
	transition-duration:.3s
}
.cmt_bubble .cmt_body:hover .cmt_date_wrap .cmt_time
{
	opacity:1
}
.cmt_bubble .cmt_buttons .bt
{
	background-color:#fff
}
.cmt_bubble .cmt_buttons .bt2
{
	display:inline-block;
	padding:0 8px;
	margin-right:3px;
	line-height:24px;
	vertical-align:middle
}
.star_point
{
	position:absolute;
	left:0;
	top:0;
	width:100%;
	direction:rtl;
	text-align:left
}
.star_point>span
{
	display:inline-block;
	overflow:hidden;
	vertical-align:top;
	cursor:pointer;
	opacity:0
}
.bt_atc_font
{
	background-color:#e5e5e5
}
.atc_font
{
	display:inline-block;
	position:relative;
	margin-left:10px
}
.bt_atc_font
{
	width:30px;
	height:30px;
	line-height:32px;
	border-radius:15px;
	font-size:12px
}
.list_header
{
	margin-bottom:15px
}
.list_header:empty
{
	display:none
}
.list_type
{
	float:right
}
.list_type a
{
	display:inline-block;
	height:32px;
	line-height:34px;
	padding:0 10px
}
.list_type a:first-of-type
{
	border-radius:5px 0 0 5px
}
.list_type a:last-of-type
{
	border-radius:0 5px 5px 0
}
.list_wrap
{
	position:relative
}
.list_buttons
{
	position:absolute;
	right:-40px;
	top:0;
	width:30px;
	z-index:10
}
.list_buttons>div
{
	width:30px;
	text-align:center
}
.list_buttons .has_bubble
{
	display:inline-block;
	width:30px;
	height:30px;
	line-height:30px;
	border-radius:50%
}
.ink_list
{
	border-radius:20px
}
.list_icon
{
	margin:-2px 0 -2px 3px;
	font:bold 8px/16px Arial;
	vertical-align:middle
}
.list_wrap .list_icon2
{
	display:inline-block;
	width:15px;
	height:15px;
	line-height:15px;
	box-sizing:border-box;
	padding:1px;
	border-radius:3px;
	margin-bottom:2px;
	vertical-align:middle;
	background-repeat:no-repeat;
	background-position:center center;
	background-size:13px 13px;
	text-indent:-9999px
}
.list_wrap .list_unit
{
	transition-property:background-color;
	transition-duration:.3s
}
.list_wrap .list_cmt
{
	display:inline-block;
	padding:7px 15px;
	border-radius:15px 15px 15px 5px;
	font-size:12px
}
.list_wrap .list_cmt .date
{
	display:inline-block;
	margin-left:10px;
	font-size:12px
}
.atc_header h1
{
	padding:20px 25px;
	font-size:16px;
	line-height:160%;
  /* background: #262626; */

}
.containerN .atc_header h1
{
	padding:20px 25px;
}
.atc_info
{
	padding:0 25px;
	line-height:44px;
	font-size:13px
}
.atc_info>span
{
	display:inline-block;
	vertical-align:middle
}
.atc_nickname .inkpf
{
	vertical-align:middle;
	margin-right:5px
}
.atc_date
{
	margin-left:15px
}
.atc_ctrl
{

	margin-left:15px
}
.atc_ctrl a
{
	margin-left:5px
}
.atc_info_right
{
	float:right
}
.atc_info_right>span
{
	margin-left:10px
}
.atc_info_right .count_cmt
{
	cursor:pointer
}
.atc_body
{
	padding:25px
}
.atc_body .xe_content
{
	font-size:14px;
	line-height:180%
}
.atc_body .xe_content div,.atc_body .xe_content p,.atc_body .xe_content span
{
	line-height:180%
}
.atc_body .xe_content
{
	margin:-25px;
	padding:25px
}
.xe_content a:hover
{
	border-color:transparent
}
.atc_vote
{

	margin-top:25px
}
.atc_vote button
{
	border-radius:10px
}
.atc_vote .bt_vote:hover
{
	color:#fff
}
.atc_buttons_etc
{
	float:right;
	margin-top:25px
}
.atc_buttons_etc:empty
{
	display:none
}
.atc_buttons_etc .bt
{
	border-radius:10px
}
.ink_atc .list_buttons .bt_top
{
	display:none
}
.cmt_title
{
	padding:15px 25px
}
.cmt_title h3
{
	font-size:14px
}
.cmt_unit .cmt_rank
{
	padding:3px 5px 3px 21px
}
.cmt_unit .cmt_rank
{
	font-size:10px
}
.cmt_body .xe_content
{
	font-size:14px;
	line-height:160%
}
.cmt_buttons .bt_wrap .bt
{
	font-size:12px
}
.cmt_unit .cmt_buttons .bt_wrap .bt:hover,.cmt_unit .cmt_buttons .cmt_vote .bt_vote:hover
{
	color:#fff
}
.cmt_bubble .cmt_wrap
{
	padding:25px 25px 0
}
.cmt_bubble .cmt_unit
{
	padding-left:45px;
	margin-top:25px
}
.cmt_bubble .inkpf_wrap
{
	width:40px
}
.cmt_bubble .cmt_header
{
	padding-left:13px;
	font-size:13px
}
.cmt_bubble .cmt_body
{
	min-width:249px;
	max-width:calc(100% - 80px);
	padding:14px 20px;
	border-radius:15px
}
.cmt_bubble .cmt_body .xe_content
{
	font-size:13px;
	line-height:180%
}
.cmt_bubble .cmt_date_wrap
{
	font-size:11px
}
.cmt_bubble .cmt_ctrl_wrap
{
	display:inline-block;
	position:relative;
	z-index:5
}
.cmt_bubble .bt_cmt_ctrl
{
	margin-left:5px;
	padding:1px 5px 0;
	border-radius:5px
}
.cmt_bubble .bt_cmt_ctrl:hover
{
	color:#fff
}
.cmt_bubble .cmt_ctrl
{
	display:none;
	position:absolute;
	top:100%;
	left:0;
	margin-top:5px;
	border-radius:10px;
	background-color:#fff;
	box-shadow:0 0 15px rgba(0,0,0,.2);
	z-index:2
}
.cmt_bubble .cmt_ctrl a
{
	display:inline-block;
	width:100%;
	padding:10px 15px;
	box-sizing:border-box;
	white-space:nowrap
}
.cmt_bubble .cmt_ctrl a:first-of-type
{
	border-radius:10px 10px 0 0
}
.cmt_bubble .cmt_ctrl a:last-of-type
{
	border-radius:0 0 10px 10px;
	border-bottom:none
}
.cmt_bubble .cmt_buttons .bt2
{
	font-size:12px
}
.star_point:hover>span
{
	opacity:0!important
}
.star_point>span:hover,.star_point>span:hover~span
{
	opacity:1!important
}
	a,body
{
	color:#222
}
.ib_monoC
{
	color:#666
}
.font_grey1,.font_grey1 a,.ib i.only
{
	color:#999
}
.inkpf
{
	background-color:#f7f7f7
}
.ib_monoC
{
	background-color:#eee
}
.cmt_member_only i
{
	color:#666
}
.cmt_buttons .bt_wrap .bt
{
	color:#999
}
.cmt_bubble .cmt_body,.cmt_title
{
	background-color:#f7f7f7
}
.cmt_member_only p
{
	background-color:#eee
}
.cmt_member_only
{
	border-top:1px solid #eee
}
.document_title a:hover
{
	color:#222
}
.comment_date,.document_title a
{
	color:#999
}
.comment_content
{
	background-color:#f7f7f7
}
.comment_content::after
{
	border-top:5px solid #f7f7f7;
	border-left:5px solid #f7f7f7
}
.ink_rank .count
{
	color:#999
}
	body
{
	background-color:#eee
}
.ink_bt_top
{
	background-color:rgba(255,255,255,.8)
}
.font_grey1 a:hover,.font_grey1 button:hover,.ink_top a:hover
{
	color:#222
}
.ink_top,.ink_top a,.ink_top button
{
	color:#666
}
.ink_top a:hover
{
	border-bottom:1px solid #222
}
.list_buttons .has_bubble:hover
{
	color:#222
}
.cmt_bubble .cmt_ctrl a
{
	color:#666
}
.cmt_bubble .bt_cmt_ctrl,.cmt_bubble .cmt_ctrl .bt i,.list_buttons .has_bubble
{
	color:#999
}
.list_type a,.list_wrap .list_cmt
{
	color:#bbb
}
.containerN .ink_atc
{
	background-color:#fff
}
.containerN .ink_list
{
	background-color:#f9f9f9
}
.atc_info,.cmt_bubble .cmt_ctrl a:hover,.list_buttons .has_bubble,.list_type a
{
	background-color:#f7f7f7
}
.atc_ctrl a
{
	border-bottom:1px solid #f7f7f7
}
.cmt_bubble .bt_cmt_ctrl,.list_unit:hover .list_cmt,.list_wrap .inkpf,.list_wrap .list_cmt
{
	background-color:#eee
}
.cmt_bubble .cmt_ctrl a
{
	border-bottom:1px solid #eee
}
.cmt_bubble .bt_cmt_ctrl:hover,.cmt_unit .cmt_buttons .bt_wrap .bt:hover
{
	background-color:#999
}
.atc_ctrl a:hover
{
	border-bottom-color:#222
}
.ink_content .ink_rank h3
{
	background-color:#f7f7f7
}
.pt_col
{
	color:#ec5e5e!important
}
.inkpf.color
{
	background-color:#e5e5e5
}
.pt_col2
{
	color:#222!important
}
.ib_color
{
	background-color:#ec5e5e
}


.atc_vote .bt_vote,.cmt_buttons .cmt_vote .bt_vote
{
	color:#ec5e5e
}
.atc_vote .bt_vote
{
	background-color:#fbdfdf
}
.atc_vote .bt_vote .voted_count
{
	border-left:1px solid #f9d2d2
}
.xe_content a
{
	color:#41bc99
}

.heart{
  position: absolute;
  background: url("../assets/follow/follow.png") no-repeat;
  background-position: left center;
  background-size: 2900%;
  height: 90px;
  width: 90px;
  top: 50%;
  left: 44%;
  transform: translate(0%,0%);
}
.heart.heart-active{
  animation: animate .8s steps(28) 1;
  background-position: right;
}
@keyframes animate {
  0%{
    background-position: left;
  }
  100%{
    background-position: right;
  }
}

</style>