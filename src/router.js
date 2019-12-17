import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'
import User from './components/User'
import UsersList from './components/UsersList'

Vue.use(Router)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: "/alseco_test/:name",
            component: User
        },
        {
            path: "/alseco_test",
            component: UsersList
        }
    ]
})

export default router
