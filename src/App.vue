<template>
  <div id="app">
    <!-- <transition :name="transitionName"> -->
    <router-view
      class="view-con child-view"
      :style="{ bottom: shwoBar ? 50 + 'px' : 0 + 'px' }"
    ></router-view>
    <!-- </transition> -->
    <!-- <tab-bar v-show="shwoBar"></tab-bar> -->
    <!-- <pop></pop> -->
  </div>
</template>

<script>
import tabBar from "@/components/base/tabbar/tabbar";
// import pop from '@/components/pop/pop';
import { mapState, mapMutations } from "vuex";
import "@/directive/index.js";
export default {
  name: "app",
  data() {
    return {
      transitionName: "slide-left",
      shwoBar: false,
      fadein: "",
      top: 40,
      bottom: 55,
      noTransition2: [
        "/login",
        "/forgetPwd",
        "/register",
        "/invitation",
        "/registerNext",
        "/verification",
        "/setPwd",
      ],
    };
  },
  computed: {
    ...mapState(["globel"]),
  },
  methods: {
    ...mapMutations(["SETUSERINFO"]),
    keyBack() {
      // window.isExit = false;
      // /*监听返回键事件*/
      // api.addEventListener(
      //   {
      //     name: "keyback"
      //   },
      //   function() {
      //     if (window.isExit) {
      //       api.closeWidget({
      //         id: "A6021186574762", //在项目根目录 config.xml 的 <widget> 标记 的 id 属性
      //         silent: true
      //       });
      //     } else {
      //       api.toast({
      //         msg: "再按一次退出应用",
      //         duration: 1000,
      //         location: "bottom"
      //       });
      //       window.isExit = true;
      //       setTimeout(function() {
      //         window.isExit = false;
      //       }, 1000);
      //     }
      //   }
      // );
      this.isExit = false;
      // window.apiready = function () {
      //   console.log(api);
      //   if (typeof api == "undefined") {
      //     return;
      //   }

      //   api.addEventListener(
      //     {
      //       name: "keyback"
      //     },
      //     function () {
      //       if (window.isExit) {
      //         api.closeWidget({
      //           id: "你的APPID", //在项目根目录 config.xml 的 <widget> 标记 的 id 属性
      //           silent: true
      //         });
      //       } else {
      //         api.toast({
      //           msg: "再按一次退出应用",
      //           duration: 1000,
      //           location: "bottom"
      //         });

      //         window.isExit = true;
      //         setTimeout(function () {
      //           window.isExit = false;
      //         }, 1000);
      //       }
      //     }
      //   );
      // };
    },
  },
  created() {
    let userInfo = util.getLocalStorage("userinfo");
    // if (!userInfo && this.noTransition2.indexOf(this.$route.path) == -1) {
    //   this.$router.replace("/login");
    //   return;
    // }
    this.SETUSERINFO(JSON.parse(userInfo));
  },
  mounted() {
    // window.addEventListener(
    //   {
    //     name: "keyback",
    //   },
    //   (ret, err) => {
    //     this.Toast(11111);
    //     // var currentTime = +new Date();
    //     // api.historyBack(function(ret, err) {
    //     //   if (!ret.status) {
    //     //     if (currentTime - timer > 2000) {
    //     //       timer = currentTime;
    //     //       api.toast({
    //     //         msg: "再按一次返回键退出app",
    //     //         duration: 2000,
    //     //         location: "bottom",
    //     //       });
    //     //     } else {
    //     //       api.closeWidget({
    //     //         id: "A6021186574762", //这里改成自己的应用ID
    //     //         retData: {
    //     //           name: "closeWidget",
    //     //         },
    //     //         silent: true,
    //     //       });
    //     //     }
    //     //   }
    //     // });
    //   }
    // );
  },
  watch: {
    $route(to, next) {
      this.transitionName = this.$router.isBack ? "slide-right" : "slide-left";
      this.$router.isBack = false;
      // console.log(to, from)
      /**防止每次刷新页面时  登录信息有误 */

      //当路由不在首屏的几个页面是隐藏tabbar
      let pathArr = ["/", "/mine", "/income", "/power"];
      this.shwoBar = !(pathArr.indexOf(to.path) === -1);
    },
    //   $route:{
    //   handler(to){
    //     this.transitionName = this.$router.isBack
    //       ? "slide-right"
    //       : "slide-left";
    //     this.$router.isBack = false;
    //     /**防止每次刷新页面时  登录信息有误 */
    //     let userInfo = util.getLocalStorage("access_token");
    //     if (!userInfo && this.noTransition2.indexOf(this.$route.path) == -1) {
    //       this.$router.replace("/login");
    //     }
    //     //当路由不在首屏的几个页面是隐藏tabbar
    //     let pathArr = [
    //       "/",
    //       "/information",
    //       "/sign",
    //       "/translation",
    //       "/user"
    //     ];
    //     if (pathArr.indexOf(to.path) === -1) {
    //       this.shwoBar = false;
    //     } else {
    //       this.shwoBar = true;
    //     }
    //   }
    // }
  },
  components: {
    tabBar,
    // pop
  },
};
</script>

<style lang="less">
@import url("./assets/css/base.less");
#app {
  font-family: 微软雅黑;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 0;
  // font-size: 0.16rem;
  width: 100%;
  height: 100%;
  background: @base-color;
  overflow: hidden;
}
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: @base-color;
  overflow: hidden;
  webkit-user-select: none;
  -webkit-touch-callout: none;
  -moz-user-select: none;

  -ms-user-select: none;

  user-select: none;
}
.view-con {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  overflow: hidden;
}
.child-view {
  width: 100%;
  overflow: hidden;
}
.child-view {
  position: absolute;
  // height: 100%;
  width: 100%;
  /* transition: all 0.25s cubic-bezier(0.55, 0, 0.1, 1); */
  transition: all 0.25s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
}
.van-popup {
  background: transparent !important;
}
/* .van-tabs__nav {
  background: transparent !important;
} */
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0 !important;
}
.base-content {
  padding-top: 46px;
}
.van-toast {
  padding: 20px !important;
  font-size: 28px !important;
}
.van-action-sheet__item,
.van-action-sheet__cancel {
  line-height: 80px;
}
.van-dialog__confirm {
  color: #1678ff !important;
}
.van-icon-arrow {
  color: #d9d9d9 !important;
}
// input {
//   caret-color: #1678ff;
//   // outline-color: red;
// }
// ::selection {
//   color:  #1678ff;
// }
// .van-toast {
//   bottom: 1.3rem !important;
// }
</style>
