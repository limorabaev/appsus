export default {
    template: `
        <section class="book-filter">
            <h3>Filter Books</h3>
            <form @submit.prevent="emitFilter">
                <label>
                    Book Title: <input type="text" v-model="filterBy.title" placeholder="Filter by book title" />
                </label>
                <label>
                    From price: <input type="number" v-model="filterBy.minPrice" placeholder="0" />
                </label>
                <label>
                    To price: <input type="number" v-model="filterBy.maxPrice" placeholder="1000" />
                </label>
                <button class="filter-btn">Filter</button>
            </form>
        </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                minPrice: 0,
                maxPrice: 1000
            }
        }
    },
    methods: {
        emitFilter() {
            if (!this.filterBy.maxPrice) this.filterBy.maxPrice = 1000;
            if (!this.filterBy.minPrice) this.filterBy.minPrice = 0;
            this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)))
        }
    }
};