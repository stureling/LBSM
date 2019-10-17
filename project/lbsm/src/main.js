import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import BootstrapVue from 'bootstrap-vue';

import LoginComponent from './views/login.vue';
import SecureComponent from './views/home.vue';
import SignUpComponent from './views/sign.vue';

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(BootstrapVue);

const router = new VueRouter
({
    routes: [
        {
          path: '/',
          redirect: {
              name: "sign-up",
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
          component: SecureComponent
        }
    ]
})

window.app = new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
