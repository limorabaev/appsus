import {router} from './routes.js';
import navBar from './cmps/nav-bar.cmp.js';
import userMsg from './cmps/user-msg.cmp.js';

new Vue({
    el: '#appsus',
    router,
    template: `
    <section>
        <div class="screen" @click="toggleMenu"></div>
        <header class = "appsus-header flex space-between align-center">
            <h1>APPSUS</h1>
            <nav-bar></nav-bar>
            <button class="menu-btn" @click="toggleMenu">☰</button>

        </header>
        <user-msg></user-msg>
        <router-view></router-view>
    </section>
    `,
    methods: {
        toggleMenu(){
            document.body.classList.toggle('menu-open');
            

        }

    },
    components: {
        navBar,
        userMsg
    }
});