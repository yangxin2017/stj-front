<template>
  <div class="pertitle-class">
    <div class="label-class">{{ label }}</div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "标题",
    },
  },
};
</script>

<style lang="scss" scoped>
.pertitle-class {
  width: 98%;
  margin-left: 1%;
  height: 40px;
  background-image: url("@/assets/images/ec/pertitles.png");
  background-repeat: no-repeat;
  //   background-size: 80% 100%;
  position: relative;

  .label-class {
    position: absolute;
    color: #bfdfff;
    left: 40px;
    top: 6px;
    font-size: 20px;
  }
}
</style>