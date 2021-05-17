import Vue from 'vue'
import Router from 'vue-router'

//返回上一页
Router.prototype.back = function() {
    this.isBack = true
    this.go(-1)
}

//下一页
Router.prototype.next = function(...arg) {
        this.isBack = false
        this.push(...arg)
    }
    //跳转指定页面
Router.prototype.goto = function(rt, isBack = false) {
    this.isBack = isBack
    this.replace(rt)
}


Vue.use(Router)

export default new Router({
    routes: [{
        ///components/index/index
        path: '/',
        name: 'home',
        component: resolve => {
            require(['@/view/home/Index.vue'], resolve)
        },
        hiddent: true,
        title: '首页'
    }, ]
})