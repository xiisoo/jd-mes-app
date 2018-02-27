<template>
  <div id="app">
    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
    </el-submenu>
    <el-menu-item index="3"><a href="https://www.baidu.com" target="_blank">订单管理</a></el-menu-item>
    <div class="rightBox">
      <div class="searchBox">
        <el-input placeholder="输入用户手机号" icon="search" v-model="input2" :on-icon-click="handleIconClick">
        </el-input>
      </div>
      <i class="el-icon-setting"></i>
      <i class="el-icon-message"></i>   
    </div>
  </el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      activeIndex2: '1',
      input2: ""
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleIconClick(ev) {
      console.log(ev);
    }
  }
}
</script>

<style scoped>
.el-icon-message {
  color: #8492A6;
  float: right;
  line-height: 60px;
  margin: 0 30px;
}

.el-icon-setting{
  color: #8492A6;
  float: right;
  line-height: 60px;
  margin-right: 30px;
}
.rightBox {
  float: right;
}

.searchBox {
  float: left;
  width: 200px;
  line-height: 60px;
}

</style>
