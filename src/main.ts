import {createApp} from 'vue'
import App from './App.vue'
import {router} from "./includes/router.ts";
import store from "./includes/store.ts";
import "./main.css";

import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'

Bugsnag.start({
    apiKey: import.meta.env.VITE_BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginVue()],
})

const bugsnagVue = Bugsnag.getPlugin('vue')

const app = createApp(App);
bugsnagVue && app.use(bugsnagVue)

app.use(router)
    .use(store)
    .mount('#app')
