<template>
  <div class="imgUpload">
    <el-upload class="upload-demo" drag :action="uploadUrl" :on-success="preview">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip" v-text="text.text"></div>
    </el-upload>
    <div class="line"></div>
    <el-form-item>
      <el-button type="primary" @click="OnSubmit">立即发送</el-button>
    </el-form-item>
  </div>
</template>
<script type="text/javascript">
//获取token
let token = localStorage.getItem("token");
let AgentId = localStorage.getItem("AgentId");
export default {
  data() {
    return {
      uploadUrl: "cgi-bin/media/upload?access_token=" + token + "&type=" + this.text.status,
      params: {
        "touser": "", //成员ID列表,默认为全部成员
        "toparty": "", //部门ID列表
        "totag": "", //标签ID列表
        "msgtype": "image", //消息类型
        "agentid": AgentId, //企业应用的id，整型。可在应用的设置页面查看
        // "image": {
        //   "media_id": ""
        // },
        "safe": 0
      },
      newParams: "",
      active: 3,
      newText: '',
    }
  },
  props: {
    text: '',
  },
  created() {
    this.msgStatus();
  },

  watch: {
    text(newList) {
      this.text = newList;
      this.params.msgtype = this.text.status;
      this.uploadUrl = "cgi-bin/media/upload?access_token=" + token + "&type=" + this.text.status;
      this.msgStatus();
    },

  },
  computed: {},
  methods: {
    //获取上传图片后的返回信息
    preview(response, file, fileList) {
      if(response.type =="image"){
        this.newParams.image.media_id = response.media_id;
      };
      if(response.type =="video"){
        this.newParams.video.media_id = response.media_id;
        this.newParams.video.title = response.title;
        this.newParams.video.description = response.description;
      };
      if(response.type =="voice"){
        this.newParams.voice.media_id = response.media_id;
      };
      if(response.type =="file"){
        this.newParams.file.media_id = response.media_id;
      };
    },

    msgStatus() {
      //如果是图片消息
      if (this.text.status == "image") {
        //设置新的数组为图像
        this.newParams = {
          "touser": "", //成员ID列表,默认为全部成员
          "toparty": "", //部门ID列表
          "totag": "", //标签ID列表
          "msgtype": "image", //消息类型
          "agentid": AgentId, //企业应用的id，整型。可在应用的设置页面查看
          "safe": 0
        };
        this.newParams.agentid = this.$store.state.agentId;
        this.$set(this.newParams, "image", { 'media_id': '' });
        //console.log(this.newParams);
      };
      //如果是视频消息
      if (this.text.status == "video") {
        //设置新的数组为图像
        this.newParams = {
          "touser": "", //成员ID列表,默认为全部成员
          "toparty": "", //部门ID列表
          "totag": "", //标签ID列表
          "msgtype": "video", //消息类型
          "agentid": AgentId, //企业应用的id，整型。可在应用的设置页面查看
          "safe": 0
        };
        this.$set(this.newParams, "video", {
          "media_id": "",
          "title": "",
          "description": ""
        });
        //console.log(this.newParams);
      };
      //如果是语音消息
      if (this.text.status == "voice") {
        //设置新的数组为图像
        this.newParams = {
          "touser": "", //成员ID列表,默认为全部成员
          "toparty": "", //部门ID列表
          "totag": "", //标签ID列表
          "msgtype": "voice", //消息类型
          "agentid": AgentId, //企业应用的id，整型。可在应用的设置页面查看
          "safe": 0
        };
        this.$set(this.newParams, "voice", {
          "media_id": ""
        });
        //console.log(this.newParams);
      };
      //如果是文件消息
      if (this.text.status == "file") {
        //设置新的数组为图像
        this.newParams = {
          "touser": "", //成员ID列表,默认为全部成员
          "toparty": "", //部门ID列表
          "totag": "", //标签ID列表
          "msgtype": "file", //消息类型
          "agentid": AgentId, //企业应用的id，整型。可在应用的设置页面查看
          "safe": 0
        };
        this.$set(this.newParams, "file", {
          "media_id": ""
        });
        //console.log(this.newParams);
      }
    },

    OnSubmit() {
      this.newParams.touser = this.$store.state.userNameList;
      this.newParams.toparty = this.$store.state.departmentNameList;
      this.newParams.totag = this.$store.state.tagNamelist;
      //console.log(this.uploadUrl);
      let params = this.newParams;
      this.$store.dispatch('postTextMsg', params).then((response) => {
        let res = response.data;
        if (response.statusText === "OK" && response.status === 200) {
          //console.log(params);

          //跳转到第三步
          this.$store.commit('updateActive', this.active)
        } else {
          alert("网络错误")
        }
      }).catch((err) => {

      });
    }

  }
}

</script>
<style type="text/css">
.imgUpload {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
