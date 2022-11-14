<template>
  <div class="panel-class">
    <img :src="iconpath" class="img-class" />
    <div class="label-class">{{ title }}</div>
    <div class="unit-class">{{ unit }}</div>
    <div class="number-class">{{ number }}</div>
  </div>
</template>

<script>
export default {
  props: {
    iconpath: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "标题",
    },
    unit: {
      type: String,
      default: "单位",
    },
    number: {
      type: String,
      default: "0",
    },
  },
};
</script>

<style lang="scss" scoped>
.panel-class {
  width: 46%;
  height: 54px;
  // background-image: url("@/assets/images/ec/datapanel.png");
  background-image: url("@/assets/images/ec/panel.png");
  background-size: 100% 100%;
  position: relative;

  .label-class {
    position: absolute;
    color: #bfdfff;
    left: 23%;
    top: 6%;
    font-size: 20px;
  }

  .unit-class {
    position: absolute;
    color: #77c5fe;
    left: 23%;
    bottom: 10%;
    font-size: 16px;
  }

  .number-class {
    position: absolute;
    right: 4%;
    top: 10%;
    color: #fff;
    font-family: "AGENCYB";
    font-size: 34px;
  }

  .img-class {
    width: 25%;
    // height: 100%;
    margin-top: 14px;
  }
}

@media screen and (max-width: 1440px) {
  .panel-class {
    // width: 200px;
    height: 45px;

    .label-class {
      font-size: 12px;
    }

    .number-class {
      font-size: 24px;
      top: 20%;
    }
  }
}
</style>