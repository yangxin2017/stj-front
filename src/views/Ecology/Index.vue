<template>
  <div class="index-class">
    <div class="left-card">
      <Card height="24%" title="累计量">
        <div class="cumulative-class">
          <Datapanel
            v-for="(item, index) in dischargeList"
            :key="'discharge_' + index"
            :iconpath="item.iconpath"
            :title="item.title"
            :unit="item.unit"
            :number="String(item.number)"
          />
        </div>
      </Card>
      <Card height="34%" title="月度CO2减排量" style="margin-top: 5%">
        <div class="cumulative-class-s">
          <mEmissionVue
            v-for="(item, index) in mEList"
            :key="'discharge_' + index"
            :title="item.title"
            :number="String(item.number)"
          />
        </div>
      </Card>
      <Card
        height="30%"
        :title="titleCurMonth"
        style="margin-top: 5%"
      >
        <div class="porportion-class">
          <EPorportion />
        </div>
      </Card>
    </div>

    <div class="right-card">
      <Card height="34%" :title="titleCurGD">
        <div class="cumulative-class">
          <Datapanel
            v-for="(item, index) in gaodeexamineList"
            :key="'discharge' + index"
            :iconpath="item.iconpath"
            :title="item.title"
            :unit="item.unit"
            :number="String(item.number)"
          />
        </div>
      </Card>
      <Card height="34%" :title="titleCurBD" style="margin-top: 5%">
        <div class="cumulative-class">
          <Datapanel
            v-for="(item, index) in baiduexamineList"
            :key="'discharge' + index"
            :iconpath="item.iconpath"
            :title="item.title"
            :unit="item.unit"
            :number="String(item.number)"
          />
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
// 组件引入
import Card from "@/components/techStyle/public/Card.vue";
import Datapanel from "@/components/techStyle/public/Datapanel.vue";
import mEmissionVue from "@/components/techStyle/public/mEmission.vue";
import EPorportion from "@/components/techStyle/chart/ePorportion.vue";

