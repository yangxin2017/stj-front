<template>
  <div class="accumulation-class">
    <div class="label-class">{{ label }}</div>
    <div class="num-class">{{ num }}</div>
    <div class="unit-class">吨</div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "标题",
    },
    num: {
      type: String,
      default: "0",
    },
  },
};
</script>

<style lang="scss" scoped>
.accumulation-class {
  width: 55%;
  height: 55%;
  background-image: url("@/assets/images/ec/acc.png");
  background-size: 90% 90%;
  background-repeat: no-repeat;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  .label-class {
    position: absolute;
    color: #bfdfff;
    left: 37%;
    transform: 0% 50%;
    top: 9%;
    font-size: 18px;
  }

  .unit-class {
    position: absolute;
    color: #bfdfff;
    right: 25%;
    top: 50%;
    // bottom: 10%;
    font-size: 16px;
  }

  .num-class {
    color: #fff;
    font-family: "AGENCYB";
    font-size: 40px;
  }
}
</style>