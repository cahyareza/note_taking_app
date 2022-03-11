const inputComponent = {
    template: `<input 
        :placeholder="placeholder" 
        class="input is-small" 
        type='text' />`,
    props: ['placeholder']
}

const app = {
    data() {
        return {
            notes: [],
            timestamps: [],
            placeholder: 'Enter a note'
        }
    },
    components: {
        'input-component': inputComponent
    }
}


Vue.createApp(app).mount('#app');