import { total, month, typedatas } from "@/api/index";
export default {
  components: {
    Card,
    Datapanel,
    mEmissionVue,
    EPorportion,
  },
  // 组件内数据
  data() {
    return {
      titleCurMonth: '不同出行模式CO2减排占比',
      titleCurGD: '高德申报',
      titleCurBD: '百度申报',
      // 各数据
      dischargeList: [
        {
          iconpath: require("@/assets/images/首页图标/累计用户.png"),
          title: "累计用户",
          unit: "万人",
          number: "0",
        },
        {
          iconpath: require("@/assets/images/首页图标/累计出行量.png"),
          title: "累计出行量",
          unit: "万人次",
          number: "0",
        },
        {
          iconpath: require("@/assets/images/首页图标/累计减排量.png"),
          title: "累计减排量",
          unit: "吨",
          number: "0",
        },
        {
          title: "累计交易额",
          iconpath: require("@/assets/images/首页图标/累计交易额.png"),
          unit: "元",
          number: "0",
        },
      ],
      mEList: [
        {
          title: "--",
          number: "0",
        },
        {
          title: "--",
          number: "0",
        },
        {
          title: "--",
          number: "0",
        },
      ],
      gaodeexamineList: [
        {
          iconpath: require("@/assets/images/首页图标/高德报送.png"),
          title: "申报",
          unit: "万条",
          number: "0",
        },
        {
          iconpath: require("@/assets/images/首页图标/有效减排量.png"),
          title: "申报减排量",
          unit: "吨",
          number: "0",
        },
        {
          iconpath: require("@/assets/images/首页图标/交研院审核.png"),
          title: "复核(无效)",
          unit: "万条",
          number: "0",
        },
        {
          iconpath: require("@/assets/images/首页图标/无效减排量.png"),
          title: "无效减排量",
          unit: "吨",
          number: "0",
        },
        {
          iconpath: require("@/assets/images/首页图标/复核.png"),
          title: "复核(有效)",
          unit: "万条",
          number: "0",
        },
        {
          iconpath: require("@/assets/images/首页图标/发放量.png"),
          title: "发放减排量",
          unit: "吨",
          number: "0",
        },
      ],
      baiduexamineList: [
        {
          iconpath: require("@/assets/images/首页图标/百度报送.png"),
          title: "申报",
          unit: "万条",
          number: "0",
        },
        {
          iconpath: require("@/assets/images/首页图标/有效减排量.png"),

          title: "申报减排量",
          unit: "吨",
          number: "0",
        },
        {
          iconpath: require("@/assets/images/首页图标/交研院审核.png"),
          title: "核证",
          unit: "万条",
          number: "0",
        },
        {
          iconpath: require("@/assets/images/首页图标/无效减排量.png"),

          title: "无效减排量",
          unit: "吨",
          number: "0",
        },
        {
          iconpath: require("@/assets/images/首页图标/复核.png"),
          title: "复核",
          unit: "万条",
          number: "0",
        },
        {
          iconpath: require("@/assets/images/首页图标/发放量.png"),

          title: "发放减排量",
          unit: "吨",
          number: "0",
        },
      ],
    };
  },
  // 实例被挂载后调用
  mounted() {
    this.init();
  },
  // 定义函数
  methods: {
    init() {
      total().then((res) => {
        this.$set(this.dischargeList[0], "number", (res.data.userCount / 10000).toFixed(2));
        this.$set(this.dischargeList[1], "number", (res.data.tripCount / 10000).toFixed(2));
        this.$set(
          this.dischargeList[2],
          "number",
          (res.data.cNum / 1000 / 1000).toFixed(2)
        );
        this.$set(this.dischargeList[3], "number", res.data.money);
      });

      month().then((res) => {
        this.$set(this.mEList[0], "number", this.$tran(res.data.curMonth));
        this.$set(this.mEList[1], "number", this.$tran(res.data.lastMonth));
        this.$set(this.mEList[2], "number", this.$tran(res.data.lastYearMonth));

        this.mEList[0].title = res.data.cur_str
        this.mEList[1].title = res.data.last_str
        this.mEList[2].title = res.data.ly_str

        this.titleCurMonth = res.data.cur_str + this.titleCurMonth
      });

      typedatas({ datasource: "百度" }).then((res) => {
        console.log(res);
        this.$set(this.baiduexamineList[0], "number", (res.data.bs / 10000).toFixed(1));
        this.$set(this.baiduexamineList[2], "number", (res.data.dsf / 10000).toFixed(1));
        this.$set(this.baiduexamineList[4], "number", (res.data.fh / 10000).toFixed(1))

        this.$set(this.baiduexamineList[1], "number", this.$tran(res.data.yxNum))
        this.$set(this.baiduexamineList[3], "number", this.$tran(res.data.errNum));
        this.$set(this.baiduexamineList[5], "number", this.$tran(res.data.ff))
        this.titleCurBD = res.data.monthstr + this.titleCurBD
      });
      typedatas({ datasource: "高德" }).then((res) => {
        console.log(res);
        this.$set(this.gaodeexamineList[0], "number", (res.data.bs / 10000).toFixed(1))
        this.$set(this.gaodeexamineList[2], "number", (res.data.dsf / 10000).toFixed(1));
        this.$set(this.gaodeexamineList[4], "number", (res.data.fh / 10000).toFixed(1))

        this.$set(this.gaodeexamineList[1], "number", this.$tran(res.data.yxNum))
        this.$set(this.gaodeexamineList[3], "number", this.$tran(res.data.errNum));
        this.$set(this.gaodeexamineList[5], "number", this.$tran(res.data.ff))
        this.titleCurGD = res.data.monthstr + this.titleCurGD
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// scss样式
.index-class {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/images/ec/back.jpg");
  background-size: 100% 100%;
  .left-card {
    position: absolute;
    left: 0;
    top: 0;
    width: 30%;
    height: 100%;
  }
  .right-card {
    position: absolute;
    right: 0;
    top: 0;
    width: 30%;
    height: 100%;
  }
  .cumulative-class {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
  }
  .cumulative-class-s {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    height: 100%;
    width: 100%;
  }
  .porportion-class {
    justify-content: space-around;
    position: absolute;
    height: 90%;
    width: 90%;
  }
}
</style>