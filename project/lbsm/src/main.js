import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import LoginComponent from '@/views/LoginComponent.vue';
import HomeComponent from '@/views/HomeComponent.vue';
import SignUpComponent from '@/views/SignUpComponent.vue';
import FriendsListComponent from '@/components/FriendsListComponent.vue';
import SearchListComponent from '@/views/SearchListComponent.vue';
import UserTemplateComponent from '@/views/UserTemplateComponent.vue';

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(Vuelidate);

const router = new VueRouter
({
    routes: [
        {
          path: '/',
          redirect: {
              name: "home",
          },
        },
        {
          path: '/sign-up',
          name: 'sign-up',
          component: SignUpComponent
        },
        {
          path: '/login',
          name: 'login',
          component: LoginComponent
        },
        {
          path: '/home',
          name: 'home',
          component: HomeComponent
        },
        {
          path: '/friends',
          name: 'friends-list',
          component: FriendsListComponent
        },
        {
          path: '/users',
          name: 'search-list',
          component: SearchListComponent
        },
        {
          path: '/user/:username',
          name: 'user-template',
          component: UserTemplateComponent, 
          props: true
        },
    ]
})

Vue.config.productionTip = false

window.app = new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
