export const EVENT_SHOW_MSG = 'show-msg';
export const DELETE_NOTE = 'delete-note';
export const CHANGE_NOTE_STYLE = 'change-note-style';
export const SAVE_NOTES = 'save-notes';
export const EVENT_SET_FILTER = 'set-filter';

export const eventBus = new Vue();

// import { eventBus, EVENT_SHOW_MSG } from '../../../services/event-bus.service.js';
// eventBus.$emit(EVENT_SHOW_MSG, { txt: 'I am testing event bus', type: 'error' });