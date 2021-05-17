import Axios from 'axios';
import request from './api';
import { baseUrl } from './env'
import Qs from 'qs'
import {
    Toast,
    Dialog
} from 'vant';
const axios = Axios.create({
    timeout: 1300000,
    // withCredentials: true
});
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 是否正在刷新的标记
let isRefreshing = false
    // 重试队列，每一项将是一个待执行的函数形式
let requests = []
axios.interceptors.request.use(
    config => {
        // config.headers = {
        //     'Content-Type': 'application/json;charset=UTF-8'
        // };
        // let token = getToken();
        // if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        //     config.headers.Authorization = token;
        // }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
axios.interceptors.response.use(
    response => {
        if (response.data.code === 401) {
            localStorage.clear();
            Toast.clear();
            Toast('登录失效请重新登录');
            location.href = '/#/login'
        }
        return response.data;
    },
    error => {
        if (Axios.isCancel(error)) {
            return Promise.reject({
                code: -1,
                message: error.message,
                result: null
            });
        }
        console.log(error)
            // 网络错误,4xx,5xx,统一转化为resolve为对应format{code,errmsg}
        const st = error.response.status;
        if (error.response.data.msg == '123') {
            Toast.clear();
            Dialog.alert({
                title: '警告提示',
                message: '账号因被投诉或违规操作被禁用，请联系客服解冻'
            }).then(() => {
                localStorage.clear();
                window.history.go(-1)
                location.href = '/#/login'
            });
            Toast('登录失效请重新登录');
        } else if (st === 401) {

            localStorage.clear();
            Toast.clear();
            Toast('登录失效请重新登录');
            location.href = '/#/login'
            return false;
            const config = error.config
            if (!isRefreshing) {
                isRefreshing = true
                return getRefreshTokenFunc()
                    .then((res) => {

                        // localStorage.setItem('access_token', res || res.data.access_token)
                        // config.headers['Authorization'] = getToken()
                        // 已经刷新了token，将所有队列中的请求进行重试
                        requests.forEach((cb) => {
                                cb(getToken())
                            })
                            // 重试完清空这个队列
                        requests = []
                        return axios(config)
                    })
                    .catch((err) => {
                        console.log(err)
                            // Message.warning('token失效重新登录')
                            //   localStorage.setItem('access_token', '')
                            //   location.href = '/'
                    })
                    .finally(() => {
                        isRefreshing = false
                    })
            } else {
                // 正在刷新token，返回一个未执行resolve的promise
                return new Promise((resolve) => {
                    // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
                    // @ts-ignore
                    requests.push((token) => {
                        config.baseURL = ''
                        config.headers['Authorization'] = token
                        resolve(axios(config))
                    })
                })
            }
        } else if (st !== 503 && st >= 400 && st < 599) {
            // error.response.dataOrigin = error.response.data;
            // error.response.data = error.response.data;
            // console.log(error.response)
            // Toast('提示内容');
            // error.response.msg = error.response.statusText
            return Promise.resolve(error.response.data);
        } else {
            return Promise.reject(new Error(error));
        }
    }
);
axios.defaults.baseURL =
    process.env.NODE_ENV === 'production' ?
    `${baseUrl}/Api/` :
    `${baseUrl}/Api/`;
export const ajaxGet = async(url, params = {}) =>
    await doAjax(url, params, 'get');
export const ajaxPost = async(url, params = {}) =>
    await doAjax(url, params, 'post');
export const ajaxDelete = async(url, params = {}) =>
    await doAjax(url, params, 'delete');
export const ajaxPut = async(url, params = {}) =>
    await doAjax(url, params, 'put');

function doAjax(url, params = {}, type) {
    let token = getToken();
    if (token) {
        params.token = token;
    }
    return axios[type](
        request[url],
        type === 'get' || type === 'delete' ? {
            params
        } : ['updateImg'].includes(url) ? params : Qs.stringify(params)


    );
}

function getToken() {
    return localStorage.getItem('access_token');
}
async function getRefreshTokenFunc() {
    return new Promise(async(resolve, reject) => {
        try {
            let {
                data: {
                    access_token,
                    token_type
                }
            } = await ajaxPost('refresh_token');
            localStorage.setItem('access_token', token_type + ' ' + access_token)
            resolve(token_type + ' ' + access_token)
        } catch (error) {
            localStorage.clear();
            Toast.clear();
            Toast('登录失效请重新登录');
            location.href = '/#/login'
            reject(error)
        }
    })
}