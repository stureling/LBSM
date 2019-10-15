/*
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
*/

import Vue from 'vue'
import App from '@/App.vue'
import VueRouter from 'vue-router'

import LoginComponent from "@/views/login.vue"
import SecureComponent from "@/views/secure.vue"

Vue.use(VueRouter)

const router = new VueRouter
({
    routes: [
        {
            path: '/',
            redirect: {
                name: "login"
            }
        },
        {
            path: "/login",
            name: "login",
            component: LoginComponent
        },
        {
            path: "/secure",
            name: "secure",
            component: SecureComponent
        }
    ]
})

window.app = new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
