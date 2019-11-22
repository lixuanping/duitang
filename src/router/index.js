import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

const home = r => require.ensure([], () => r(require('../components/home/home.vue')), 'home') // 首页
const myDate = r => require.ensure([], () => r(require('../components/myDate/index.vue')), 'myDate') // 引入登陆或注册页面
const login = r => require.ensure([], () => r(require('../components/login/index.vue')), 'login') // 引入登陆页面
const Me = r => require.ensure([], () => r(require('../components/me/index.vue')), 'Me') // 引入登陆页面

const Sxiang = r => require.ensure([], () => r(require('../components/home/Sxiang.vue')), 'Sxiang') //引入推荐点击跳转的详情页

const Find = r => require.ensure([], () => r(require('../components/Find/Find.vue')), 'Find') //引入底部数据板块

const shang = r => require.ensure([], () => r(require('../components/Shang/ShangDian.vue')), 'shang') //引入底部商店板块
const Fxiang = r => require.ensure([], () => r(require('../components/Find/Fxiang.vue')), 'Fxiang') //引入底部数据板块
const car = r => require.ensure([], () => r(require('../components/Find/Car.vue')), 'car') //引入购物车

const Footer = r => require.ensure([], () => r(require('../components/Footer.vue')), 'Sxiang') //引入底部


export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Footer,
            children: [
                {
                    path: '',
                    redirect: '/home'
                },
                {
                    path: 'home',
                    component: home,//这个名字是引入名字 上面path要跟这个一样
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: 'Fxiang',
                    component: Fxiang

                },
                {
                    path: 'shang',
                    component: shang
                },
                {
                    path: 'myDate',
                    component: myDate
                },
                {
                    path: 'Me',
                    component: Me
                }
            ]
        }
        ,
        {
            path: '/Sxiang',//点击首页的详情页
            component: Sxiang
        },
        {
            path: '/Login',//点击底部我板块 跳到登陆页面
            component: login
        },
        {
            path: '/Me',//个人信息页面
            component: Me
        },
        {
            path: '/Find',//点击底部数据板块
            component: Find
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
})