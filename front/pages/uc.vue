<template>
  <div>
    <h1>用户中心</h1>
  </div>
</template>

<script>
export default {
  async mounted () {
    const ret = await this.$http.get('/user/info')
    console.log(ret)
  }
}
</script>

<style lang="stylus" scoped>

</style>
