<template>
  <van-nav-bar
    fixed
    :title="text"
    :left-arrow="left.status"
    @click-left="back"
    @click-right="rightClick"
    :left-text="left.text"
    :right-text="right.text"
    class="nav-bar strong"
  >
    <template slot="left" v-if="left.status">
      <img
        class="back"
        src="../../../assets/img1/fanhui1.png"
        alt=""
        v-if="!left.slot"
      />
      <slot v-else name="left"></slot>
      <!-- <van-button class="btn" plain  @click="back" left-arrow :icon="left.icon">{{
          left.text
        }}</van-button> -->
    </template>
    <template v-if="right.slot" slot="right">
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    left: {
      type: Object,
      default: function() {
        return {
          status: false,
          text: "",
          icon: "back",
        };
      },
    },
    right: {
      type: Object,
      default: function() {
        return {
          status: false,
          text: "",
        };
      },
    },
    icon: String,
    strong: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.back();
      this.$emit("back");
    },
    rightClick() {
      this.$emit("rightClick");
    },
  },
};
</script>
<style lang="less">
@import url("../../../assets/css/base.less");
.nav-bar {
  .van-ellipsis {
    overflow: auto;
  }
}
.strong {
  .van-nav-bar__title {
    font-weight: 700 !important;
  }
}
.van-nav-bar {
  height: 142px;
  // background-color: transparent;

  background: @base-color;
  .van-nav-bar__content {
    height: 88px;
    margin-top: 54px;
  }
  .van-nav-bar__title,
  .van-nav-bar__left,
  .van-nav-bar__right {
    color: #333333;
    font-size: 36px;
    height: 100%;
    line-height: 88px;
    &:active {
      background: transparent;
    }
  }

  .van-nav-bar__text {
    font-size: 36px;
    color: #333333;
    // line-height: 50px;
    // font-size: 0.34rem;
    &:active {
      background: transparent;
    }
  }
  .van-icon {
    color: #fff;
  }
  &::after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    background: #1a1b32;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }
}
.back {
  border: none;
  width: 23px;
  height: 40px;
}
.red {
  /* background:red; */
}
</style>
