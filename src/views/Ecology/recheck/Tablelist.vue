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
        <!-- 数值重复数据
        <span class="value-font" style="color: #00bfff">{{
          census.duplicat
        }}</span>
        条 -->
      </el-col>
      <el-col class="col-class" :span="4">
        <!-- 空数据
        <span class="value-font" style="color: #0f0">{{
          census.nonedata
        }}</span>
        条 -->
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
          v-if="
            item.label == '项目碳排放量' ||
            item.label == '结束站牌名称' ||
            item.label == '结束纬度'
          "
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
      <!-- 平均速度：
      <el-input
        v-model="searchform.pjsd"
        placeholder="请输入平均速度"
        size="mini"
        class="search-form-class"
      ></el-input>
      <el-input
        v-model="searchform.gjz"
        placeholder="请输入关键字"
        size="mini"
        class="search-form-class"
      ></el-input> -->
      <el-button type="primary" size="mini" @click="searchClick"> 查询 </el-button>
      <el-button type="primary" size="mini" @click="outClick"> 导出 </el-button>
      <el-divider direction="vertical"></el-divider>
      <el-button type="primary" size="mini" @click="handleShowCondition">
        筛选条件
      </el-button>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%"
      class="table-class"
      height="calc(100% - 137px)"
      stripe
      v-loading="loading"
    >
      <!-- <el-table-column prop="id" label="序号" width="100"> -->
      <el-table-column label="序号" width="100">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="mini" @click="handleClick(scope.row)">
            查看
          </el-button> -->
          <el-button type="text" size="mini" @click="setStatus(scope.row, '删除')">
            删除
          </el-button>
          <el-button type="text" size="mini" @click="setStatus(scope.row, '忽略')">
            忽略
          </el-button>
          <el-button type="text" size="mini" @click="setStatus(scope.row, '待确认')">
            待确认
          </el-button>
        </template>
      </el-table-column>
      <template v-for="(item, index) in tableHeader">
        <el-table-column
          :key="'table-header' + index"
          :prop="item.prop"
          :label="item.label"
          v-if="item.open"
          :width="getWidth(item.prop)"
        >
          <template slot-scope="scope">
            <div class="table-column">
              <span v-if="item.type == 'time'">{{ getTimeU(scope.row[item.prop]) }}</span>
              <span v-else-if="item.type == 'number'">{{
                Number(scope.row[item.prop]).toFixed(2)
              }}</span>
              <span v-else>{{ scope.row[item.prop] }}</span>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div class="pages" style="margin: 15px 0 0 0; text-align: center">
      <el-pagination
        background
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleChangePage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getRecheckErrList, setRecheckStatus, getErrTotal } from "@/api/recheck";
import { getTripTypes } from "@/api/public";
export default {
  props: {
    datasource: {
      type: String,
      default: "",
    },
    groupDate: {
      type: String,
      default: "",
    },
  },
  // 组件内数据
  data() {
    return {
      checkboxform: [],
      searchform: {
        tripType: "",
        stime: "",
        etime: "",
      },
      pageIndex: 1,
      pageSize: 12,
      total: 0,
      errTotal: {
        error: 0,
        yx: 0,
        total: 0,
        str: "",
      },
      tableHeader: [
        { label: "出行方式", prop: "tripType", open: true },
        { label: "起始时间", prop: "stime", open: false, type: "time" },
        { label: "结束时间", prop: "etime", open: false, type: "time" },
        { label: "平均速度(m/s)", prop: "aveSpeed", open: true },
        { label: "最大瞬时速度", prop: "maxSpeed", open: false },
        { label: "出行里程(m)", prop: "tripLength", open: true },
        { label: "行程时间(s)", prop: "tripDuraion", open: true },
        { label: "核验出行里程(m)", prop: "tripCheckLength", open: true, type: "number" },
        { label: "基准碳排放量(g)", prop: "cbaseSend", open: true, type: "number" },
        { label: "项目碳排放量(g)", prop: "cprojectSend", open: true, type: "number" },
        { label: "核证碳减排量(g)", prop: "csend", open: true, type: "number" },
        
        { label: "碳减排量(复核)L", prop: "csendLeft", open: true, type: "number" },
        { label: "碳减排量(复核)R", prop: "csendRight", open: true, type: "number" },

        { label: "起始线路编号", prop: "slineCode", open: false },
        { label: "起始线路方向", prop: "slineDir", open: false },
        { label: "起始站牌编号", prop: "sstationCode", open: false },
        { label: "起始站牌名称", prop: "sstationName", open: false },
        { label: "结束线路编号", prop: "elineCode", open: false },
        { label: "结束线路方向", prop: "elineDir", open: false },
        { label: "结束站牌编号", prop: "estationCode", open: false },
        { label: "结束站牌名称", prop: "estationName", open: false },

        { label: "起始经度", prop: "slng", open: false },
        { label: "起始纬度", prop: "slat", open: false },
        { label: "结束经度", prop: "elng", open: false },
        { label: "结束纬度", prop: "elat", open: false },

        { label: "用户唯一标识", prop: "userCode", open: false },
        { label: "出行唯一识别码", prop: "tripCode", open: false },
        { label: "核验里程唯一识别码", prop: "tripCheckCode", open: false },
        { label: "卡类型", prop: "cardType", open: false },
      ],
      tableData: [],
      tripType: [],
      errorType: ["C_ERROR"],
      loading: false,

      showCondition: false,
    };
  },
  // 实例被挂载后调用
  mounted() {
    this.errorinit();
    this.init();
  },
  // 定义函数
  methods: {
    handleShowCondition() {
      this.showCondition = true;
    },
    handleHideCondition() {
      this.showCondition = false;
    },
    async init() {
      let obj = await getTripTypes({});
      this.tripType = obj.data;

      let objtotal = await getErrTotal({
        datasource: this.datasource,
        groupDate: this.groupDate,
      });
      this.errTotal = objtotal.data;
      let time = objtotal.data.time;
      let str = "";
      if (time) {
        let arr = time.split("-");
        if (arr.length > 1) {
          str = `${objtotal.data.datasource}${arr[0]}年${arr[1]}月`;
        }
      }
      this.errTotal.str = str;
    },
    handleChangePage(ev) {
      this.pageIndex = ev;
      this.errorinit();
    },
    errorinit() {
      // let tableBol = {};
      // for (let i of this.errorType) {
      //   tableBol[i] = false;
      // }
      let tableData = [];
      this.loading = true;
      // for (let i of this.errorType) {
      getRecheckErrList({
        datasource: this.datasource,
        tripType: this.searchform.tripType,
        stime: this.searchform.stime,
        etime: this.searchform.etime,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        groupDate: this.groupDate,
      }).then((res) => {
        tableData = res.data.data;
        this.total = res.data.total;

        this.tableData = tableData;
        console.log(this.tableData);
        this.loading = false;
        // tableData[i] = res.data.data;
        // // tableBol[i] = true;
        // // 如果tableBol所有值均为true
        // if (Object.values(tableBol).every((item) => item)) {
        //   this.errorinitData(tableData);
        // }
      });
      // }
    },
    errorinitData(tableList) {
      for (let i in tableList) {
        for (let data of tableList[i]) {
          this.tableData.push(data);
        }
      }
    },
    searchClick() {
      this.errorinit();
    },
    outClick() {
      let fm = {
        tripType: this.searchform.tripType,
        stime: this.searchform.stime,
        etime: this.searchform.etime,
        groupDate: this.groupDate,
      };
      let url = `/stj/fh/errexport?`;
      for (let k in fm) {
        url += `${k}=${fm[k]}&`;
      }
      console.log(url);
      window.open(url);
    },
    getTimeU(time) {
      if (time == "--") {
        return time;
      }
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
      // let max = 16;
      // for (let i of this.tableData) {
      //   if (i[prop]) {
      //     if (i[prop].length > max) {
      //       max = i[prop].length;
      //     }
      //   } else {
      //     return "200";
      //   }
      // }
      // return max * 12;
      return "";
    },
    setStatus(row, status) {
      setRecheckStatus({
        dataId: row.id,
        status: status,
      }).then((res) => {
        console.log(res);
        this.errorinit();
      });
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
    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      color: #fff;
      cursor: pointer;
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
.value-font {
  font-family: "AGENCYB";
  font-size: 40px;
  margin: 0 10px;
  // color: #00bfff;
}
</style>
