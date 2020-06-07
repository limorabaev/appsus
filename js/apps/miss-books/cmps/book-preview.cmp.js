export default {
    template: `
        <article class="book-preview">{{book.title}} {{book.listPrice.amount}}{{currency}}</article>
    `,
    props: ['book'],
    computed: {
        currency() {
            switch (this.book.listPrice.currencyCode) {
                case 'EUR': return '€';
                case 'USD': return '$';
                case 'ILS': return '₪';
                default: return '';
            }
        }
    }
};