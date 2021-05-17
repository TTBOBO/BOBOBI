import * as type from '../constants/type'
import util from '../../assets/js/util'

export const infoMutations = {
    //退出登录
    [type.LOGINOUT](state) {
        util.clearLocalStorage()
        state.userInfo = {};
        //执行 退出登录 操作
    },
    [type.SETUSERINFO](state, userInfo) {
        state.userInfo = userInfo;
    }
}