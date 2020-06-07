export default {
    template: `
        <nav class="navbar flex" @click = "closeScreen">
            <router-link to="/" exact> Home </router-link>
            
           
            
            <router-link to="/email" > Mister Email </router-link>
            
            <router-link to="/keep" > Miss Keep </router-link>
            
            
        </nav>
    `,
    // methods: {
    //     navClicked(){
    //         document.querySelector(body).classList.remove('menu-open');
    //     }
    // },

    data(){
        return {
            isScreen : false
        }
    },
    methods: {
        closeScreen(){
            document.querySelector('body').classList.remove('menu-open');
        }
    } 
    

};