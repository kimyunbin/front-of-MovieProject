<template>
  <article class="cmt_unit" id="comment_65603837">
    
    <div class="inkpf_wrap">
      <span class="inkpf round"><Gravatar :email="comment.user.email" class="profile-img inkpf_img"/></span>					
      <!-- <span class="cmt_rank cmt_rank1">1등</span>			 -->
    </div>
    <div class="cmt_header">
      <a href="#popup_menu_area" class="nickname member_62105361" onclick="return false">
        {{comment.user.username}}
      </a>															
      <div class="cmt_ctrl_wrap ctrl_wrap">
        <button class="bt_cmt_ctrl bt_ctrl" type="button" onclick="openCtrl(this)">X
          <!-- <i class="fas fa-ellipsis-h" title="댓글 메뉴"></i> -->
        </button>						
        <div class="cmt_ctrl ctrl_body">
          <a class="bt" href="javascript:void(0)" onclick="insertWarn('권한이 없습니다.')">
            <i class="fas fa-comment-dots"></i> 
            댓글
          </a>																				
        </div>
      </div>
    </div>
    <div class="cmt_body">
      <div class="comment_65603837_62105361 rhymix_content xe_content" data-pswp-uid="2">{{comment.content}}</div>								
      <div class="cmt_buttons"><div class="cmt_vote">
        <!-- <a class="bt bt2" href="javascript:void(0)" onclick="insertWarn('권한이 없습니다.')">?</a> -->
        <div class="bt_wrap" ><!--@click="likeComment"-->
          <!-- <button class="text_en bt bt_vote" type="button" title="추천">
            <i class="fas fa-heart" ></i> 
            <span class="voted_count">{{Commentliked}}</span>
          </button>																							 -->
          <button class="text_en bt bt_vote" type="button" title="추천">
            <VueStar animate="animated bounceIn" color="#F05654"  >
              <i slot="icon" class="fa fa-heart " @click="likeComment"></i>
            </VueStar>
            <span class="voted_count">{{Commentliked}}</span>
          </button>
        </div>
        </div></div>
        <div class="cmt_date_wrap text_en font_grey1">
          <!-- <span class="cmt_time">18:12</span> -->
          <div class="cmt_date">{{comment.created_at | timeFor}}</div>
        </div>
    </div> 
  </article>
</template>

<script>
import axios from 'axios'
import movieMixin from "@/mixins/movieMixin"
import Gravatar from 'vue-gravatar'
import VueStar from '@/components/VueStar'

const BACKEND = process.env.VUE_APP_BACKEND_LINK
export default {
  name:'CommentListItem',
  mixins : [movieMixin],
  data: function () {
    return {
      Commentliked: '',
    }
  },
  props: {
    comment: {
      type: Object,
    }
  },
  methods : {
    setToken: function () {
      const config = {
        Authorization: `JWT ${this.$store.state.token}`
      }
      return config
    },
    likeComment: function () {
      axios({
        method: 'post',
        url: `${BACKEND}community/${this.comment.id}/comment/like/`,
        headers: this.setToken()
      })
      .then(res => {
        // console.log(res)
        this.Commentliked = res.data.count
      })
      .catch(err => {
        console.log(err)
      })
  },
  },
  created : function () {
    this.Commentliked = this.comment.like_users.length
  },
  components : {
    Gravatar,
    VueStar
  },

}
</script>

<style>
.VueStar {
	position: absolute;
	transform: translate(-60%,-38%);
}

</style>