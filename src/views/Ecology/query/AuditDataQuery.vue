<template>
  <div class="audit-class">
    <div class="top-card">
      <Card height="100%" width="32%" title="累计">
        <div class="acc-class">
          <Accumulation
            v-for="(item, index) in accumulation"
            :key="'discharge_' + index"
            :label="item.label"
            :num="item.num"
          />
        </div>
      </Card>

      <Card height="100%" width="32%" title="高德" v-loading="loadingGD">
        <Pertitle label="申报量"></Pertitle>
        <div class="cumulative-class">
          <Auditdatapanel
            v-for="(item, index) in baidu.declare"
            :key="'discharge' + index"
            :title="item.title"
            :number="item.num"
          />
        </div>
        <Pertitle label="发放量"></Pertitle>
        <div class="cumulative-class">
          <Auditdatapanel
            v-for="(item, index) in baidu.distribute"
            :key="'discharge' + index"
            :title="item.title"
            :number="item.num"
          />
        </div>
      </Card>

      <Card height="100%" width="32%" title="百度" v-loading="loadingBD">
        <Pertitle label="申报量"></Pertitle>
        <div class="cumulative-class">
          <Auditdatapanel
            v-for="(item, index) in gaode.declare"
            :key="'discharge' + index"
            :title="item.title"
            :number="item.num"
          />
        </div>
        <Pertitle label="发放量"></Pertitle>
        <div class="cumulative-class">
          <Auditdatapanel
            v-for="(item, index) in gaode.distribute"
            :key="'discharge' + index"
            :title="item.title"
            :number="item.num"
          />
        </div>
      </Card>
    </div>
    <el-row class="row-class">
      <el-col :span="24" style="justify-content: flex-start">
        申报单位：
        <el-select
          v-model="searchform.datasource"
          placeholder="请选择"
          size="mini"
          class="search-form-class"
        >
          <el-option
            v-for="item in ['高德', '百度']"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
        开始时间：
        <el-date-picker
          v-model="searchform.stime"
          type="month"
          placeholder="选择日期时间"
          size="mini"
          class="search-form-class"
          value-format="yyyy-MM"
          format="yyyy-MM" clearable
        >
        </el-date-picker>
        结束时间：
        <el-date-picker
          v-model="searchform.etime"
          type="month"
          placeholder="选择日期时间"
          size="mini"
          class="search-form-class"
          value-format="yyyy-MM"
          format="yyyy-MM" clearable
        >
        </el-date-picker>
        出行方式：
        <el-select
          v-model="searchform.triptype"
          placeholder="请选择"
          size="mini"
          class="search-form-class"
        >
          <el-option
            v-for="item in [
              { label: '步行', value: 'walk' },
              { label: '公交', value: 'GJ' },
              { label: '骑行', value: 'cycle' },
              { label: '地铁', value: 'DT' },
            ]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary" size="mini" @click="searchClick">
          查询
        </el-button>
        <!-- <el-button type="primary" size="mini">导出</el-button> -->
      </el-col>
    </el-row>
    <div class="bottom-card" v-loading="loading">
      <Card height="100%" title="查询结果">
        <div class="search-res">
          <div v-for="item in searchValue" :key="item.label">
            {{ item.label }}
            <span class="search-value"> {{ item.number }}</span>
            {{ item.unit }}
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from "@/components/techStyle/public/Card.vue";
import Accumulation from "@/components/techStyle/public/Accumulation.vue";
import Pertitle from "@/components/techStyle/public/Pertitle.vue";
import Auditdatapanel from "@/components/techStyle/public/Auditdatapanel.vue";

