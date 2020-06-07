export default {
    template: `
        <article>
            <p>{{review.name}}</p>
            <p>{{starRating}}</p>
            <p>Reviewed on {{reviewDate}}</p>
            <p class="pre-formatted">{{review.txt}}</p>
        </article>
    `,
    props: ['review'],
    computed: {
        reviewDate() {
            return this.review.readAt.split('-').reverse().join('-');
        },
        starRating() {
            return '⭐'.repeat(this.review.rating);
        }
    }
};