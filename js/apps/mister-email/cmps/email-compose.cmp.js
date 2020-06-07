import { emailService } from "../services/email.service.js";
import { eventBus, EVENT_SHOW_MSG } from '../../../services/event-bus.service.js';

export default {
    template: `
        <section v-if="email" class="email-compose">
            <header :class="headerClass" class="flex align-center space-between" >
                <h3>{{headerMsg}}</h3>
                <button @click="exitCompose" class="exit-btn"><i class="fas fa-times"></i></button>
            </header>
            <form class="input-container" @submit.prevent="sendEmail">
                <input v-model="email.name" type="text" placeholder="To" required @input="debounce(saveDraft, 1000)" />
                <input v-model="email.subject" type="text" @keydown.enter.prevent placeholder="Subject" @input="debounce(saveDraft, 1000)" />
                <textarea v-model="email.body" placeholder="Compose email" @input="debounce(saveDraft, 1000)"></textarea>
                <section class="button-container flex align-center space-between">
                    <button type="submit" class="send-btn" title="Send email">Send</button>
                    <button type="button" @click="deleteDraft" class="delete-btn" title="Discard draft">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </section>
            </form>
        </section>
    `,
    data() {
        return {
            email: null,
            isSaveDraft: false,
            timeout: null,
            isReply: false
        }
    },
    created() {
        var params = this.$router.history.current.query
        console.log("params", params.length)
        if (Object.entries(params).length !== 0 ){
            this.isReply = true;
            this.email = params;
            this.email.subject = `RE: ${this.email.subject}`;
            this.email.body = `\n\n\n\n\n ${new Date(+this.email.sentAt).toLocaleString()}\n${this.email.body}`;
            this.email.sentAt = 0;
        } else {
            emailService.getEmptyEmail()
            .then(email => {
                this.email = email;
            });

        }
    },
    computed: {
        headerClass() {
            return (this.isSaveDraft) ? 'draft' : '';
        },
        headerMsg() {
            return (this.isSaveDraft) ? 'Draft saved' : 'New Message';
        }
    },
    methods: {
        sendEmail() {
            if (!this.email.name.includes('@')) this.email.name += '@gmail.com';
            emailService.sendEmail(this.email)
                .then(() => {
                    eventBus.$emit(EVENT_SHOW_MSG, { txt: 'Email was sent', type: 'success' });
                });
            this.$router.push('/email/');
        },
        deleteDraft() { 
            emailService.deleteEmail(this.email.id)
                .then(() => {
                    eventBus.$emit(EVENT_SHOW_MSG, { txt: 'Draft was discarded', type: 'success' });
                });
            this.$router.push('/email/');
        },
        saveDraft() {
            if (this.email.name || this.email.subject || this.email.body) {
                emailService.saveEmailDraft(this.email)
                    .then(() => {
                        this.isSaveDraft = true;
                        setTimeout(() => {
                            this.isSaveDraft = false;
                        },2000);
                    });
            }
        },
        
        exitCompose() {
            this.saveDraft();
            this.$router.push('/email');
        },
        debounce(func, time) {
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(func, time);
        }
    }
};