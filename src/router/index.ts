import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';


Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/access_token=*',
            name: 'auth',
            component: Login,
            props: () => ({
                msg: 'Confirming authorization.',
            }),
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            props: () => ({
                msg: "It's time to login!",
            }),
        },
    ],
});


export default router;
