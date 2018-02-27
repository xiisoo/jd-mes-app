<template>
  <div>
  	<div class="flexBox">
    <carousel-banner></carousel-banner>
    
      <div class="steps">
        <el-steps :space="200" :active="active">
          <span @click="active=1">
          	<el-step title="步骤 1" description="填写您的企业ID与应用密码。"></el-step>
        </span>
          <span @click="active=2">
        	<el-step title="步骤 2" description="填写您的发送方式。"></el-step>
        </span>
          <span @click="active=3">
        	<el-step title="步骤 3" description="完成"></el-step>
        </span>
        </el-steps>
      </div>
      <div class="stepsOne" v-if="active==1">
        <form-text></form-text>
      </div>
      <div class="stepsTwo" v-if="active==2">
        <select-status></select-status>
      </div>
      <div class="stepsThree" v-if="active==3">
        <finish></finish>
      </div>
    </div>
  </div>
</template>
<script>
import BannerNav from '@/components/templates/banner';
import CarouselBanner from '@/components/templates/carouselBanner';
import FormText from '@/components/templates/form';
import SelectStatus from '@/components/templates/selectStatus';
import Finish from '@/components/templates/finish';

export default {
  data() {
    return {
      
    }
  },
  computed:{
    active(){
      return this.$store.state.active
    }
  },
  methods:{
    
  },
  components: {
    BannerNav,
    FormText,
    SelectStatus,
    CarouselBanner,
    Finish

  }
}

</script>
<style scoped>
.flexBox{
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 120px;
}
.steps {
  margin-top: 60px;
  margin-left: 170px;
}

.stepsOne {
  width: 428px;
  
  margin-top: 80px;
}

.stepsTwo {
  width: 428px;
  
  margin-top: 80px;
}

</style>
