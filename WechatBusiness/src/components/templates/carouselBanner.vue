<template>
<div class="banner">
    <el-carousel indicator-position="" height="240px">
    <el-carousel-item v-for="item in 3" :key="item">
      <div class="bannerText">
        <h3>企业微信推送助手</h3>
        <p>欢迎使用DFD微信企业推送测试程序</p>
      </div>
    </el-carousel-item>
  </el-carousel>
</div>
</template>
<style scoped>
.banner{
	width: 100%;
}
.bannerText{
display: flex;
flex-flow: column;
justify-content: center;
align-content: center;
height: 240px;
margin-left: 30px;
}

.el-carousel__item h3 {
  color: #fff;
  font-size: 48px;
  opacity: 1;
  margin: 0;
}

.el-carousel__item p {
  color: #fff;
  font-size: 24px;
  opacity: 1;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #4788FC;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #4788FC;
}

</style>
