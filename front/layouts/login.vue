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
  --theme-color #22252e
  position absolute
  left 0
  top 0
  bottom 0
  right 0
  padding-top 60px
  background #9fa3a4 url('../static/images/login_bg1.jpg')
  background-size cover
.login-container
  display flex
  justify-content center
  float right
  width 500px
  padding 50px 0
  margin-right 440px
  border 1px solid var(--theme-color)
  border-radius 10px
  box-shadow #313439 30px 30px 45px -20px
  .form
    width 360px
    .title
      margin-bottom 20px
      text-align center
      font-family serif
      font-size 26px
      color var(--theme-color)
    .el-form-item__label
      color var(--theme-color)
    .label-icon
      font-size 18px
      color var(--theme-color)
    .el-input
      .el-input__inner
        background-color transparent
        border-color var(--theme-color)
        color var(--theme-color)
        &::-webkit-input-placeholder
          color var(--theme-color)
    .el-button
      background-color #272a2f
      border-color #272a2f
      color #dad9da
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
