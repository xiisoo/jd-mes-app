<template>
  <div>
    <el-form-item label="文字标题">
      <el-input v-model="params.news.articles[0].title"></el-input>
    </el-form-item>
    <el-form-item label="内容详情">
      <el-input v-model="params.news.articles[0].description"></el-input>
    </el-form-item>
    <el-form-item label="图片链接">
      <el-input v-model="params.news.articles[0].picurl"></el-input>
    </el-form-item>
    <el-form-item label="跳转链接">
      <el-input v-model="params.news.articles[0].url"></el-input>
    </el-form-item>
    <el-form-item label="按钮文字">
      <el-input v-model="params.news.articles[0].btntxt"></el-input>
    </el-form-item>
    <!-- <el-form-item label="活动素材">
      <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList">
        <el-button icon="el-icon-plus" type="text"><i class="el-icon-plus"></i>上传素材</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item> -->
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
        "msgtype": "news",
        "agentid": AgentId,
        "news": {
          "articles": [{
            "title": "中秋节礼品领取",
            "description": "今年中秋节公司有豪礼相送",
            "url": "http://www.baidu.com/",
            "picurl": "http://res.mail.qq.com/node/ww/wwopenmng/images/independent/doc/test_pic_msg1.png",
            "btntxt": "更多"
          }]
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
