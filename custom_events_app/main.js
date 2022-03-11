const emitter = mitt();

const inputComponent = {
    template: `<input 
        :placeholder="placeholder"
        v-model="input"
        @keyup.enter="monitorEnterKey"
        class="input is-small" 
        type='text' />`,
    props: ['placeholder'],
    data() {
        return {
            input: "",
        };
    },
    methods: {
        monitorEnterKey() {
            emitter.emit("add-note", {
                note: this.input,
                timestamp: new Date().toLocaleString(),
            });
            this.input = "";
        },
    },
};

const app = {
    data() {
        return {
            notes: [],
            timestamps: [],
            placeholder: 'Enter a note'
        }
    },
    created() {
        emitter.on("add-note", (event) => this.addNote(event));
    },
    methods: {
        addNote(event) {
            this.notes.push(event.note);
            this.timestamps.push(event.timestamp);
            console.log('addnote');
        },
    },
    components: {
        'input-component': inputComponent
    }
}


Vue.createApp(app).mount('#app');