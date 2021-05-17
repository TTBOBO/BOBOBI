import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill';
import { baseUrl } from './api/env'
import './directive'

import Vuex from 'vuex'
Vue.use(Vuex);
Vue.config.productionTip = false

//引入store仓库
import store from './store/index'
import './assets/css/base.less'
import VConsole from 'vconsole';
Vue.prototype.baseUrl = baseUrl;
import {
    ajaxGet,
    ajaxPost,
    ajaxDelete,
    ajaxPut
} from './api/axios'

Vue.prototype.$ajaxGet = ajaxGet
Vue.prototype.$ajaxPost = ajaxPost
Vue.prototype.$ajaxDelete = ajaxDelete
Vue.prototype.$ajaxPut = ajaxPut

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')