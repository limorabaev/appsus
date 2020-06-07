export default {
    template: `
    <li class = "email-preview "   @click= "toggleExpended" :class = "readStatus">
        <section class = "preview-header flex space-between">
            <p class = "name">{{email.name}} </p>
            <p class = "subject"> {{email.subject}}-</p>
            <p>{{formattedBodyShort}} </p>
            <small>{{formattedTime}}</small>
        </section>
        <section class = "expended" v-if = "isExpended">
            <div class = "flex space-between">
                
                <h3>{{email.subject}}</h3>
                <div>
                <router-link :to="'/email/'+email.id" > 
                    <button class="fas fa-expand"></button>
                </router-link>   
                <button @click.stop = "deleteClicked" class = "fas fa-trash-alt"></button>
                <button @click.stop = "toggleRead" :class = "toggleReadIcon"></button>
                </div>
                
            </div>
            <p>{{formattedBodyLong}}</p> 


        </section>
    </li>`,
    
    props: ['email'],

    data(){
        return {
            isExpended : false,
            
        }
    },

    computed: {
        formattedTime(){
            var date = new Date(this.email.sentAt);
            return (this.email.sentAt) ? date.toLocaleString() : '';
        },
        formattedBodyShort(){
            return (this.email.body.length > 80) ? (this.email.body.substring(0,79) + '...'): this.email.body.substring(0,99);
        },
        formattedBodyLong(){
            return (this.email.body.length > 300) ? (this.email.body.substring(0,299) + '...'): this.email.body.substring(0,299);
        },
        previewSize(){
            return (this.isExpended) ? 'expended' : 'small';
        },
        toggleReadIcon(){
            return (this.email.isRead) ? 'fas fa-envelope-open' : 'fas fa-envelope';
        },
        readStatus(){
            return (this.email.isRead) ? 'read': 'unread';
        }
    },
    methods: {
        toggleExpended(){
            console.log("toggle expended")
        
            if(!this.email.isRead) this.$emit('read', this.email.id);
            this.isExpended = !this.isExpended;
        },

        toggleRead(){
            if(!this.email.isRead) this.$emit('read', this.email.id);
            else this.$emit('unread', this.email.id);

        },

        deleteClicked(){
            this.$emit('delete', this.email.id);
        }

    },
    created (){
        this.isExpended =false;
    },
    watch: {
        '$route'(to,from){
            this.isExpended =false;
 
        }
    },
    
    
};