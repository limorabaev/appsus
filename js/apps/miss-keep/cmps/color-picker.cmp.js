export default {
    template: `
        <div class="color-picker-container">
            <section class="color-picker">
                <template  v-for="(color, idx) in colors">
                    <div :class="{ marked: color === currColor }" :style="{ backgroundColor: color }"
                        @click="pickColor(color)"></div>
                </template>
            </section>
        </div>
    `,
    props: ['currColor'],
    data() {
        return {
            colors: ['#fff', '#e49086', '#f2be42', '#fef488', '#d7fd9d', '#bbfdec', '#d2eff7',
                '#b4cbf6', '#d1b1f6', '#f6d1e7', '#e2caac', '#e9eaed']
        }
    },
    methods: {
        pickColor(color) {
            this.$emit('color', color);
        }
    }
};