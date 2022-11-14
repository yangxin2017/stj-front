<template>
  <div class="echarts-class">
    <img src="@/assets/images/ec/ecback.png" alt="" class="ecback" />
    <v-chart
      autoresize
      :option="option"
      style="width: 100%; height: 100%"
      ref="pieEcharts"
    />
  </div>
</template>
 
<script>
import { ctypes } from "@/api/index";
export default {
  data() {
    return {
      option: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      ctypes().then((res) => {
        console.log(res);
        let option = {
          title: [
            {
              text: "总减排量",
              left: "center",
              top: "24%",
              textStyle: {
                color: "#BFDFFF",
                fontSize: "20",
              },
            },
            {
              text: this.$tran(res.data.dt + res.data.gj + res.data.zxc + res.data.bx),
              left: "center",
              top: "36%",
              textStyle: {
                color: "#BFDFFF",
                fontSize: "40",
              },
            },
            {
              text: "吨",
              left: "center",
              top: "54%",
              textStyle: {
                color: "#BFDFFF",
                fontSize: "16",
              },
            },
          ],
          tooltip: {
            trigger: "item",
          },
          legend: {
            top: "15%",
            right: 0,
            itemHeight: 20,
            itemWidth: 20,
            // 图例间距
            itemGap: 20,
            textStyle: {
              color: "#fff",
              fontSize: "18",
            },
            orient: "vertical",
            formatter: (name) => {
              let data = [
                { value: this.$tran(res.data.dt), name: "地铁" },
                { value: this.$tran(res.data.gj), name: "公交" },
                { value: this.$tran(res.data.zxc), name: "自行车" },
                { value: this.$tran(res.data.bx), name: "步行" },
              ];
              // console.log(data, 'data')
              let total = 0;
              let tarValue;
              for (let i = 0; i < data.length; i++) {
                total += Number(data[i].value);
                if (data[i].name == name) {
                  tarValue = data[i].value;
                }
              }
              //计算出百分比
              let p =
                tarValue <= 0
                  ? "0%"
                  : Math.round((tarValue / total) * 100) + "%";
              let j = "      ";
              if (name == "自行车") {
                j = "   ";
              }
              return `${name}${j}${p}`;

              //name是名称，v是数值
            },
          },
          series: [
            {
              type: "pie",
              center: ["50%", "45%"],
              radius: ["60%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center",
              },
              labelLine: {
                show: true,
              },
              data: [
                { value: this.$tran(res.data.dt), name: "地铁" },
                { value: this.$tran(res.data.gj), name: "公交" },
                { value: this.$tran(res.data.zxc), name: "自行车" },
                { value: this.$tran(res.data.bx), name: "步行" },
              ],
            },
          ],
        };

        this.$set(this, "option", option);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts-class {
  width: 100%;
  height: 100%;
  .ecback {
    width: 130px;
    height: 130px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
  }
}
</style>