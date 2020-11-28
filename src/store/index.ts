import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function getTime() {
    const date = new Date();
    return  date.getHours() +":"+date.getMinutes()+":"+date.getSeconds();
}

export default new Vuex.Store({
    state: {
        linkAPI: "http://localhost:3000/users",
        dataElements: Array<any>(),
        dataSelectElements: Array<any>(),
        dataHistory: Array<any>(),
        time: String
    },
    mutations: {
        setDataElements(state, payload) {
            state.dataElements = payload
        },

        setSelectDataElements(state, payload) {
            state.dataSelectElements.push(payload)
        },

        removeLeftToRight(state,payload){
            const arrayBuffer: any[] = [];
            state.dataElements.forEach((item) => {
                if(item.id !== payload.id) arrayBuffer.push(item);
            });
            state.dataElements = arrayBuffer;
            state.dataHistory.push({time:getTime(), action: "Добавление" ,item:payload})
        },

        removeRightToLeft(state,payload){
            const arrayBuffer: any[] = [];
            state.dataSelectElements.forEach((item) => {
                if(item.id !== payload.id)   arrayBuffer.push(item);
            });
            state.dataSelectElements = arrayBuffer;
            state.dataElements.push(payload);
            state.dataHistory.push({time:getTime(), action: "Удаление" ,item:payload})
        }
    },
    actions: {
        getDataFromServer(state) {
            fetch(state.state.linkAPI)
                .then(response => response.json())
                .then(commits => this.commit("setDataElements", commits))
        }
    },
    getters: {
        getDataElements(state) {
            return state.dataElements;
        },
        getSelectDataElements(state) {
            return state.dataSelectElements;
        },
        getHistory(state) {
            return state.dataHistory;
        }
    },
    modules: {}
});
