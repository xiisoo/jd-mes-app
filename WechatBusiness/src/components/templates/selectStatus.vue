<template>
  <div>
    <el-form label-position="left" ref="form" :model="form" label-width="80px">
      <el-form-item label="发送给">
        <el-select v-model="who" placeholder="请选择发送方式">
          <el-option v-for="item in sendWho" :label="item.text" :value="item.val" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发送方式">
        <el-select v-model="form.region" placeholder="请选择发送方式">
          <el-option v-for="item in forms" :label="item.text" :value="item.val" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <div class="line" v-show="who!=''&&who!=1"></div>
      <el-form-item label="选择姓名" v-if="who=='2'">
        <el-select v-model="userNameList" multiple placeholder="请选择">
          <el-option v-for="(item,index) in simpleList" :key="item.index" :label="item.name" :value="item.userid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择部门" v-if="who=='3'">
        <el-select v-model="departmentNameList" multiple placeholder="请选择">
          <el-option v-for="(item,index) in departmentList" :key="item.index" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择标签" v-if="who=='4'">
        <el-select v-model="tagNamelist" multiple placeholder="请选择">
          <el-option v-for="(item,index) in taglist" :key="item.index" :label="item.tagname" :value="item.tagid">
          </el-option>
        </el-select>
      </el-form-item>
      <div class="line" v-show="form.region!=''"></div>
      <text-class v-if="form.region==1"></text-class>
      <img-class v-if="form.region==2" :text="imgText"></img-class>
      <img-class v-if="form.region==3" :text="videoText"></img-class>
      <img-class v-if="form.region==4" :text="voiceText"></img-class>
      <img-class v-if="form.region==5" :text="fileText"></img-class>
      <text-card v-if="form.region==6"></text-card>
      <img-text-class v-if="form.region==7"></img-text-class>
    </el-form>
  </div>
</template>
<script>
import TextClass from '@/components/templates/messageClass/textClass';
import ImgClass from '@/components/templates/messageClass/imgClass';
import TextCard from '@/components/templates/messageClass/textCard';
import ImgTextClass from '@/components/templates/messageClass/imgTextClass';




let content = '';

export default {
  data() {
    return {
      imgText: {
        text: "只能上传jpg/png文件，且不超过2M",
        status: "image"
      },
      videoText: {
        text: "只能上传MP4文件，且不超过10M",
        status: "video"
      },
      voiceText: {
        text: "2MB，播放长度不超过60s，仅支持AMR格式",
        status: "voice"
      },
      fileText: {
        text: "任意文件，不超过20M",
        status: "file"
      },
      //选择发送的消息类型
      form: {
        region: "",
      },
      who: "",
      //定义的消息类型
      forms: [{
        text: "文字消息",
        val: 1
      }, {
        text: "图片消息",
        val: 2
      }, {
        text: "视频消息",
        val: 3
      }, {
        text: "语音消息",
        val: 4
      }, {
        text: "发送文件",
        val: 5
      }, {
        text: "文字卡片消息",
        val: 6
      }, {
        text: "图文消息",
        val: 7
      }, ],
      //发送给谁
      sendWho: [{
        text: "全体员工",
        val: 1
      }, {
        text: "按姓名",
        val: 2
      }, {
        text: "按部门",
        val: 3
      }, {
        text: "按标签",
        val: 4
      }],
      //部门多选值
      departmentList: [],
      //选中的部门列表
      departmentNameList: [],
      //转换字符串
      departmentStr: '',
      //获取公司名称
      company: [],
      //请求成员参数
      userList: {
        department_id: '',
        fetch_child: 1
      },
      //成员列表
      simpleList: [],
      //选中成员列表
      userNameList: [],
      //转换成字符串
      userStr: '',
      //标签列表
      taglist: [],
      //选中的标签列表
      tagNamelist: [],
      //转换成字符串
      tagStr: '',
    }
  },
  created() {


  },
  mounted() { //进入时加载的函数
    //获取部门列表
    this.getDepartmentList();
    //获取标签列表
    this.getTagList();
  },
  watch: {
    //上传Vuex部门列表选值
    departmentNameList(newList) {
      this.departmentNameList = newList;
      this.departmentStr = this.departmentNameList.join("|")
      this.$store.commit('updateDepartmentNameList', this.departmentStr);
    },
    //上传Vuex人员列表选值
    userNameList(newList) {
      this.userNameList = newList;
      this.userStr = this.userNameList.join("|")
      this.$store.commit('updateUserNameList', this.userStr);
    },
    //上传Vuex标签列表选值
    tagNamelist(newList) {
      this.tagNamelist = newList;
      this.tagStr = this.tagNamelist.join("|")
      this.$store.commit('updateTagNamelist', this.tagStr);
    },
    who(newList) {
      this.who = newList;
      if (this.who == 1) {
        this.$store.commit('updateUserNameList', '@all');
      };
      //获取成员列表
      this.getSimpleList();
    }

  },
  methods: {
    //获取textclass子组件的内容
    contentVal(msg) {
      this.mode = msg;
    },
    //获取部门列表
    getDepartmentList() {
      let params = '';
      this.$store.dispatch('getDepartmentList', params).then((response) => {
        let res = response.data;
        if (response.statusText === "OK" && response.status === 200) {
          this.departmentList = res.department;
          this.company = res.department[0];
          this.userList.department_id = res.department[0].id;
          //获取总公司所在的ID序列
          //var index = this.departmentList.indexOf("技术部");  
          this.departmentList.splice(0, 1);

          //console.log(this.userList);
          //跳转到第三步
          // this.$store.commit('updateActive', this.active)
        } else {
          alert("网络错误")
        }
      }).catch((err) => {
        console.error(err);
      });
    },
    //获取成员列表
    getSimpleList() {
      let params = this.userList;
      this.$store.dispatch('getSimpleList', params).then((response) => {
        let res = response.data;
        if (response.statusText === "OK" && response.status === 200) {

          this.simpleList = res.userlist;
          //console.log(this.simpleList);
        } else {
          alert("网络错误")
        }
      }).catch((err) => {
        console.error(err);
      });
    },
    //获取标签列表
    getTagList() {
      let params = '';
      this.$store.dispatch('getTagList', params).then((response) => {
        let res = response.data;
        if (response.statusText === "OK" && response.status === 200) {

          this.taglist = res.taglist;
          //console.log(this.simpleList);
        } else {
          alert("网络错误")
        }
      }).catch((err) => {
        console.error(err);
      });
    },

  },
  components: {
    TextClass,
    ImgClass,
    TextCard,
    ImgTextClass
  }
}

</script>
<style type="text/css">
.line {
  height: 1px;
  width: 100%;
  background-color: rgba(220, 220, 220, 1);
  margin-bottom: 30px;
  margin-top: 30px;
}

</style>
