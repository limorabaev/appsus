import { bookService } from '../services/book.service.js';
import { eventBus, EVENT_SHOW_MSG } from '../../../services/event-bus.service.js';
import { googleBookService } from '../services/google-book.service.js';

export default {
    template: `
        <section>
            <input ref="searchInput" v-model="searchStr" @input="search" type="text" placeholder="Search for a book" />
            <button @click="clearSearch">x</button>
            <ul v-if="googleBooks.length">
                <li v-for="(book, idx) in googleBooks">
                    {{book.volumeInfo.title}}
                    <button @click="addGoogleBook(idx)">+</button>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            searchStr: '',
            googleBooks: []
        }
    },
    mounted() {
        this.$refs.searchInput.focus();
    },
    methods: {
        clearSearch() {
            this.searchStr = '';
            this.googleBooks = [];
        },
        search() {
            if (!this.searchStr) {
                this.googleBooks = [];
                return;
            }
            googleBookService.getBookSearchResults(this.searchStr)
                .then(books => {
                    this.googleBooks = books;
                })
        },
        addGoogleBook(bookIdx) {
            const googleBook = this.googleBooks[bookIdx];
            bookService.addGoogleBook(googleBook)
                .then(() => {
                    eventBus.$emit(EVENT_SHOW_MSG, {
                        txt: `Book ${googleBook.id} was successfully added`,
                        type: 'success',
                        link: `/book/${googleBook.id}`
                    });
                })
                .catch(err => {
                    eventBus.$emit(EVENT_SHOW_MSG, {
                        txt: `Faild to add book ${googleBook.id}. ${err}`,
                        type: 'error'
                    });
                })
        }
    }
};