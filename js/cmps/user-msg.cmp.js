import {eventBus, EVENT_SHOW_MSG} from '../services/event-bus.service.js'

export default {
    template: `
        <section v-if="msg" class="user-msg" :class="msg.type">
            <img :src="msgTypeImg" />
            <div class="msg-txt">
                <h3>{{msg.type}}!</h3>
                <p>{{msg.txt}}</p>
                <router-link v-if="msg.link" :to="msg.link">Check It Out</router-link>
            </div>
            <button @click="closeMsg">&times;</button>
        </section>
    `,
    data(){
        return {
            msg: null,
            timeout: null
        }
    },
    created() {
        eventBus.$on(EVENT_SHOW_MSG, (msg) => {
            this.msg = msg;
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.msg = null;
            }, 5000);
        })
    },
    computed: {
        msgTypeImg() {
            return (this.msg.type === 'success') ? 'img/success.png' : 'img/error.png';
        }
    },
    methods: {
        closeMsg() {
            this.msg = null;
            clearTimeout(this.timeout);
        }
    }
};