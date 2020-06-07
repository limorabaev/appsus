import { emailService } from '../services/email.service.js';
import { eventBus, EVENT_SHOW_MSG ,EVENT_SET_FILTER} from '../../../services/event-bus.service.js';
import emailPreview from './email-preview.cmp.js'



{/* <router-link :to="'/email/'+email.id" v-for="email in emails" :key="email.id" >  */ }

export default {
    template: `
        <section class ="email-list">
            <ul class = "clean-list">
                <email-preview :email="email"  v-for="email in filteredEmails"
                 
                 :key="email.id" 
                 @read = "markAsRead" 
                 @unread = "markAsUnread"
                 @delete= "deleteEmail">
                 </email-preview>
            </ul>
        </section>
    `,
    data() {
        return {
            emails: [],
            filteredEmails : [],
        }
    },

    methods: {
        deleteEmail(emailId) {
            emailService.deleteEmail(emailId)
                .then(() => {
                    this.filterEmails()
                    eventBus.$emit(EVENT_SHOW_MSG, { txt: 'Email was deleted', type: 'success' });
                });
        },

        markAsRead(emailId) {
            console.log("mark red")
            emailService.isReadToggle(emailId);
            var email = this.filteredEmails.find(email =>email.id === emailId);
            email.isRead = !email.isRead;
            console.log(email)
            // readEmail.isRead = !readEmail.isRead;
        },

        markAsUnread(emailId){
            console.log("mark unred")

            emailService.isReadToggle(emailId);
            var email = this.filteredEmails.find(email =>email.id === emailId);
            email.isRead = !email.isRead;
            console.log(email)

        },


        filterEmails() {
            var emails = JSON.parse(JSON.stringify(this.emails))
            if (this.filterBy === 'all' || !this.filterBy) this.filteredEmails =  emails;
            if (this.filterBy === 'sent'){
                this.filteredEmails = emails.filter( email => email.isSent)
            }
            if (this.filterBy === 'read'){
                this.filteredEmails = emails.filter( email => email.isRead )
            }
            if (this.filterBy === 'unread'){
                this.filteredEmails = emails.filter( email => !email.isRead )
            }

            if (this.filterBy === 'draft'){
                
                this.filteredEmails = emails.filter( email => !email.sentAt)
            }
            
            
        }
    },

    

    created() {
        emailService.getEmailsForDisplay()
            .then(emails => {
                this.emails = emails;
                // this.filteredEmails = emails;
                const params = window.location.hash.split("?")[1]
                console.log(params)
                if (params) this.filterBy = params.split("=")[1];
                this.filterEmails()
               
            });
    },

    watch: {
        '$route'(to,from){
            const params = window.location.hash.split("?")[1]
            if (params) this.filterBy = params.split("=")[1];
            this.filterEmails()


        }
    },
    components: {
        emailPreview
    }
};