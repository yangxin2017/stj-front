<template>
  <div :style="{ width: width, height: height }" class="echartscard">
    <div class="title-class">
      <img src="@/assets/images/ec/cardtitle.png" alt="" />
      <span class="title">
        {{ title }}
      </span>
    </div>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "标题",
    },
    height: {
      type: String,
      default: "100%",
    },
    width: {
      type: String,
      default: "98%",
    },
  },
};
</script>

<style lang="scss" scoped>
.echartscard {
  .title-class {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .title {
      margin-left: 10px;
      color: #fff;
      font-size: 20px;
      font-weight: 900;
      text-shadow: 0px 0px 10px rgba($color: #4dd2ff, $alpha: 0.5);
    }
  }
  .card-body {
    width: 100%;
    height: calc(100% - 40px);
    padding: 0;
  }
}
</style>