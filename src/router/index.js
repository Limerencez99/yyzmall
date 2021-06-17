import Vue from 'vue';
import VueRouter from "vue-router";

const Home = () => import('../views/home/Home')
const Fenlei = () => import('../views/fenlei/Fenlei')
const Gouwuche = () => import('../views/gouwuche/Gouwuche')
const Wode = () => import('../views/wode/Wode')

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/fenlei',
        component: Fenlei
    },
    {
        path: '/gouwuche',
        component: Gouwuche
    },
    {
        path: '/wode',
        component: Wode
    },
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router