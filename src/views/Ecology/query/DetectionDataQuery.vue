<template>
  <div class="detectiondataquery-class">
    <el-row class="row-class">
      <el-col :span="24" style="justify-content: flex-start">
        申报单位：
        <el-select
          v-model="searchform.datasource"
          placeholder="请选择"
          size="mini"
          class="search-form-class"
          clearable
        >
        <el-option label="百度" value="百度">
          </el-option>
          <el-option label="高德" value="高德">
          </el-option>
        </el-select>
        出行方式：
        <el-select
          v-model="searchform.tripType"
          placeholder="请选择"
          size="mini"
          class="search-form-class"
          clearable
        >
          <el-option
            v-for="item in tripType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        出发时间：
        <el-date-picker
          v-model="searchform.stime"
          type="date"
          placeholder="选择日期"
          size="mini"
          class="search-form-class"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          clearable
        >
        </el-date-picker>
        到达时间：
        <el-date-picker
          v-model="searchform.etime"
          type="date"
          placeholder="选择日期"
          size="mini"
          class="search-form-class"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          clearable
        >
        </el-date-picker>
        <!-- 平均速度：
        <el-select
          v-model="searchform.aveSpeed"
          placeholder="请选择"
          size="mini"
          class="search-form-class"
        ></el-select>
        <el-input
          size="mini"
          class="search-form-class"
          placeholder="请输入查询内容"
        >
        </el-input> -->
        <el-button type="primary" size="mini" @click="searchClick">
          查询
        </el-button>
        <el-button type="primary" size="mini" @click="handleExport">导出</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="primary" size="mini" @click="handleShowCondition"> 筛选条件 </el-button>
      </el-col>
    </el-row>

    <div class="checkbox-class" v-if="showCondition">
      <template v-for="(item, key) in tableHeader">
        <el-checkbox
          :key="key + 'checkbox'"
          v-model="item.open"
          :label="item.label"
        >
        </el-checkbox>
        <div
          style="width: 100%"
          :key="'br' + key"
          v-if="item.label == '行程时间' || item.label == '轨迹详情'"
        ></div>
      </template>
      <i class="close el-icon-close" @click="handleHideCondition"></i>
    </div>
    <div class="table-class" v-loading="loading">
      <el-table :data="detectionData" width="100%" height="100%" stripe>
        <el-table-column label="序号" width="70">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <template v-for="(item, index) in tableHeader">
          <el-table-column
            :key="'table-header' + index"
            :prop="item.prop"
            :label="item.label"
            v-if="item.open"
          >
            <template slot-scope="scope">
              <span v-if="item.time">
                {{ getTimeU(scope.row[item.prop]) }}
              </span>
              <span v-else-if="item.type == 'number'">
                {{ Number(scope.row[item.prop]).toFixed(2) }}
              </span>
              <span v-else>
                {{ scope.row[item.prop] }}
              </span>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>

    <div class="pages" style="margin: 15px 0 0 0;text-align: center;">
      <el-pagination
        background :page-size="searchform.pageSize"
        layout="prev, pager, next"
        :total="total" @current-change="handleChangePage">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { getTripTypes } from "@/api/public";
import { getMonitorSearch } from "@/api/detection";
export default {
  data() {
    return {
      tripType: [
      ],
      searchform: {
        datasource: "",
        stime: "",
        etime: "",
        tripType: "",
        pageIndex: 1,
        pageSize: 15
      },
      total: 0,
      tableHeader: [
        { label: "申报单位", prop: "dataSource", open: true },
        { label: "出行方式", prop: "tripType", open: true },
        { label: "起始时间", prop: "stime", open: true, time: true },
        { label: "结束时间", prop: "etime", open: true, time: true },

        { label: "平均速度(m/s)", prop: "aveSpeed", open: true, type: 'number' },
        { label: "最大瞬时速度(m/s)", prop: "maxSpeed", open: false, type: 'number' },

        { label: "出行里程(m)", prop: "tripLength", open: true, type: 'number' },
        { label: "行程时间(s)", prop: "tripDuraion", open: true },
        // { label: "起始时间戳", prop: "beginTimestamp", open: true },
        { label: "起始经度", prop: "slng", open: false },
        { label: "起始纬度", prop: "slat", open: false },

        // { label: "结束时间戳", prop: "endTimestamp", open: true },
        { label: "结束经度", prop: "elng", open: false },
        { label: "结束纬度", prop: "elat", open: false },

        { label: "轨迹详情", prop: "trackDetail", open: false },
        { label: "用户唯一标识", prop: "userCode", open: false },
        { label: "出行唯一识别码", prop: "tripCode", open: false },
      ],
      detectionData: [],
      loading: false,
      showCondition: false
    };
  },
  mounted() {
    getTripTypes().then((res) => {
      this.tripType = res.data;
    });
    this.searchClick()
  },
  methods: {
    handleShowCondition() {
      this.showCondition = true
    },
    handleHideCondition() {
      this.showCondition = false
    },
    handleExport() {
      let fm = this.searchform
      let url = `/stj/monitor/yxexport?`
      for (let k in fm) {
        url += `${k}=${fm[k]}&`
      }
      window.open(url)
    },
    handleChangePage(ev) {
      this.searchform.pageIndex = ev
      this.searchClick()
    },
    async searchClick() {
      let form = this.searchform
      this.loading = true
      let res = await getMonitorSearch(form)
      this.detectionData = res.data.data
      this.total = res.data.total
      this.loading = false
    },
    getTimeU(time) {
      if (time) {
        var dayjs = require("dayjs");
        let ntime = dayjs(time).format("YYYY-MM-DD HH:mm:ss");
        return ntime;
      } else {
        return time;
      }
    },
    getWidth(prop) {
      // 获取tableData中prop的文字最多的字数
      let max = 16;
      for (let i of this.detectionData) {
        if (i[prop]) {
          if (i[prop].length > max) {
            max = i[prop].length;
          }
        } else {
          return "200";
        }
      }
      return max * 12;
    },
  },
};
</script>

<style lang="scss" scoped>
.detectiondataquery-class {
  width: 100%;
  height: 100%;
  color: #fff;

  .row-class {
    width: 100%;
    height: 50px;
    display: flex;
    align-content: center;
    // color: #fff;

    .search-form-class {
      width: 180px;
      margin-right: 20px;
    }
  }

  .checkbox-class {
    width: calc(100% - 20px);
    height: 100px;
    top: 55px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    border: solid 1px #00bfff;
    background: #054071;
    padding: 10px;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #fff;
    .close{
      position: absolute;
      top: 10px;right: 10px;
      color: #fff;cursor: pointer;
      font-size: 18px;
    }
  }

  .table-class {
    width: 100%;
    height: calc(100% - 100px);
  }
}
</style>
