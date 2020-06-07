import { bookService } from '../services/book.service.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import bookList from '../cmps/book-list.cmp.js';

export default {
    template: `
        <section class="book-app">  
            <book-filter @filtered="setFilter"></book-filter>
            <book-list v-if="books" :books="booksToShow"></book-list>
        </section>
    `,
    data() {
        return {
            books: [],
            filterBy: null
        }
    },
    created() {
        bookService.getBooksForDisplay()
            .then(books => {
                this.books = books;
            });
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            return this.books.filter(book => {
                return  book.title.includes(this.filterBy.title) &&
                        book.listPrice.amount > this.filterBy.minPrice &&
                        book.listPrice.amount < this.filterBy.maxPrice
            });
        }
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    components: {
        bookList,
        bookFilter
    }
};