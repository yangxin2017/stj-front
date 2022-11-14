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
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      option: {
        grid: {
          top: "10",
          left: "10",
          right: "10",
          bottom: "10",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [],
          // 设置刻度标签
          axisLabel: {
            show: true,
            color: "#fff",
          },
        },
        yAxis: {
          type: "value",
          // 设置刻度标签
          axisLabel: {
            show: true,
            color: "#fff",
          },
          // 设置图内斑马线
          splitLine: {
            show: false,
          },
          // 设置图内间隔颜色
          splitArea: {
            show: true,
            areaStyle: {
              color: ["rgba(255,255,255,0.08)", "rgba(255,255,255,0)"],
            },
          },
        },
        series: [],
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
        console.log(val);
        this.option.xAxis.data = val.xData;
        let series = [];
        for (let i of val.yData) {
          series.push({
            data: i,
            type: "line",
            smooth: true,
          });
        }
        this.option.series = series;
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