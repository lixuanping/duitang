import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//引入jq
import $ from 'jquery';
window.$ = $;


// import MuseUI from 'muse-ui';
// import 'muse-ui/dist/muse-ui.css';
// Vue.use(MuseUI);


import rem from './lib/js/rem.js' //引入rem
rem() //使用rem

// import { Indicator } from 'mint-ui'
// Vue.prototype.$loading = Indicator
// import { Loadmore } from 'mint-ui';

// Vue.component(Loadmore.name, Loadmore);

// 图片懒加载
// import { Lazyload } from 'mint-ui';
// Vue.use(Lazyload);

//引入路由
import router from "./router/index.js"

//引入Vuex  状态管理工具
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	// 状态
	state: {
		text: ''
	},
	mutations: {
		changeSearchText(state, data) {
			state.text = data;
		}
	},
	actions: {
    setSearchText(context, data) {
      context.commit('changeSearchText', data)
    }
	},
	getters: {
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
