import reviewItem from '../cmps/review-item.cmp.js';

export default {
    template: `
        <ul class="review-list clean-list">
            <li v-for="review in reviews" :key="review.id">
                <button @click="deleteReview(review.id)">x</button>
                <review-item :review="review"></review-item>
            </li>
        </ul>
    `,
    props: ['reviews'],
    methods: {
        deleteReview(reviewId) {
            this.$emit('delete-review', reviewId);
        }
    },
    components: {
        reviewItem
    }
};