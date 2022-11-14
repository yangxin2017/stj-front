<template>
  <div class="echarts-class">
    <v-chart
      :option="option"
      style="width: 100%; height: 100%"
      ref="lineEcharts"
    />
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: {
    lineData: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: true,
          orient: "vertical",
          bottom: "0",
          right: "10",
          // 文字白色
          textStyle: {
            color: "#fff",
          },
          // 间隔
          itemGap: 20,
        },
        series: [
          {
            name: "数据统计",
            type: "pie",
            radius: "50%",
            center: ["50%", "50%"],
            data: this.lineData,
            label: {
              show: false,
              position: "center",
            },
          },
        ],
      },
    };
  },
  mounted() {
    // 屏幕分辨率发生变化时重绘图表
    window.addEventListener("resize", () => {
      this.$refs.lineEcharts.resize();
    });
  },
  methods: {},
  watch: {
    lineData: {
      handler(val) {
        // console.log(val);
        // this.option.xAxis.data = val.xData;
        // let series = [];
        // for (let i of val.yData) {
        //   series.push({
        //     data: i,
        //     type: "line",
        //     smooth: true,
        //   });
        // }
        // this.option.series = series;
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts-class {
  width: 100%;
  height: 100%;
}
</style>