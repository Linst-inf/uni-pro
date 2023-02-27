import App from './App'


// #ifndef VUE3
import Vue from 'vue'
// 1. 导入 store 的实例对象
import store from './store/store.js'

// 按需导入 $http 对象
import { $http } from '@escook/request-miniprogram'
// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http

//请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 请求开始之前做一些事情 请求拦截器
$http.beforeRequest = function (options) {
  uni.showLoading({
	  title:'数据加载中...'
  })
}

// 请求完成之后做一些事情 相应拦截器
$http.afterRequest = function () {
  uni.hideLoading()
}
// 封装的展示消息提示的方法
uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none',
  })
}

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	  // 2. 将 store 挂载到 Vue 实例上
	  store,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif