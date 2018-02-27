<template>
  <div>
    <el-form-item label="发送内容">
      <el-input type="textarea" v-model="desc" placeholder="填写需要发送的内容，支持<a>标签"></el-input>
    </el-form-item>
    <div class="line"></div>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即发送</el-button>
    </el-form-item>
  </div>
</template>
<script type="text/javascript">
//let AgentId = localStorage.getItem("AgentId");
export default {
  data() {
    return {
      desc: "你的快递已到，请携带工卡前往邮件中心领取。\n出发前可查看<a href=\"http://work.weixin.qq.com\">邮件中心视频实况</a>，聪明避开排队。",
      //拼接发送的数组
      params: {
        "touser": "", //成员ID列表,默认为全部成员
        "toparty": "", //部门ID列表
        "totag": "", //标签ID列表
        "msgtype": "text", //消息类型
        "agentid": "", //企业应用的id，整型。可在应用的设置页面查看
        "text": {
          "content": ""
        },
        "safe": 0
      },
      active: 3
    }
  },
  watch: {

  },
  methods: {
    onSubmit() {
      //this.contentVal();
      this.params.text.content = this.desc;
      this.params.touser = this.$store.state.userNameList;
      this.params.toparty = this.$store.state.departmentNameList;
      this.params.totag = this.$store.state.tagNamelist;
      this.params.agentid = this.$store.state.agentId;
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
