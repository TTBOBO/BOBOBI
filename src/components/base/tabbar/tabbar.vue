<template>
  <van-tabbar
    safe-area-inset-bottom
    fixed
    v-model="selected"
    ref="tab"
    @change="change"
    active-color="#0861EE"
  >
    <van-tabbar-item v-for="(item, index) of navbar" :id="index" :key="index">
      <img slot="icon" :src="item.active ? item.active_icon : item.icon" />
      <span :class="item.active ? 'active' : ''"> {{ item.title }}</span>
      <!-- style="width:18px;" -->
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      selected: "0",
      navbar: [
        {
          title: "首页",
          name: "/",
          icon: "./static/img/home.png",
          active_icon: "./static/img/home1.png",
          active: true,
        },
        {
          title: "云算力",
          name: "power",
          icon: "./static/img/suanli.png",
          active_icon: "./static/img/suanli1.png",
          active: false,
        },
        {
          title: "收益",
          name: "income",
          icon: "./static/img/income.png",
          active_icon: "./static/img/income1.png",
          active: false,
        },
        {
          title: "我的",
          name: "mine",
          icon: "./static/img/my.png",
          active_icon: "./static/img/my1.png",
          active: false,
        },
      ],
    };
  },
  methods: {
    change() {
      localStorage.setItem("current", "");
    },
  },
  watch: {
    //当前选中值   新值   上一个值
    selected: function(val, oldVal) {
      this.navbar.forEach((item, index) => {
        if (index != val) {
          item.active = false;
        } else {
          item.active = true;
        }
      });
      if (oldVal > val) {
        this.$router.goto(this.navbar[val].name, true);
      } else {
        this.$router.goto(this.navbar[val].name);
      }
    },
    $route(to) {
      //判断路由  是首页的几个路由时  改变tabbar选中状态
      this.navbar.forEach((item, index) => {
        if (to.name == "home" && to.path == "/") {
          this.navbar[0].active = true;
          this.selected = "0";
        } else {
          item.active = false;
        }
        if (to.name == item.name) {
          item.active = true;
          this.selected = index;
        } else {
          item.active = false;
        }
      });
    },
  },
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.mint-tabbar > .mint-tab-item.is-selected {
  background: transparent !important;
  color: #d91b0f !important;
}

.van-tabbar {
  height: 98px !important;
  // border-top: 1px solid #282828;
  color: #cfcfcf;
  // background-image: url("../../../assets/img/flowerbg.png") !important; //@base-color
  // background-position: 80%;
}
.van-tabbar-item__icon {
  margin-bottom: 4px !important;
}
.van-tabbar-item__icon img {
  width: 48px;
  height: 48px;
  height: auto !important;
}
.active {
  color: #0861ee;
}
.van-tabbar-item__text {
  font-size: 20px;
}
</style>
