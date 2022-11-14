<template>
  <div class="recheckdata-class">
    <template v-if="tableBol == -1">
      <el-row class="row-class">
        <el-col :span="24" style="justify-content: flex-start">
          <!-- 申报单位：
          <el-select
            v-model="searchform.datasource"
            placeholder="请选择"
            size="mini"
            class="search-form-class"
          >
          <el-option label="百度" value="百度">
            </el-option>
            <el-option label="高德" value="高德">
            </el-option>
          </el-select> -->
          数据时间：
          <el-date-picker
            v-model="searchform.groupDate"
            type="month"
            placeholder="选择日期时间"
            size="mini"
            value-format="yyyy-MM"
            format="yyyy-MM"
            class="search-form-class"
            clearable
          >
          </el-date-picker>
          <!-- 到达时间：
          <el-date-picker
            v-model="searchform.jssj"
            type="datetime"
            placeholder="选择日期时间"
            size="mini"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            class="search-form-class"
            clearable
          >
          </el-date-picker>
          导入时间：
          <el-date-picker
            v-model="searchform.jssj"
            type="datetime"
            placeholder="选择日期时间"
            size="mini"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            class="search-form-class"
            clearable
          >
          </el-date-picker> -->
          <!-- <el-input
            size="mini"
            class="search-form-class"
            placeholder="请输入查询内容"
          >
          </el-input> -->
          <el-button type="primary" size="mini" @click="handleSearch">查询</el-button>
        </el-col>
      </el-row>

      <div class="table-class">
        <el-table
          :data="recheckData"
          width="100%"
          height="100%"
          stripe
          v-loading="loading"
        >
          <el-table-column label="序号" width="100">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="申报单位" prop="datasource"></el-table-column>
          <el-table-column label="数据时间" prop="groupDate" sortable></el-table-column>
          <el-table-column label="复核状态" prop="status">
            <template slot-scope="scope">
              <span v-if="scope.row.status == '未复核'">{{ scope.row.status }}</span>
              <span v-else-if="scope.row.flow">
                {{ getNodeStr(scope.row.flow) }}
              </span>
              <span
                v-if="scope.row.status == '复核计算中'"
                :class="{ 'flash-txt': scope.row.status == '复核计算中' }"
              >
                {{ scope.row.status }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="复核时间" prop="fhTime">
            <template slot-scope="scope">
              {{ getTimeU(scope.row.fhTime) }}
            </template>
          </el-table-column>
          <el-table-column label="有效数据(条)" prop="yxCount"></el-table-column>
          <el-table-column label="全部数据(条)" prop="totalCount"></el-table-column>
          <el-table-column label="错误数据(条)" prop="errCount">
            <template slot-scope="scope">
              <span class="setclass" @click="errorRow(scope.row)">
                {{ scope.row.errCount }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                v-if="!scope.row.flow || scope.row.flow.curNodeStep == 2"
                @click="recheck(scope.row, scope.index)"
              >
                {{ scope.row.status == "未复核" ? "复核" : "重新复核" }}
              </el-button>
              <el-button
                type="text"
                v-if="scope.row.flow && scope.row.flow.curNodeStep == 2"
                @click="submit(scope.row.flow)"
              >
                提交
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pages">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="handleChangePage"
        >
        </el-pagination>
      </div>
    </template>
    <template v-else>
      <Tablelist :datasource="datasource" :groupDate="groupDate" />
    </template>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="400px">
      <el-row class="demo-autocomplete">
        <el-col :span="24">
          <div class="sub-title" style="margin: 0 0 10px 0">请输入内容：</div>

          <el-input v-model="state1" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleBH">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Tablelist from "./recheck/Tablelist";
import {
  getcheckList,
  getRecheckList,
  setRecheck,
  addFlow,
  nextFlow,
} from "@/api/recheck";
export default {
  components: {
    Tablelist,
  },
  data() {
    return {
      searchform: {
        datasource: "",
        groupDate: "",
        pageIndex: 1,
        pageSize: 10,
      },
      total: 0,
      recheckData: [],

      tableBol: -1,
      fileId: -1,
      datasource: "",
      groupDate: "",
      loading: true,

      dialogVisible: false,
      state1: "",
      flowId: "",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.loading = true;
      let res = await getcheckList(this.searchform);
      this.recheckData = res.data.data;
      this.total = res.data.total;
      this.loading = false;
    },
    handleSearch() {
      this.init();
    },
    handleChangePage(ev) {
      this.searchform.pageIndex = ev;
      this.init();
    },
    async recheck(row, index) {
      // const lod = this.$loading({
      //   lock: true,
      //   text: '正在复核数据，请稍候~',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // })
      this.$message.success("复核正在进行！");
      let recheckres = await setRecheck({
        datasource: row.datasource,
        dstr: row.groupDate,
      });
      lod.close();
      addFlow({ taskId: recheckres.data.id }).then((flowres) => {
        this.init();
      });
    },
    handleBH() {
      nextFlow({
        flowId: this.flowId,
        reason: this.state1,
      }).then(() => {
        this.init();
        this.$message.success("提交成功");
        this.dialogVisible = false;
      });
    },
    submit(row) {
      this.flowId = row.id;
      this.dialogVisible = true;
      this.state1 = "";
    },
    errorRow(row) {
      // this.fileId = row.flow.id;
      this.groupDate = row.groupDate;
      this.datasource = row.datasource;
      this.tableBol = 1;
      // if (row.flow) {
      //   this.groupDate = row.groupDate
      //   this.datasource = row.datasource
      //   this.tableBol = 1
      // } else {
      //   this.$message.error('请先复核数据')
      // }
    },
    getTimeU(time) {
      if (!time) {
        return "--";
      }
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
    getNodeStr(flow) {
      if (flow.curNodeStep == 1) {
        return "已复核，准备提交";
      } else {
        let str = flow.lastCheckResult ? `(信息：${flow.lastCheckResult})` : "";
        return flow.status + str;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.pages {
  text-align: center;
}
.recheckdata-class {
  width: 100%;
  height: 100%;
  .row-class {
    width: 100%;
    height: 50px;
    color: #fff;

    .search-form-class {
      width: 180px;
      margin-right: 20px;
    }
  }

  .table-class {
    width: 100%;
    height: calc(100% - 122px);

    .setclass {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>
