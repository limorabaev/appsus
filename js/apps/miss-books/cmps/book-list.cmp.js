import bookPreview from './book-preview.cmp.js';

export default {
    template: `
        <ul class="book-list clean-list">
            <router-link v-for="book in books" :key="book.id" :to="'/book/' + book.id">
                <li>
                    <book-preview :book="book"></book-preview>
                </li>
            </router-link>
        </ul>
    `,
    props: ['books'],
    components: {
        bookPreview
    }
};