import { getTotal, getDataType, getSearch } from "@/api/query";
export default {
  components: {
    Card,
    Accumulation,
    Pertitle,
    Auditdatapanel,
  },
  data() {
    return {
      searchform: {},
      accumulation: [
        {
          label: "申报量",
          num: "",
        },
        {
          label: "发放量",
          num: "",
        },
      ],
      baidu: {
        declare: [
          {
            title: "总计",
            num: "0",
          },
          {
            title: "步行",
            num: "0",
          },
          {
            title: "骑行",
            num: "0",
          },
          {
            title: "公交",
            num: "0",
          },
          {
            title: "地铁",
            num: "0",
          },
        ],
        distribute: [
          {
            title: "总计",
            num: "0",
          },
          {
            title: "步行",
            num: "0",
          },
          {
            title: "骑行",
            num: "0",
          },
          {
            title: "公交",
            num: "0",
          },
          {
            title: "地铁",
            num: "0",
          },
        ],
      },
      gaode: {
        declare: [
          {
            title: "总计",
            num: "0",
          },
          {
            title: "步行",
            num: "0",
          },
          {
            title: "骑行",
            num: "0",
          },
          {
            title: "公交",
            num: "0",
          },
          {
            title: "地铁",
            num: "0",
          },
        ],
        distribute: [
          {
            title: "总计",
            num: "0",
          },
          {
            title: "步行",
            num: "0",
          },
          {
            title: "骑行",
            num: "0",
          },
          {
            title: "公交",
            num: "0",
          },
          {
            title: "地铁",
            num: "0",
          },
        ],
      },

      searchValue: [
        {
          label: "申报量",
          number: "0",
          unit: "吨",
        },
        {
          label: "发放量",
          number: "0",
          unit: "吨",
        },
      ],
      loading: false,

      loadingGD: false,
      loadingBD: false
    };
  },
  mounted() {
    this.init()
    this.searchClick()
  },
  methods: {
    init() {
      getTotal().then((res) => {
        this.$set(this.accumulation[0], "num", String(this.$tran(res.data.sb)));
        this.$set(this.accumulation[1], "num", String(this.$tran(res.data.ff)));
      });

      this.loadingGD = true
      this.loadingBD = true
      getDataType({ datasource: "高德" }).then((res) => {
        this.$set(
          this.baidu.declare[0],
          "num",
          String(
            this.$tran(res.data.sb_bx +
            res.data.sb_zxc +
            res.data.sb_gj +
            res.data.sb_dt)
          )
        );
        this.$set(
          this.baidu.declare[1],
          "num",
          String(this.$tran(res.data.sb_bx))
        );
        this.$set(
          this.baidu.declare[2],
          "num",
          String(this.$tran(res.data.sb_zxc))
        );
        this.$set(
          this.baidu.declare[3],
          "num",
          String(this.$tran(res.data.sb_gj))
        );
        this.$set(
          this.baidu.declare[4],
          "num",
          String(this.$tran(res.data.sb_dt))
        );

        this.$set(
          this.baidu.distribute[0],
          "num",
          String(
            this.$tran(
              res.data.ff_bx +
              res.data.ff_zxc +
              res.data.ff_gj +
              res.data.ff_dt)
          )
        );
        this.$set(
          this.baidu.distribute[1],
          "num",
          String(this.$tran(res.data.ff_bx))
        );
        this.$set(
          this.baidu.distribute[2],
          "num",
          String(this.$tran(res.data.ff_zxc))
        );
        this.$set(
          this.baidu.distribute[3],
          "num",
          String(this.$tran(res.data.ff_gj))
        );
        this.$set(
          this.baidu.distribute[4],
          "num",
          String(this.$tran(res.data.ff_dt))
        );
        this.loadingGD = false
      });

      getDataType({ datasource: "百度" }).then((res) => {
        this.$set(
          this.gaode.declare[0],
          "num",
          String(
            this.$tran(
              res.data.sb_bx +
              res.data.sb_zxc +
              res.data.sb_gj +
              res.data.sb_dt)
          )
        );
        this.$set(
          this.gaode.declare[1],
          "num",
          String(this.$tran(res.data.sb_bx))
        );
        this.$set(
          this.gaode.declare[2],
          "num",
          String(this.$tran(res.data.sb_zxc))
        );
        this.$set(
          this.gaode.declare[3],
          "num",
          String(this.$tran(res.data.sb_gj))
        );
        this.$set(
          this.gaode.declare[4],
          "num",
          String(this.$tran(res.data.sb_dt))
        );

        this.$set(
          this.gaode.distribute[0],
          "num",
          String(
           this.$tran(
              res.data.ff_bx +
              res.data.ff_zxc +
              res.data.ff_gj +
              res.data.ff_dt)
          )
        );
        this.$set(
          this.gaode.distribute[1],
          "num",
          String(this.$tran(res.data.ff_bx))
        );
        this.$set(
          this.gaode.distribute[2],
          "num",
          String(this.$tran(res.data.ff_zxc))
        );
        this.$set(
          this.gaode.distribute[3],
          "num",
          String(this.$tran(res.data.ff_gj))
        );
        this.$set(
          this.gaode.distribute[4],
          "num",
          String(this.$tran(res.data.ff_dt))
        );
        this.loadingBD = false
      });
    },

    searchClick() {
      this.loading = true
      getSearch(this.searchform).then((res) => {
        this.loading = false
        this.$set(this.searchValue[0], "number", this.$tran(res.data.sb))
        this.$set(this.searchValue[1], "number", this.$tran(res.data.ff))
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// scss样式
.audit-class {
  width: 100%;
  height: 100%;

  .top-card {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .middle-card {
    position: absolute;
    left: 28%;
    top: 0;
    width: 35%;
    height: 800px;
  }

  .right-card {
    position: absolute;
    right: 0;
    top: 0;
    width: 35%;
    height: 800px;
  }

  .acc-class {
    position: absolute;
    left: 27%;
    top: 20%;
    height: 60%;
    width: 90%;
  }

  .cumulative-class {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    height: 40%;
    width: 100%;
  }

  .row-class {
    width: 100%;
    height: 50px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

    .search-form-class {
      width: 150px;
      margin-right: 20px;
    }
  }

  .bottom-card {
    width: 100%;
    height: calc(50% - 70px);
    .search-res {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      font-size: 30px;
      color: #fff;
      .search-value {
        font-size: 40px;
        font-family: "HY";
      }
    }
  }
}
</style>