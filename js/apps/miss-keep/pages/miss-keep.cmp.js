import { noteService } from "../services/note.service.js";
import { eventBus, SAVE_NOTES, DELETE_NOTE, CHANGE_NOTE_STYLE } from '../../../services/event-bus.service.js';
import noteAdd from "../cmps/note-add.cmp.js"
import noteList from "../cmps/note-list.cmp.js"

export default {
    template: `
        <section class="miss-keep-container">
            <note-add></note-add>
            <div class="notes-container">
                <p v-if="pinnedNotes.length" class="list-lable">Pinned</p>
                <note-list v-if="pinnedNotes.length" :notes="pinnedNotes"></note-list>
                <p v-if="pinnedNotes.length && unPinnedNotes.length" class="list-lable">Others</p>
                <note-list v-if="unPinnedNotes.length" :notes="unPinnedNotes"></note-list>
            </div>
        </section>
    `,
    data() {
        return {
            notes: []
        }
    },
    created() {
        noteService.getNotesForDisplay()
            .then(notes => {
                this.notes = notes;
            });

        eventBus.$on(SAVE_NOTES, this.saveNotes);

        eventBus.$on(DELETE_NOTE, (noteId) => {
            this.deleteNote(noteId);
        });

        eventBus.$on(CHANGE_NOTE_STYLE, (evData) => {
            this.changeNoteStyle(evData.noteId, evData.style, evData.value)
        });
    },
    computed: {
        pinnedNotes() {
            return this.notes.filter(note => note.style.isPinned);
        },
        unPinnedNotes() {
            return this.notes.filter(note => !note.style.isPinned);
        }
    },
    methods: {
        saveNotes() {
            noteService.saveNotes()
                .then(() => {
                    console.log('notes saved')
                })
        },
        deleteNote(noteId) {
            noteService.deleteNote(noteId)
                .then(() => {
                    console.log('note deleted')
                })
        },
        changeNoteStyle(noteId, style, value) {
            noteService.changeNoteStyle(noteId, style, value)
                .then(() => {
                    console.log('style', style, value);
                })
        }
    },
    components: {
        noteAdd,
        noteList
    }
};


// eventBus.$on(EVENT_SHOW_MSG, (msg) => {
//     this.msg = msg;
//     if (this.timeout) clearTimeout(this.timeout);
//     this.timeout = setTimeout(() => {
//         this.msg = null;
//     }, 5000);
// })

// import { eventBus, EVENT_SHOW_MSG } from '../../../services/event-bus.service.js';
// eventBus.$emit(EVENT_SHOW_MSG, { txt: 'I am testing event bus', type: 'error' });