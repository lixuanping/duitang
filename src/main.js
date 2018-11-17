import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import $ from 'jquery';
window.$ = $;


import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
Vue.use(MuseUI);


import rem from './js/rem.js'//引入rem
rem()//使用rem

// 加载中字样
import { Indicator } from 'mint-ui'
Vue.prototype.$loading = Indicator
// 上拉刷新
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);

// 图片懒加载
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);


import shouye from './components/ShouYe/ShouYe.vue'//引入首页
import xuan from './components/Xuanze/Xuan.vue'//引入选择登陆或注册页面

import regest from './components/Xuanze/Regest.vue'//引入注册界面
import login from './components/Xuanze/Login.vue'//引入登陆界面
import me from './components/Xuanze/Me.vue'//引入登陆或注册成功后的个人信息页面

import Sxiang from './components/ShouYe/Sxiang.vue'//引入推荐点击跳转的详情页

import shang from './components/Shang/ShangDian.vue'//引入底部商店板块

import faxian from './components/Find/Find.vue'//引入底部数据板块
import Fxiang from './components/Find/Fxiang.vue'//引入底部数据板块的详情页

import car from './components/Find/Car.vue'//引入底部数据板块的详情页的右上角的购物车

import Footer from './components/Footer.vue'//引入底部

// import wheader from './weibo/Wheader.vue'
// import content from './weibo/Content.vue'


//因为需要用到路由 所以需要这两步  
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//定义路由  ......2
const routes = [
	// {
	// 	path: '/',
	// 	component: wheader,
	// 		children: [
	// 		{
	// 			path: 'aaa:id',
	// 			name:'a',
	// 			component: content
	// 		},
	// 		{
	// 			path: '/bbb:id',
	// 			name:'b',
	// 			component: content
	// 		},
	// 		{
	// 			path: '/ccc:id',
	// 			name:'c',
	// 			component: content
	// 		}
	// 	]
	// }
	{
		path: '/',
		component: Footer,
		children: [
			{
				path: '',
				redirect: '/shouye'
			},
			{
				path: 'shouye',
				component: shouye,//这个名字是引入名字 上面path要跟这个一样
				meta:{
					keepAlive:true
				}
			},
			{
				path: 'faxian',
				component: faxian
				
			},
			{
				path: 'shang',
				component: shang
			},
			{
				path: 'Xuan',
				component: xuan
			},
			{
				path: 'me',
				component: me
			}
		]
	}
	,
	{
		path: '/Sxiang',//点击首页的详情页
		component: Sxiang
	},
	{
		path: '/Regest',//点击底部我板块 跳到注册页面
		component: regest
	},
	{
		path: '/Login',//点击底部我板块 跳到登陆页面
		component: login
	},
	{
		path: '/Me',//个人信息页面
		component: me
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
		text: ''
	},
	mutations: {
		changeSearchText(state, data) {
			state.text = data;//索引值
		}
	},
	actions: {//固定写法 setSearchText是随便取的名字 但要跟前端那边触发的一样 
		//前端就是触发setSearchText这个函数
		setSearchText(context, data) {//data是前端传过来的参数
			context.commit('changeSearchText', data)//changeSearchText是触发上面函数
		}
	},
	getters: {//这一步是把存到vuex的值返回给前端  当然是要前端触发这个函数
		getSearchText(state) {
			return state.text
		}
	}
})

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app')
