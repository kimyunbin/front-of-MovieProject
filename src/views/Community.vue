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

<style >
#background{
  background: #262626;
}
</style>