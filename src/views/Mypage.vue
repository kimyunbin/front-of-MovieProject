<template>
  <div>
    <userInformation />
  </div>
</template>
<script>
import userInformation from '@/components/userInformation'
export default {
  name:'Mypage',
  components:{
    userInformation,
  },
  methods:{
    
  },
  created: function () {
    if (!this.$store.state.token){
      const detailItem ={
        name: 'Mypage',
        params: this.$route.params.username
      }
      this.$store.dispatch('setNextPage',detailItem)
      this.$router.push({name : 'Login'})
    }
  }
}
</script>

<style>

</style>