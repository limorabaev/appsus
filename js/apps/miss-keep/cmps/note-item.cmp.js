import { eventBus, SAVE_NOTES, DELETE_NOTE, CHANGE_NOTE_STYLE } from '../../../services/event-bus.service.js';
import noteTxt from '../cmps/note-txt.cmp.js';
import noteImg from '../cmps/note-img.cmp.js';
import noteVideo from '../cmps/note-video.cmp.js';
import noteTodos from '../cmps/note-todos.cmp.js';
import colorPicker from '../cmps/color-picker.cmp.js';
import noteEdit from '../cmps/note-edit.cmp.js';

export default {
    template: `
        <li class="note-item" :style="{ backgroundColor: note.style.color }"
        :class="{ marked: note.style.isMarked, pinned: note.style.isPinned }">
            <button class="mark-note-btn show-on-hover" @click="changeNoteStyle(note.id, 'mark')"
            title="Mark Note">
                <i class="fas fa-check-circle"></i>
            </button>
            <button class="pin-note-btn show-on-hover" @click="changeNoteStyle(note.id, 'pin')"
            title="Pin Note">
                <i class="fas fa-thumbtack"></i>
            </button>
            
            <component :is="note.type" :info="note.info" @checked="saveNotes"></component> 
            
            
            <color-picker @color="changeNoteStyle(note.id, 'color', $event)"
                :currColor="note.style.color" :class="{ reveal: isShowColors }"
            ></color-picker>
            <section class="flex align-center space-between">
                <div class="note-type-display"><i :class="noteTypeIcon"></i></div>
                <div class="note-btn-container show-on-hover">
                    <button class="edit-note-btn" @click="toggleEdit" :class="{ edit: isEdit }"
                    title="Edit Note">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="color-btn" @mouseover="toggleColorPicker" @mouseout="toggleColorPicker"
                    title="Note Color">
                        <i class="fas fa-palette"></i>
                    </button>
                    <button class="delete-note-btn" @click="deleteNote(note.id)" title="Delete Note">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </section>

            <note-edit v-if="isEdit" :note="note" @edit-finished="toggleEdit"></note-edit>
        </li>
    `,
    props: ['note'],
    data() {
        return {
            isShowColors: false,
            isEdit: false
        }
    },
    computed: {
        noteTypeIcon() {
            switch (this.note.type) {
                case 'noteTxt': return 'fas fa-font';
                case 'noteImg': return 'far fa-image';
                case 'noteVideo': return 'fab fa-youtube';
                case 'noteTodos': return 'fas fa-list';
            }
        }
    },
    methods: {
        toggleEdit() {
            this.isEdit = !this.isEdit;
        },
        toggleColorPicker() {
            this.isShowColors = !this.isShowColors;
        },
        saveNotes() {
            eventBus.$emit(SAVE_NOTES);
        },
        deleteNote(noteId) {
            eventBus.$emit(DELETE_NOTE, noteId);
        },
        changeNoteStyle(noteId, style, value) {
            eventBus.$emit(CHANGE_NOTE_STYLE, { noteId, style, value });
        }
    },
    components: {
        noteTxt,
        noteImg,
        noteVideo,
        noteTodos,
        colorPicker,
        noteEdit
    }
}