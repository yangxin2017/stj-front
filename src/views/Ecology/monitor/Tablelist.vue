
<template>
  <div class="monitor-table-list-class">
    <el-button type="text" class="resultbutton" @click="$parent.tableBol = -1">
      返回>>
    </el-button>
    <el-row class="row-class">
      <el-col class="col-class" :span="5">
        导入【{{ errTotal.str }}】数据
        <span class="value-font">{{ errTotal.total }}</span> 条
      </el-col>
      <el-col class="col-class" :span="5">
        有效数据 <span class="value-font">{{ errTotal.yx }}</span> 条
      </el-col>

      <el-col class="col-class" :span="5">
        数值错误数据
        <span class="value-font" style="color: #f00">{{ errTotal.error }}</span>
        条
      </el-col>
      <el-col class="col-class" :span="5">
        数值重复数据
        <span class="value-font" style="color: #00bfff">{{
          errTotal.repeat
        }}</span>
        条
      </el-col>
      <el-col class="col-class" :span="4">
        空数据
        <span class="value-font" style="color: #0f0">{{
          errTotal.null
        }}</span>
        条
      </el-col>
    </el-row>
    
    <div class="checkbox-class" v-if="showCondition">
      <template v-for="(item, key) in tableHeader">
        <el-checkbox
          :key="key + 'checkbox'"
          v-model="item.open"
          :label="item.label"
        ></el-checkbox>
        <div
          style="width: 100%"
          :key="'br' + key"
          v-if="item.label == '行程时间' || item.label == '轨迹详情'"
        ></div>
      </template>
      <i class="close el-icon-close" @click="handleHideCondition"></i>
    </div>

    <div class="search-class">
      出行方式：
      <el-select
        v-model="searchform.tripType"
        placeholder="请选择"
        size="mini"
        class="search-form-class"
        clearable
      ><el-option v-for="item in tripType" :key="item.value" :label="item.label" :value="item.value"></el-option></el-select>
      出发时间：
      <el-date-picker
        v-model="searchform.stime"
        type="datetime"
        placeholder="选择日期时间"
        size="mini"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        class="search-form-class"
        clearable
      >
      </el-date-picker>
      到达时间：
      <el-date-picker
        v-model="searchform.etime"
        type="datetime"
        placeholder="选择日期时间"
        size="mini"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        class="search-form-class"
        clearable
      >
      </el-date-picker>
      <el-button type="primary" size="mini" @click="searchClick">
        查询
      </el-button>
      <el-button type="primary" size="mini" @click="outClick"> 导出 </el-button>
      <el-divider direction="vertical"></el-divider>
      <el-button type="primary" size="mini" @click="handleShowCondition"> 筛选条件 </el-button>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%"
      class="table-class"
      height="calc(100% - 157px)"
      stripe v-loading="loading"
    >
      <el-table-column label="序号" width="70" type="index">
        
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <!-- <div class="button-class-display"> -->
          <!-- <el-button type="text" size="mini" @click="handleClick(scope.row)">
            查看
          </el-button> -->
          <el-button
            type="text"
            size="mini"
            @click="setStatus(scope.row, '删除')"
          >
            删除
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="setStatus(scope.row, '忽略')"
          >
            忽略
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="setStatus(scope.row, '待确认')"
          >
            待确认
          </el-button>
          <!-- </div> -->
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
            <span v-else>
              {{ scope.row[item.prop] }}
            </span>
          </template>
        </el-table-column>
      </template>
    </el-table>

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
import {
  getMonitorErrList,
  getMonitorYxList,
  setMonitorStatus,
  getMonitorErrTotal
} from "@/api/monitor";
import { getTripTypes } from '@/api/public'
export default {
  props: {
    fileId: {
      type: Number,
      default: -1,
    },
    tableHeader: {
      type: Array,
      default: () => [],
    },
    type: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      checkboxform: [],
      tableData: [],
      searchform: {
        fileId: -1,
        tripType: "",
        stime: "",
        etime: "",
        pageIndex: 1,
        pageSize: 12,
      },
      tripType: [],
      errTotal: {
        error: 0,
        null: 0,
        repeat: 0,
        yx: 0,
        total: 0,
        str: ''
      },
      total: 0,
      loading: false,
      showCondition: false
      // errorType: ["REPEAT", "NULL", "ERROR"],
    };
  },
  mounted() {
    this.searchform.fileId = this.fileId
    this.errorinit()
    this.init()
  },
  methods: {
    handleShowCondition() {
      this.showCondition = true
    },
    handleHideCondition() {
      this.showCondition = false
    },
    async init() {
      let obj = await getTripTypes({})
      this.tripType = obj.data

      let objtotal = await getMonitorErrTotal({ fileId: this.fileId })
      this.errTotal = objtotal.data
      let time = objtotal.data.time
      let str = ''
      if (time) {
        let arr = time.split('-')
        if (arr.length > 1) {
          str = `${objtotal.data.datasource}${arr[0]}年${arr[1]}月`
        }
      }
      this.errTotal.str = str
    },
    async errorinit() {
      this.loading = true
      let res = await getMonitorErrList(this.searchform)
      this.tableData = res.data.data
      this.total = res.data.total
      this.loading = false
    },
    errorinitData(tableList) {
      this.tableData = [];
      for (let i in tableList) {
        for (let data of tableList[i]) {
          this.tableData.push(data);
        }
      }
    },
    handleChangePage(ev) {
      this.searchform.pageIndex = ev
      this.errorinit()
    },

    yxinit(callback) {
      getMonitorYxList({
        fileId: this.fileId,
        pageIndex: 1,
        pageSize: 10000,
      }).then((res) => {
        console.log(res);
        this.tableData = res.data.data;
        if (callback) {
          callback();
        }
      });
    },
    searchClick() {
      this.errorinit()
    },
    outClick() {
      let fm = this.searchform
      let url = `/stj/monitor/errexport?`
      for (let k in fm) {
        url += `${k}=${fm[k]}&`
      }
      window.open(url)
    },
    handleClick(row) {
      console.log(row);
    },
    setStatus(row, status) {
      setMonitorStatus({
        dataId: row.id,
        status: status,
      }).then((res) => {
        this.errorinit();
      });
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
      for (let i of this.tableData) {
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
// scss样式
.monitor-table-list-class {
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;

  .row-class {
    font-family: "HY";
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    .col-class {
      font-size: 20px;
      display: flex;
      align-items: center;
      // justify-content: center;
    }
  }
  .checkbox-class {
    width: calc(100% - 20px);
    height: 100px;
    top: 100px;
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

  .search-class {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 18px;
  }

  .search-form-class {
    width: 180px;
    margin-right: 20px;
  }
  .resultbutton {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 50;
    font-size: 24px !important;
  }
}
.button-class-display {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  * {
    margin: 0;
  }
}
.value-font {
  font-family: "AGENCYB";
  font-size: 40px;
  margin: 0 10px;
  // color: #00bfff;
}
</style>
