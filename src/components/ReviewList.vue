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

export default {
  name: 'ReviewList',
  components : {
    ReviewListItem
  },
  props : {
    reviews : {
      type: Array,
    }
  }
  
  
}
</script>

<style scoped>
/* * {
  background: #262626;
  
} */
</style>