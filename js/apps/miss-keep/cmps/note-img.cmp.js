export default {
    template: `
        <article class="note-img">
            <p v-if="!info.title && !info.url" class="empty-note">Empty note</p>
            <p v-if="info.title" class="title">{{info.title}}</p>
            <img v-if="info.url" :src="info.url" />
            <p v-else>Sorry, something went wrong while loding the image.</p>
        </article>
    `,
    props: ['info']
}