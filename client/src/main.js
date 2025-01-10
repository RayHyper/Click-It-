import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import './index.css';
import App from './App.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import lvl2 from './views/lvl2.vue'
import lvl3 from './views/lvl3.vue'
import lvl4 from './views/lvl4.vue'

const routes = [
    {path: '/', component: Home},
    {path: '/lvl1', component: About},
    {path: '/lvl2', component: lvl2},
    {path: '/lvl3', component: lvl3},
    {path: '/lvl4', component: lvl4}
]

const router = createRouter({
    history: createWebHistory(),
    routes,

})

createApp(App).use(router).mount('#app')
