import { bookService } from "../services/book.service.js";
import reviewAdd from '../cmps/review-add.cmp.js';
import longText from "../../../cmps/long-text.cmp.js";

export default {
    template: `
        <section v-if="book" class="book-details">
            <h2>{{book.title}}</h2>
            <h3>{{book.subtitle}}</h3>
            <h4>By {{book.authors.join(', ')}}</h4>
            <div class="book-img">
                <img :src="book.thumbnail" />
                <img v-if="book.listPrice.isOnSale" src="img/sale.png" class="sale-tag" />
            </div>
            <long-text :txt="book.description"></long-text>
            <p>Published: {{publishedDateFormatted}}</p>
            <p>Length: {{pageCountFormatted}}</p>
            <p>Categories: {{book.categories.join(', ')}}</p>
            <p>Language: {{book.language}}</p>
            <p>Price: <span :class="priceClass">{{book.listPrice.amount}}{{currency}}</span></p>

            <section v-if="nextPrevBookIds">
                <router-link :to="nextPrevBookIds.prevId">Prev</router-link>
                <router-link :to="nextPrevBookIds.nextId">Next</router-link>
            </section>
            
            <review-add :reviews="book.reviews" :bookId="book.id"></review-add>
        </section>
    `,
    data() {
        return {
            book: null,
            nextPrevBookIds: null
        }
    },
    created() {
        this.getBook();
    },
    watch: {
        '$route.params.id'(to, from) {
            this.getBook();
        }
    },
    computed: {
        pageCountFormatted() {
            var pageCountStr = `${this.book.pageCount} Pages`;
            if (this.book.pageCount > 500) pageCountStr += ' - Long reading';
            else if (this.book.pageCount > 200) pageCountStr += ' - Decent reading';
            else if (this.book.pageCount < 100) pageCountStr += ' - Light reading';
            return pageCountStr;
        },
        publishedDateFormatted() {
            var publishedStr = `${this.book.publishedDate}`;
            var currYear = new Date().getFullYear();
            if (currYear - this.book.publishedDate > 10) publishedStr += ' - Veteran Book';
            else if (currYear - this.book.publishedDate < 1) publishedStr += ' - New!';
            return publishedStr;
        },
        currency() {
            switch (this.book.listPrice.currencyCode) {
                case 'EUR': return '€';
                case 'USD': return '$';
                case 'ILS': return '₪';
                default: return '';
            }
        },
        priceClass() {
            return  (this.book.listPrice.amount > 150) ? 'high-price' : 
                    (this.book.listPrice.amount < 20) ? 'low-price' : '';
        }
    },
    methods: {
        getBook() {
            const bookId = this.$route.params.id;
            bookService.getBookById(bookId)
                .then(book => {
                    this.book = book;
                    bookService.getNextPrevBookIds(bookId)
                        .then(nextPrevBookIds => {
                            this.nextPrevBookIds = nextPrevBookIds;
                        });
                });
        }
    },
    components: {
        longText,
        reviewAdd
    }
};