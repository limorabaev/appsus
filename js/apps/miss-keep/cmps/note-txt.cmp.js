export default {
    template: `
        <article class="note-txt">
            <p v-if="!info.title && !info.txt" class="empty-note">Empty note</p>
            <p v-if="info.title" class="title">{{info.title}}</p>
            <p v-if="info.txt">{{info.txt}}</p>
        </article>
    `,
    props: ['info']
}