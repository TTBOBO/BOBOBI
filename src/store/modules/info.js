import {
    infoAction
} from '../actions/info'
import {
    infoMutations
} from '../mutations/info'

const pageInfo = {
    state: {
        userInfo: null,
    },
    getters: {
        userInfo: state => state.userInfo
    },
    actions: infoAction,
    mutations: infoMutations
}

export default pageInfo