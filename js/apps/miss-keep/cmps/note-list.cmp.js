import noteItem from "../cmps/note-item.cmp.js"

export default {
    template: `
        <ul class="note-list clean-list">
            <note-item v-for="note in notes" :note="note"></note-item>
        </ul>
    `,
    props: ['notes'],
    components: {
        noteItem
    }
};