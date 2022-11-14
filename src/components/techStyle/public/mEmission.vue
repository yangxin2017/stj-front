<template>
  <div class="panel-out-class">
    <div class="title-class">
      <img src="@/assets/images/ec/cardtitle.png" alt="" />
      <span class="header-title">{{ title }}</span>
    </div>
    <div class="panel-class">
      <div class="label-class">减排量</div>
      <div class="number-class">{{ number }}</div>
      <div class="unit-class">吨</div>
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
  flex-direction: column;
  .title-class {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    .header-title {
      margin-left: 10px;
      font-size: 20px;
      font-weight: 900;
      color: #fff;
    }
  }
}
.panel-class {
  width: 110px;
  height: 157px;
  background-image: url("@/assets/images/ec/de.png");
  background-size: 100% 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  .label-class {
    color: #bfdfff;
    font-size: 20px;
    margin-bottom: 6px;
  }
  .unit-class {
    color: #77c5fe;
    font-size: 10px;
    margin-bottom: 10px;
    font-size: 16px;
  }
  .number-class {
    color: #fff;
    font-family: "AGENCYB";
    font-size: 34px;
  }
}
</style>