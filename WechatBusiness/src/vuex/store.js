import Vue from 'vue';
import Vuex from 'vuex';
import actions from './api';

//const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);
//Vue.config.debug = debug;

export default new Vuex.Store({
  actions,
  state: {
    //页面步骤
    active: 1,
    //选中的部门列表
    departmentNameList: '',
    //选中成员列表
    userNameList: '',
    //选中的标签列表
    tagNamelist: '',
    //储存应用id
    agentId:'',
  },
  mutations: {
    updateActive(state, active) {
      state.active = active;
    },
    updateDepartmentNameList(state, departmentNameList) {
      state.departmentNameList = departmentNameList;
    },
    updateUserNameList(state, userNameList) {
      state.userNameList = userNameList;
    },
    updateTagNamelist(state, tagNamelist) {
      state.tagNamelist = tagNamelist;
    },
    updateAgentId(state, agentId) {
      state.agentId = agentId;
    },
  }
});
