import emailFilter from '../cmps/email-filter.cmp.js'
import { emailService } from '../services/email.service.js'

export default {
    template: `
        <section class = "mister-email flex space-between">
            <nav @click = "toggleFilters" class = "nav-container flex direction-column align-start" >
                <button  class="menu-btn" >☰</button>
                <email-filter></email-filter>
            </nav>
            <router-link to = "email/compose"><button class ="compose"><i class="fas fa-plus"></i><span> Compose</span></button></router-link>

            <router-view></router-view>

        </section>
    `,
    
    components: {
        emailFilter
    },

    methods: {
        toggleFilters(){
            document.querySelector('.mister-email').classList.toggle('filters-open');
        }
    }

   

    
   

};