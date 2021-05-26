<template>
  <div>
    <img src="../assets/404Page/404.png" alt="404" id="page404" @click="$router.go(-1)">
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
}
</script>

<style>
#page404{
  width : 100%;
  height: 100%;
}
</style>