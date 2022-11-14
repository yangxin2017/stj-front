<template>
  <div class="card-class" :style="{ height: height, width: width }">
    <div class="header-title">
      <span class="text-class"> {{ title }}</span>
    </div>
    <div class="slot-class">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: "50%",
    },
    title: {
      type: String,
      default: "标题",
    },
    width: {
      type: String,
      default: "100%",
    },
  },
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.card-class {
  overflow: hidden;
  position: relative;
  width: 100%;
  background-color: rgba($color: #000000, $alpha: 0.5);
  border-radius: 10px;
  // 顶部内发光
  box-shadow: 0px 20px 50px inset rgba($color: #009fff, $alpha: 0.2),
    0px 0px 10px rgba($color: #4dd2ff, $alpha: 0.5);
  .header-title {
    width: 100%;
    height: 60px;
    background-image: url("@/assets/images/public/cardtitle.png");
    background-repeat: no-repeat;
    background-position: center bottom;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-family: "HY";
    position: relative;
    // 顶部边框颜色渐变
    // border-top: 2px solid #fff;
    // border-image: linear-gradient(
    //     to right,
    //     rgba($color: #009fff, $alpha: 0),
    //     rgba($color: #009fff, $alpha: 0),
    //     rgba($color: #009fff, $alpha: 1),
    //     #98fafe,
    //     rgba($color: #009fff, $alpha: 1),
    //     rgba($color: #009fff, $alpha: 0),
    //     rgba($color: #009fff, $alpha: 0)
    //   )
    //   30 30;

    .text-class {
      background-image: -webkit-linear-gradient(top, #fff, #d5f7fd, #d5f7fd);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
  }
  .header-title::before {
    content: "";
    position: absolute;
    width: 105%;
    height: 41px;
    background-image: url("@/assets/images/public/cardtop.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    left: -2.5%;
    top: -20px;
  }
  .slot-class {
    width: 100%;
    height: calc(100% - 62px);
  }
  //   分辨率小于等于1920时
  @media screen and (max-width: 1920px) {
    .header-title {
      font-size: 16px;
      height: 36px;
      background-size: 70% auto;
    }
    .slot-class {
      height: calc(100% - 38px);
    }
    .text-class {
      font-size: 24px;
    }
  }
}
</style>