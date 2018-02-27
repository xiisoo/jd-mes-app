<template>
  <div class="Box">
    <div class="tipBox">
      <div class="finishIcon">
        <i class="el-icon-check"></i>
      </div>
      <span class="tipText">发送成功,庆祝一下吧~</span>
    </div>
    <div class="line"></div>
    <div class="btn">
      <el-button type="primary" @click="onSubmit">再发一条</el-button>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      active: 2
    }
  },
  mounted() { //进入时加载的函数
    //清空Vuex
    this.clearVeux()
    
  },
  methods: {
    onSubmit() {
      //跳转到第三步
      this.$store.commit('updateActive', this.active)
    },
    //清空Vuex
    clearVeux(){
      this.$store.commit('updateDepartmentNameList', '');
      this.$store.commit('updateUserNameList', '');
      this.$store.commit('updateTagNamelist', '');
    }
  }
}

</script>
<style scoped>
.Box {
  display: flex;
  flex-direction: column;
  width: 400px;
}

.btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.finishIcon {
  font-size: 40px;
  color: #fff;
  background-color: #20A0FF;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.line {
  height: 1px;
  width: 100%;
  background-color: rgba(220, 220, 220, 1);
  margin-bottom: 30px;
  margin-top: 30px;
}

.tipBox {
  width: 240px;
  height: 240px;
  border: 1px solid rgba(220, 220, 220, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  margin: 60px auto 30px;
  border-radius: 2px;
}

.tipText {
  color: #1F2D3D;
  font-weight: 400;
  margin-top: 20px;
}

</style>
