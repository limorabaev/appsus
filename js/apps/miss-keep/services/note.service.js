import { utilService } from '../../../services/util.service.js';

const NOTE_KEY = 'notes';
const notesDB = _createNotes();

export const noteService = {
    getNotesForDisplay,
    getNoteById,
    getEmptyNote,
    saveNotes,
    addNote,
    updateNote,
    deleteNote,
    changeNoteStyle
}

function getNotesForDisplay() {
    return Promise.resolve(notesDB);
}

function getNoteById(noteId) {
    const note = notesDB.find(note => note.id == noteId);
    if (!note) return Promise.reject('Something bad happened');
    return Promise.resolve(note);
}

function getEmptyNote(type) {
    var info = { title: '' }
    switch (type) {
        case 'noteTxt':
            info.txt = '';
            info.placeholder = 'Take a note...';
            break;
        case 'noteImg':
            info.url = '';
            info.placeholder = 'Enter image url...';
            break;
        case 'noteVideo':
            info.url = '';
            info.placeholder = 'Enter Youtube video url...';
            break;
        case 'noteTodos':
            info.todos = [];
            info.placeholder = 'Enter a comma separated list...';
    }

    return {
        id: utilService.makeId(13),
        type: type,
        info: info,
        style: {
            isPinned: false,
            isMarked: false,
            color: '#fff'
        }
    }
}

function saveNotes() {
    utilService.saveToStorage(NOTE_KEY, notesDB);
    return Promise.resolve();
}

function addNote(note) {
    notesDB.unshift(note);
    saveNotes();
    return Promise.resolve();
}

function updateNote(noteToSave) {
    var idx = notesDB.findIndex(note => note.id === noteToSave.id);
    if (idx === -1) return Promise.reject('Something bad happened');
    notesDB.splice(idx, 1, noteToSave);
    saveNotes();
    return Promise.resolve();
}

function deleteNote(noteId) {
    var idx = notesDB.findIndex(note => note.id === noteId);
    if (idx !== -1) notesDB.splice(idx, 1);
    saveNotes();
    return Promise.resolve();
}

function changeNoteStyle(noteId, style, value) {
    var note = notesDB.find(note => note.id === noteId);
    if (!note) return Promise.reject('Something bad happened');

    switch (style) {
        case 'mark':
            note.style.isMarked = !note.style.isMarked;
            break;
        case 'pin':
            note.style.isPinned = !note.style.isPinned;
            break;
        case 'color':
            note.style.color = value;
    }

    saveNotes();
    return Promise.resolve();
}

function _createNotes() {
    var notes = utilService.loadFromStorage(NOTE_KEY);
    if (!notes) {
        var notes = [
            {
                id: utilService.makeId(13),
                type: 'noteTxt',
                info: {
                    title: 'The boy who lived',
                    txt: 'Mr. and Mrs. Dursley, of number four Privet Drive, were proud to say that they were perfectly normal, thank you very much.',
                    placeholder: 'Take a note...'
                },
                style: {
                    isPinned: false,
                    isMarked: false,
                    color: '#d7fd9d'
                }
            },
            {
                id: utilService.makeId(13),
                type: 'noteImg',
                info: {
                    title: '',
                    url: 'https://www.tiuli.com/image/ba7385bc9018bc8c5711f0ecd17e01a9.jpg?&width=1920',
                    placeholder: 'Enter image url...'
                },
                style: {
                    isPinned: false,
                    isMarked: false,
                    color: '#fef488'
                }
            },
            {
                id: utilService.makeId(13),
                type: 'noteTxt',
                info: {
                    title: '',
                    txt: '',
                    placeholder: 'Take a note...'
                },
                style: {
                    isPinned: false,
                    isMarked: false,
                    color: '#d2eff7'
                }
            },
            {
                id: utilService.makeId(13),
                type: 'noteImg',
                info: {
                    title: 'Everything is OK !!!',
                    url: 'img/success.png',
                    placeholder: 'Enter image url...'
                },
                style: {
                    isPinned: false,
                    isMarked: false,
                    color: '#bbfdec'
                }
            },
            {
                id: utilService.makeId(13),
                type: 'noteTodos',
                info: {
                    title: 'Do all the things',
                    todos: [
                        { txt: 'do this', isDone: false },
                        { txt: 'do that', isDone: true },
                        { txt: 'do something', isDone: false },
                        { txt: 'do some more', isDone: false },
                        { txt: 'do it all', isDone: false }
                    ],
                    placeholder: 'Enter a comma separated list...'
                },
                style: {
                    isPinned: true,
                    isMarked: false,
                    color: '#b4cbf6'
                }
            },
            {
                id: utilService.makeId(13),
                type: 'noteVideo',
                info: {
                    title: 'Shetland Wool Week',
                    url: 'https://youtube.com/embed/FMasGNWy6dA',
                    placeholder: 'Enter Youtube video url...'
                },
                style: {
                    isPinned: false,
                    isMarked: false,
                    color: '#d1b1f6'
                }
            },
            {
                id: utilService.makeId(13),
                type: 'noteTxt',
                info: {
                    title: 'Don`t forget to buy milk',
                    txt: 'and eggs, and bread, and granola...',
                    placeholder: 'Take a note...'
                },
                style: {
                    isPinned: false,
                    isMarked: false,
                    color: '#e49086'
                }
            },
            {
                id: utilService.makeId(13),
                type: 'noteTxt',
                info: {
                    title: 'Lorem ipsum',
                    txt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mollis, elit id placerat elementum, orci erat volutpat dui, et cursus magna mauris eget nulla. Mauris nec ipsum et leo commodo accumsan. Sed dignissim bibendum dignissim. Sed tempus gravida mi, at commodo lorem varius et. Pellentesque eget nisl ligula.',
                    placeholder: 'Take a note...'
                },
                style: {
                    isPinned: false,
                    isMarked: false,
                    color: '#f2be42'
                }
            }
        ];
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes;
}