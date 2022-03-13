const state = {
    notes: [],
    timestamps: []
}

const mutations = {
    ADD_NOTES (state, payloads) {
        let newNote = payloads;
        state.notes.push(newNote);
    },
    ADD_TIMESTAMP (state, payloads) {
        let newTimestamp = payloads;
        state.timestamps.push(newTimestamp);
    }
}

const actions = {
    addNote (context, payloads) {
        context.commit('ADD_NOTES', payloads);
    },
    addTimestamp (context, payloads) {
        context.commit('ADD_TIMESTAMP', payloads);
    }
}

const getters = {
    getNotes: state => state.notes,
    getTimestamps: state => state.timestamps,
    getNoteCounts: state => state.notes.length,
}

const store = Vuex.createStore({
    state,
    mutations,
    actions,
    getters
})

const inputComponent = {
    template: `<input 
        placeholder="Enter a note"
        v-model="input"
        @keyup.enter="monitorEnterKey"
        class="input is-small" 
        type='text' />`,
    data() {
        return {
            input: "",
        };
    },
    methods: {
        monitorEnterKey() {
            this.$store.dispatch('addNote', this.input);
            this.$store.dispatch('addTimestamp', new Date().toLocaleString());
            this.input = "";
        }
    }
}

const noteCountComponent = {
    template: `<div class="note-count" style="text-align: center;">Note count: <strong>{{ noteCount }}</strong></div>`,
    computed: {
        noteCount() {
            return this.$store.getters.getNoteCounts;
        }
    }
};


const app = Vue.createApp({
    computed: {
        notes() {
            return this.$store.getters.getNotes;
        },
        timestamps() {
            return this.$store.getters.getTimestamps;
        },
    },
    components: {
        'input-component': inputComponent,
        'note-count-component': noteCountComponent,
    }
})

app.use(store)
app.mount('#app')