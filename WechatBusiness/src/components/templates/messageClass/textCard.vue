<template>
  <div>
    <el-form-item label="文字标题">
      <el-input v-model="params.textcard.title"></el-input>
    </el-form-item>
    <el-form-item label="内容详情">
      <el-input type="textarea" v-model="params.textcard.description" placeholder="填写需要发送的内容，支持<a>标签"></el-input>
    </el-form-item>
    <el-form-item label="跳转链接">
      <el-input v-model="params.textcard.url"></el-input>
    </el-form-item>
    <el-form-item label="按钮文字">
      <el-input v-model="params.textcard.btntxt"></el-input>
    </el-form-item>
    <div class="line"></div>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即发送</el-button>
    </el-form-item>
  </div>
</template>
<script>
let AgentId = localStorage.getItem("AgentId");
export default {
  data() {
    return {
      params: {
        "touser": "",
        "toparty": "",
        "totag": "",
        "msgtype": "textcard",
        "agentid": AgentId,
        "textcard": {
          "title": "123",
          "description": "<div class=\"gray\">2016年9月26日</div> <div class=\"normal\">恭喜你抽中iPhone 7一台，领奖码：xxxx</div><div class=\"highlight\">请于2016年10月10日前联系行政同事领取</div>",
          "url": "http://www.baidu.com/",
          "btntxt": "更多"
        }
      },
      active: 3
    }
  },
  methods: {
    onSubmit() {
      //this.contentVal();
      this.params.touser = this.$store.state.userNameList;
      this.params.toparty = this.$store.state.departmentNameList;
      this.params.totag = this.$store.state.tagNamelist;
      //console.log(this.params.text.content +"and" + this.params.agentid);
      //发送消息，并调到完成步骤
      let params = this.params;
      this.$store.dispatch('postTextMsg', params).then((response) => {
        let res = response.data;
        if (response.statusText === "OK" && response.status === 200) {
          console.log(params);
          //跳转到第三步
          this.$store.commit('updateActive', this.active)
        } else {
          alert("网络错误")
        }
      }).catch((err) => {
        console.error(err);
      });
    }
  }
}

</script>
