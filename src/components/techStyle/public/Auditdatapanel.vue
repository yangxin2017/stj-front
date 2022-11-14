<template>
  <!-- <div class="panel-out-class"> -->
  <div class="panel-class">
    <div class="label-class">{{ title }}</div>
    <div class="number-class">{{ number }}</div>
    <div class="unit-class">吨</div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "标题",
    },
    number: {
      type: String,
      default: "0",
    },
  },
};
</script>

<style lang="scss" scoped>
.panel-out-class {
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}
.panel-class {
  width: 84px;
  height: 120px;
  background-image: url("@/assets/images/ec/computer.png");
  background-size: 100% 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  .label-class {
    color: #bfdfff;
    font-size: 18px;
  }
  .unit-class {
    color: #77c5fe;
    font-size: 16px;
    margin-bottom: 8px;
  }
  .number-class {
    color: #fff;
    font-family: "AGENCYB";
    font-size: 24px;
  }
}
// @media screen and (max-width: 1440px) {
//   .panel-class {
//     // width: 200px;
//     height: 45px;
//     .label-class {
//       font-size: 12px;
//     }
//     .number-class {
//       font-size: 24px;
//       top: 20%;
//     }
//   }
// }
</style>