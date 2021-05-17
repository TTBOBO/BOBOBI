import Vue from 'vue'
import Vuex from 'vuex'
import info from './modules/info'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        info
    }
})

export default store