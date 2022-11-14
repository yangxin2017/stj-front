<template>
  <div class="echarts-class">
    <v-chart
      :option="option"
      style="width: 100%; height: 100%"
      ref="pieEcharts"
    />
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: {
    pieData: {
      type: Array,
      default: {},
    },
  },
  data() {
    return {
      option: {
        title: {
          text: "水库规模",
          left: "center",
          top: "34%",
          textStyle: {
            color: "#1FD2DA",
            fontSize: "26",
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          bottom: "5%",
          left: "center",
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            type: "pie",
            center: ["50%", "40%"],
            radius: ["60%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: [],
          },
        ],
      },
    };
  },
  mounted() {
    // 屏幕分辨率发生变化时重绘图表
    window.addEventListener("resize", () => {
      this.$refs.pieEcharts.resize();
    });
    this.option.series[0].data = this.pieData;
  },
  methods: {},
  watch: {
    pieData: {
      handler(val) {
        this.option.series[0].data = val;
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