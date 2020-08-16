<template>
  <div class="container">
    <!-- <header>头部信息</header> -->
    <Nuxt />
    <!-- <footer>底部信息</footer> -->
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus">
.container
  padding-top 36px
.login-container
  display flex
  justify-content center
  width 500px
  padding 50px 0
  margin 0 auto
  border 1px solid #cccccc
  border-radius 10px
  .form
    width 360px
    .title
      margin-bottom 20px
      text-align center
      font-family serif
      font-size 26px
    .label-icon
      font-size 18px
    .captcha-container .el-form-item__content
      display flex
      img
        margin-left 15px
        cursor pointer

      .el-button
        width 90px
        margin-left 15px
    .btn-container .el-form-item__content
      display flex
      justify-content center
      .el-button
        width 100%
</style>
