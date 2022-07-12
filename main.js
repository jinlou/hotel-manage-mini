import App from './App'
import Vue from "vue"
import api from "./api/api"
import {baseURL} from './api/baseURL.js'
Vue.prototype.$api = api

Vue.prototype.appID = 'wx2b0f1488c6f3405f' // 小程序的原始ID

Vue.config.productionTip = false

Vue.prototype.$baseUrl = baseURL

App.myType = 'app'

const app = new Vue({
	...App
})
app.$mount()