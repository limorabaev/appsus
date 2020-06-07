import { utilService } from '../../../services/util.service.js';
import { noteService } from "../services/note.service.js"

export default {
    template: `
        <section class="note-add flex align-center space-between">
            <section class="input-container flex direction-column align-start">
                <input v-show="isOpen" v-model="note.info.title" placeholder="Title"
                    @keydown.enter="addNote" />
                <input v-model="content" :placeholder="note.info.placeholder" 
                    @click="openInputs" @input="openInputs" @keydown.enter="addNote" />
                <button v-show="isOpen" class="note-add-btn" @click="addNote">Close</button>
            </section>
            <section class="button-container flex" :class="{ 'direction-column': isOpen }">
                <button @click="changeType('noteTxt')" :class="{ active: note.type === 'noteTxt' }"
                title="Text note">
                    <i class="fas fa-font"></i>
                </button>
                <button @click="changeType('noteImg')" :class="{ active: note.type === 'noteImg' }"
                title="Image note">
                    <i class="far fa-image"></i>
                </button>
                <button @click="changeType('noteVideo')" :class="{ active: note.type === 'noteVideo' }"
                title="Video note">
                    <i class="fab fa-youtube"></i>
                </button>
                <button @click="changeType('noteTodos')" :class="{ active: note.type === 'noteTodos' }"
                title="List note">
                    <i class="fas fa-list"></i>
                </button>
            </section>
        </section>
    `,
    data() {
        return {
            note: null,
            content: '',
            isOpen: false
        }
    },
    created() {
        this.note = noteService.getEmptyNote('noteTxt')
    },
    methods: {
        openInputs() {
            this.isOpen = true;
        },
        changeType(type) {
            this.note = noteService.getEmptyNote(type)
        },
        addNote() {
            this.isOpen = false;
            if (!this.note.info.title && !this.content) return;
            switch (this.note.type) {
                case 'noteTxt':
                    this.note.info.txt = this.content;
                    break;
                case 'noteImg':
                    this.note.info.url = this.content;
                    break;
                case 'noteVideo':
                    const videoId = utilService.getYoutubeVideoId(this.content);
                    this.note.info.url = (videoId) ? `https://www.youtube.com/embed/${videoId}` : '';
                    break;
                case 'noteTodos':
                    this.note.info.todos = this.content.split(',').filter(todo => todo).map(todo => {
                        return {
                            txt: todo,
                            isDone: false
                        };
                    });
            }
            this.content = '';
            noteService.addNote(this.note)
                .then(() => {
                    console.log('added note')
                });
            this.note = noteService.getEmptyNote('noteTxt');
        }
    }
}