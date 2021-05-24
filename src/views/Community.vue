<template>
  <div id="background">
    <ReviewList />
  </div>
</template>

<script>
import ReviewList from '@/components/ReviewList'
export default {
  name: 'Community',
  components : {
    ReviewList
  }
}
</script>

<style scoped>
#background{
  background-color: #E6E6E6;
}
</style>