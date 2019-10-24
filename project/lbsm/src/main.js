import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import LoginComponent from './views/LoginComponent.vue';
import HomeComponent from './views/HomeComponent.vue';
import SignUpComponent from './views/SignUpComponent.vue';
import FriendsListComponent from './views/FriendsListComponent.vue';

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
        }
    ]
})

window.app = new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
