import homePage from './pages/home-page.cmp.js'
import aboutPage from './pages/about-page.cmp.js'

import misterEmail from './apps/mister-email/pages/mister-email.cmp.js'
import emailList from './apps/mister-email/cmps/email-list.cmp.js'
import emailCompose from './apps/mister-email/cmps/email-compose.cmp.js'
import emailDetails from './apps/mister-email/cmps/email-details.cmp.js'

import missKeep from './apps/miss-keep/pages/miss-keep.cmp.js'

import missBooks from './apps/miss-books/pages/miss-books.cmp.js'
import bookDetails from './apps/miss-books/pages/book-details.cmp.js'
import bookAdd from './apps/miss-books/pages/book-add.cmp.js'

const routes = [
    { path: '/', component: homePage },
    { path: '/about', component: aboutPage },
    { path: '/keep', component: missKeep },
    { path: '/email', component: misterEmail, 
        children: [
            { path: '', component: emailList },
            { path: 'compose/:id?', component: emailCompose },
            { path: ':id', component: emailDetails }
        ] 
    },
    { path: '/book', component: missBooks },
    { path: '/book/add', component: bookAdd },
    { path: '/book/:id', component: bookDetails }
];

export const router = new VueRouter({routes});