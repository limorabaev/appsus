import { emailService } from '../services/email.service.js';
import { eventBus, EVENT_SHOW_MSG } from '../../../services/event-bus.service.js';

export default {
    template: `
        <section class = "email-details flex direction-column" v-if="email">
        <section class = "details-controls flex space-between">
            <section class ="mail-pagination"v-if="nextPrevEmailIds">
                <router-link class = "control" :to="nextPrevEmailIds.prevId"><small><i class="fas fa-chevron-left"></i> Prev </small></router-link>
                <router-link class = "control" :to="nextPrevEmailIds.nextId"><small>Next <i class="fas fa-chevron-right"></i></small></router-link>
            </section>
            <router-link :to = "{path: '/email/compose', query: email}" class = "control fas fa-reply"></router-link>

        </section>
            <h2>{{email.subject}}</h2>
            <div class = "small-info flex space-between">
                <small>{{email.name}}</small>
                <small>{{formattedTime}}</small>
            </div>
            <div class = "mail-body flex direction-column space-between">    
                <p>{{email.body}}</p>
               
            </div>
            
        </section>
    `,
    data() {
        return {
            email: null,
            nextPrevEmailIds: null
        }
    },
    created() {
        this.getEmail();
    },
    watch: {
        '$route.params.id'(to, from) {
            this.getEmail();
        }
    },
    computed: {
        formattedTime() {
            return new Date(this.email.sentAt).toLocaleString();
        }
    },
    methods: {
        getEmail() {
            const id = this.$route.params.id;
            emailService.getEmailById(id)
                .then(email => {
                    this.email = email;
                    this.email.isRead = true;
                    emailService.getNextPrevEmailIds(this.email.id)
                        .then(nextPrevEmailIds => {
                            this.nextPrevEmailIds = nextPrevEmailIds;
                        })
                        .catch(err => {
                            eventBus.$emit(EVENT_SHOW_MSG, { txt: err, type: 'error' });
                        });
                })
                .catch(err => {
                    eventBus.$emit(EVENT_SHOW_MSG, { txt: err, type: 'error' });
                });
        }
    }
};