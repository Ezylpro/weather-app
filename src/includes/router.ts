import {createWebHistory, createRouter} from 'vue-router'

import Home from '../pages/SignedIn/Home.vue'
import AuthenticatedLayout from "../pages/AuthenticatedLayout.vue";
import Login from "../pages/SignedOut/Login/index.vue";
import Logout from "../pages/SignedIn/Logout/index.vue";
import NotFound from "../pages/NotFound/index.vue";

const routes = [
    {
        path: "/",
        component: AuthenticatedLayout,
        children: [
            {name: 'home', path: "", component: Home},
            {name: 'logout', path: '/logout', component: Logout},
        ]
    },
    {name: 'login', path: '/login', component: Login},
    {
        // Catch all for a 404 page
        path: "/:pathMatch(.*)*",
        name: "404",
        component: NotFound,
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})