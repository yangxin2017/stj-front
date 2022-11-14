<template>
  <div class="echarts-view">
    <div class="left-view box-public">
      <Echartscard title="每日累计注册用户量" height="24%">
        <LineView :lineData="lineData" />
      </Echartscard>
      <Echartscard title="每日活跃用户量" height="24%">
        <LineView :lineData="lineData" />
      </Echartscard>
      <Echartscard title="活动绿色出行量" height="24%">
        <LineView :lineData="lineData2" />
      </Echartscard>
      <Echartscard title="全市绿色出行活动24小时出行量分布图" height="24%">
        <BarView :lineData="lineData3" />
      </Echartscard>
    </div>
    <div class="right-view">
      <div class="right-view-public box-public" v-loading="loadingGD">
        <Echartscard title="高德当月碳减排量占比" height="100%" width="100%">
          <PieView v-if="pieData2.length > 0" :lineData="pieData2" />
        </Echartscard>
      </div>
      <div class="right-view-public box-public" v-loading="loadingBD">
        <Echartscard title="百度当月碳减排量占比" height="100%" width="100%">
          <PieView v-if="pieData1.length > 0" :lineData="pieData1" />
        </Echartscard>
      </div>
    </div>
  </div>
</template>

<script>
import Echartscard from "@/components/techStyle/chart/Echartscard";
import LineView from "./echarts/LineView";
import BarView from "./echarts/BarView";
import BarTotalView from "./echarts/BarTotalView";
import PieView from "./echarts/PieView";
import { getActiveUser, getGreenTrip, getHourGreenTrip } from '@/api/statics'
import { getDataType } from '@/api/query'
export default {
  components: {
    Echartscard,
    LineView,
    BarView,
    BarTotalView,
    PieView,
  },
  data() {
    return {
      lineData: {
        xData: [],
        yData: [],
      },
      lineData2: {
        xData: [],
        yData: [],
      },
      lineData3: {
        xData: [],
        yData: [],
      },
      pieData1: [],
      pieData2: [],
      barData: {
      },

      loadingGD: false,
      loadingBD: false
    };
  },
  mounted() {
    this.init()
    this.init2()
    this.init3()
    this.init4()
    this.init5()
  },
  methods: {
    // 取随机数
    getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    async init() {
      let obj1 = await getActiveUser()
      let xdata = []
      let ydata = []
      for (let d of obj1.data) {
        xdata.push(d.datestr)
        ydata.push(d.num)
      }
      this.lineData.xData = xdata
      this.lineData.yData = [ydata]
    },
    async init2() {
      let obj1 = await getGreenTrip()
      let xdata = []
      let ydata = []
      for (let d of obj1.data) {
        xdata.push(this.__xc(d.tripType))
        ydata.push(d.num)
      }
      this.lineData2.xData = xdata
      this.lineData2.yData = [ydata]
    },
    async init3() {
      let obj1 = await getHourGreenTrip()
      let xdata = []
      let ydata = []
      for (let d of obj1.data) {
        xdata.push(d.hstr)
        ydata.push(d.num)
      }
      this.lineData3.xData = xdata
      this.lineData3.yData = ydata
    },
    async init4() {
      this.loadingBD = true
      let obj = await getDataType({ datasource: '百度' })
      let arr = []
      arr.push({ name: '步行', value: this.$tran(obj.data.ff_bx) })
      arr.push({ name: '地铁', value: this.$tran(obj.data.ff_dt) })
      arr.push({ name: '公交', value: this.$tran(obj.data.ff_gj) })
      arr.push({ name: '自行车', value: this.$tran(obj.data.ff_zxc) })
      this.pieData1 = arr
      this.loadingBD = false
    },
    async init5() {
      this.loadingGD = true
      let obj = await getDataType({ datasource: '高德' })
      let arr = []
      arr.push({ name: '步行', value: this.$tran(obj.data.ff_bx) })
      arr.push({ name: '地铁', value: this.$tran(obj.data.ff_dt) })
      arr.push({ name: '公交', value: this.$tran(obj.data.ff_gj) })
      arr.push({ name: '自行车', value: this.$tran(obj.data.ff_zxc) })
      this.pieData2 = arr
      this.loadingGD = false
    },

    __xc(str) {
      if (str == 'ecycle') {
        return '电动车'
      } else if (str == 'cycle') {
        return '自行车'
      } else if (str == 'walk') {
        return '步行'
      } else if (str == 'GJ') {
        return '公交'
      } else if (str == 'DT') {
        return '地铁'
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.echarts-view {
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .box-public {
    border-radius: 10px;
    // 顶部内发光
    box-shadow: 0px 20px 50px inset rgba($color: #009fff, $alpha: 0.2),
      0px 0px 10px rgba($color: #4dd2ff, $alpha: 0.5);
  }
  .left-view {
    width: 39%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
  }
  .right-view {
    width: 59%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
  }
  .right-view-public {
    width: 100%;
    height: 49%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}
</style>