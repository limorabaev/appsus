import { utilService } from '../../../services/util.service.js';
import { noteService } from "../services/note.service.js"

export default {
    template: `
        <section class="note-edit">
            <input v-model="noteCopy.info.title" placeholder="Title" />
            <input v-model="content" :placeholder="noteCopy.info.placeholder" @keydown.enter="updateNote" />
            <div class="edit-btn-container flex space-between">
                <button class="cancel-btn" @click="finishEdit" title="Cancel">
                    <i class="fas fa-times"></i>
                </button>
                <button class="update-btn" @click="updateNote" title="Update Note">
                    <i class="fas fa-check"></i>
                </button>
            </div>
        </section>
    `,
    props: ['note'],
    data() {
        return {
            noteCopy: null,
            content: ''
        }
    },
    created() {
        this.initEdit();
    },
    watch: {
        note: function() {
            this.initEdit();
        }
    },
    methods: {
        initEdit() {
            this.noteCopy = JSON.parse(JSON.stringify(this.note));
            switch (this.noteCopy.type) {
                case 'noteTxt':
                    this.content = this.noteCopy.info.txt;
                    break;
                case 'noteImg':
                case 'noteVideo':
                    this.content = this.noteCopy.info.url;
                    break;
                case 'noteTodos':
                    this.content = this.noteCopy.info.todos.map(todo => todo.txt).join(',');
            }
        },
        updateNote() {
            switch (this.noteCopy.type) {
                case 'noteTxt':
                    this.noteCopy.info.txt = this.content;
                    break;
                case 'noteImg':
                    this.noteCopy.info.url = this.content;
                    break;
                case 'noteVideo':
                    const videoId = utilService.getYoutubeVideoId(this.content);
                    this.noteCopy.info.url = (videoId) ? `https://www.youtube.com/embed/${videoId}` : '';
                    break;
                case 'noteTodos':
                    this.noteCopy.info.todos = this.content.split(',').filter(todo => todo).map(todo => {
                        return {
                            txt: todo,
                            isDone: false
                        };
                    });
            }
            noteService.updateNote(this.noteCopy)
                .then(() => {
                    console.log('updated note');
                });
            this.finishEdit();
        },
        finishEdit() {
            this.$emit('edit-finished');
        }
    }
}