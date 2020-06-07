export default {
    template: `
        <article>
            <p v-if="isAbbreviated">{{abbreviatedTxt}}</p>
            <p v-else>{{txt}}</p>
            <button v-if="isLongTxt" @click="toggleAbreviation">{{readMoreLess}}</button>
        </article>
    `,
    props: ['txt'],
    data() {
        return {
            isLongTxt: false,
            isAbbreviated: true
        }
    },
    created() {
        this.checkTxtLength();
    },
    watch: { 
        txt: function() {
            this.checkTxtLength();
        }
    },
    computed: {
        abbreviatedTxt() {
            var abbreviatedTxt = this.txt.substring(0, 99)
            return (abbreviatedTxt + ((this.isLongTxt) ? '...' : ''));
        },
        readMoreLess() {
            return (this.isAbbreviated) ? 'Read More' : 'Read Less';
        }
    },
    methods: {
        checkTxtLength() {
            if (this.txt.length > 99) {
                this.isLongTxt = true;
                this.isAbbreviated = true;
            } else {
                this.isLongTxt = false;
                this.isAbbreviated = true;
            }
        },
        toggleAbreviation() {
            this.isAbbreviated = !this.isAbbreviated;
        }
    }
};