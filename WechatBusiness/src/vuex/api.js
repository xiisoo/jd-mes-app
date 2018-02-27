import Vue from 'vue';
import axios from 'axios';
import store from './store';
import router from '../router';

//获取token
//let token = localStorage.getItem("token");
//let token = this.$store.state.token;

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  return config;
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  //console.log("这是发生响应后的事情");
  return response;
}, function(error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default {
  //获取token
  getToken({ commit, state }, params) {
    return axios({
      url: 'cgi-bin/gettoken',
      method: 'get',
      params,
    });
  },
  //发送消息
  postTextMsg({ commit, state }, params) {
    //获取token
    let token = localStorage.getItem("token");
    return axios({
      url: 'cgi-bin/message/send?access_token=' + token,
      method: 'post',
      data: params
    });
  },
  //接受部门列表
  getDepartmentList({ commit, state }, params) {
    //获取token
    let token = localStorage.getItem("token");
    return axios({
      url: 'cgi-bin/department/list?access_token=' + token,
      method: 'get',
      params,
    });
  },
  //获取成员列表
  getSimpleList({ commit, state }, params) {
    //获取token
    let token = localStorage.getItem("token");
    return axios({
      url: 'cgi-bin/user/simplelist?access_token=' + token,
      method: 'get',
      params,
    });
  },
  //获取标签列表
  getTagList({ commit, state }, params) {
    //获取token
    let token = localStorage.getItem("token");
    return axios({
      url: 'cgi-bin/tag/list?access_token=' + token,
      method: 'get',
      params,
    });
  }

}
