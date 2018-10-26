import Vue from 'vue'
import App from './App.vue'

import $ from 'jquery';
window.$ = $;


import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
Vue.use(MuseUI);



Vue.config.productionTip = false

//因为需要用到路由 所以需要这两步  
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import rem from './js/rem.js'//引入rem
rem()//使用rem

import shouye from './components/ShouYe/ShouYe.vue'//引入首页
import xuan from './components/Xuanze/Xuan.vue'//引入选择登陆或注册页面

import regest from './components/Xuanze/Regest.vue'//引入注册界面
import login from './components/Xuanze/Login.vue'//引入登陆界面
import me from './components/Xuanze/Me.vue'//引入登陆或注册成功后的个人信息页面

import  Sxiang from './components/ShouYe/Sxiang.vue'//引入推荐点击跳转的详情页

import shang from './components/Shang/ShangDian.vue'//引入底部商店板块

import faxian from './components/Find/Find.vue'//引入底部数据板块
import  Fxiang from './components/Find/Fxiang.vue'//引入底部数据板块的详情页

import  car from './components/Find/Car.vue'//引入底部数据板块的详情页的右上角的购物车
//定义路由  ......2
const routes = [
	{
		path: '/',//默认页面
		component: shouye
	},
	{
		path: '/ShouYe',//首页
		component: shouye
	},
	{
		path: '/Sxiang',//点击首页的详情页
		component: Sxiang
	},
	{
		path: '/Xuan',//点击底部我 即登陆注册页面
		component: xuan
	},
	{
		path: '/Regest',//点击底部数据板块d的详情页
		component: regest
	},
	{
		path: '/Login',//点击底部数据板块d的详情页
		component: login
	},
	{
		path: '/Me',//个人信息页面
		component: me
	},
	{
		path: '/ShangDian',//点击底部商店板块
		component: shang
	},
	{
		path: '/Find',//点击底部数据板块
		component: faxian
	},
	{
		path: '/Fxiang',//点击底部数据板块的详情页
		component: Fxiang
	},
	{
		path: '/Car',//点击底部数据板块的详情页的购物车
		component: car
	}
]


//把定义的路由赋予router  ....3
const router = new VueRouter({
	routes
})


//引入Vuex  状态管理工具
import Vuex from 'vuex'
Vue.use(Vuex)

// 思路是先把前端传过来的东西保存在vuex  然后再从vuex返回给前端  前面三部都是保存在Vuex
// 执行顺序是前端触发第三步 然后再执行第二步  再执行第一步
const store = new Vuex.Store({
// 状态
state: {
	num:''
},
mutations: {
	changeSearchText(state, data) {
		state.num = data;//索引值
	}
},
actions: {//固定写法 setSearchText是随便取的名字 但要跟前端那边触发的一样 
	//前端就是触发setSearchText这个函数
	setSearchText(context, data) {//data是前端传过来的参数
		context.commit('changeSearchText', data)//changeSearchText是触发上面函数
	}
},
getters:{//这一步是把存到vuex的值返回给前端  当然是要前端触发这个函数
	getSearchText(state){
		return state.num
	}
}
})

new Vue({
	store,	
	router,
	render: h => h(App)
}).$mount('#app')
