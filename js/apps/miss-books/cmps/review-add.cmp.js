import { bookService } from '../services/book.service.js';
import { eventBus, EVENT_SHOW_MSG } from '../../../services/event-bus.service.js';
import reviewList from '../cmps/review-list.cmp.js';

export default {
    template: `
        <section class="review-container">
            <form class="review-add" @submit.prevent="saveReview">
                <input ref="reviewInput" type="text" v-model.trim="review.name" placeholder="Full Name" />
                <input type="date" v-model="review.readAt"  />
                <select v-model.number="review.rating">
                    <option v-for="i in 5">{{i}}</option>
                </select>
                <div class="form-row">
                    <textarea placeholder="Write your review here" v-model.lazy="review.txt"></textarea>
                </div>            
                <button>Save Review</button>
            </form>
            <review-list :reviews="reviews" @delete-review="deleteReview"></review-list>
        </section>
    `,
    props: ['reviews', 'bookId'],
    data() {
        return {
            review: null
        }
    },
    created() {
        this.review = bookService.getEmptyReview();
    },
    mounted() {
        this.$refs.reviewInput.focus();
    },
    methods: {
        saveReview() {
            bookService.addReview(this.bookId, this.review)
                .then(() => {
                    eventBus.$emit(EVENT_SHOW_MSG, { txt: 'Your review was saved', type: 'success' });
                    this.review = bookService.getEmptyReview();
                })
        },
        deleteReview(reviewId) {
            bookService.deleteReview(this.bookId, reviewId)
                .then(() => {
                    eventBus.$emit(EVENT_SHOW_MSG, { txt: 'Your review was deleted', type: 'success' });
                })
        }
    },
    components: {
        reviewList
    }
};