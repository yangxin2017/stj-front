<template>
  <div class="echarts-class">
    <v-chart
      autoresize :option="option"
      style="width: 100%; height: 100%"
      ref="pieEcharts"
    />
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      option: {
        title: {
          text: "",
          textStyle: {
            color: "#1FD2DA",
            fontSize: "20",
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          left: 'right',
          top: 'bottom',
          itemWidth: 12,
          itemHeight: 8,
          textStyle: {
            color: "#fff",
            fontSize: 8
          },
          orient:'vertical',
        },
        series: [
          {
            type: "pie",
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: true,
            },
            data:  [
                { value: 51, name: '地铁' },
                { value: 22, name: '公交' },
                { value: 15, name: '自行车' },
                { value: 12, name: '步行' },
            ]
          },
        ],
      },
    };
  },
  methods: {},
 };
</script>

<style lang="scss" scoped>
.echarts-class {
  width: 100%;
  height: 100%;
}
</style>