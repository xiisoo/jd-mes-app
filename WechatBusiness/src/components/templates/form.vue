<template>
<el-form label-position="left" ref="form" :model="form" label-width="80px">
  <el-form-item label="企业id">
    <el-input v-model="form.corpid" placeholder="在微信企业管理后台查询您的CorpID"></el-input>
  </el-form-item>
  <el-form-item label="应用id">
    <el-input v-model="AgentId" placeholder="填写发送应用的Secret"></el-input>
  </el-form-item>
  <el-form-item label="应用密码">
    <el-input v-model="form.corpsecret" placeholder="填写发送应用的Secret"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
  </el-form-item>
</el-form>

</template>

<script>
  export default {
    data() {
      return {
        form: {
          corpid: 'wx6ea542101d81f71f',
          corpsecret:'grOsFAqnoLDJ3bTRUgFa8AzufvcP0I_zJ4dqTQgDS5w'
        },
        AgentId:'1000002',
        active:2,
      }
    },
    created() {},
    methods: {
      onSubmit() {
        //console.log(this.form);
        let params = this.form;
        this.$store.dispatch('getToken', params).then((response) => {
                let res = response.data;
                if (response.statusText === "OK" && response.status === 200) {
                    //console.log(res);
                    let access_token = res.access_token;
                    //存储名字为name值为caibin的变量
                    localStorage.setItem("token",access_token);
                    //localStorage.setItem("AgentId",this.AgentId);                    
                    this.$store.commit('updateActive', this.active)
                    //console.log(access_token);
                    //跳转到第二步
                    this.$store.commit('updateAgentId', this.AgentId)
                } else {
                    alert("网络错误")
                } }).catch((err) => {
                console.error(err);
            });
      }
    }
  }
</script>