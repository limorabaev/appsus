export default {
    template: `
        <article class="note-video">
            <p v-if="!info.title && !info.url" class="empty-note">Empty note</p>
            <p v-if="info.title" class="title">{{info.title}}</p>
            <div v-if="info.url" class="video-container" ref="videoContainer">
                <iframe  :width="iframeWidth" :height="iframeHeight" 
                    :src="info.url" frameborder="0"  allowfullscreen
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            </div>
            <p v-else>Sorry, something went wrong while loding the video.</p>
        </article>
    `,
    props: ['info'],
    data() {
        return {
            iframeWidth: 0,
            iframeHeight: 0
        }
    },
    created() {
        if (this.info.url) window.addEventListener("resize", this.resizeIframe);
    },
    destroyed() {
        window.removeEventListener("resize", this.resizeIframe);
    },
    mounted() {
        if (this.info.url) this.resizeIframe();
    },
    methods: {
        resizeIframe() {
            this.iframeWidth = this.$refs.videoContainer.clientWidth;
            this.iframeHeight = this.iframeWidth * 0.5625;
        }
    }
}