
<template>
  <div class="monitor-class">
    <template v-if="tableBol == -1">
      <el-row class="row-class">
        <el-col :span="5" style="justify-content: flex-start">
          申报单位：
          <el-select
            v-model="searchform.datasource"
            placeholder="请选择" @change="handleChange"
            size="mini"
            class="search-form-class"
          ><el-option label="全部" value="">
            </el-option>
            <el-option label="百度" value="百度">
            </el-option>
            <el-option label="高德" value="高德">
            </el-option></el-select>
          <!-- 出发时间：
          <el-date-picker
            v-model="searchform.cfsj"
            type="date"
            placeholder="选择日期时间"
            size="mini"
            class="search-form-class"
          >
          </el-date-picker>
          到达时间：
          <el-date-picker
            v-model="searchform.ddsj"
            type="date"
            placeholder="选择日期时间"
            size="mini"
            class="search-form-class"
          >
          </el-date-picker> -->
          <!-- 导入时间：
          <el-date-picker
            v-model="searchform.drsj"
            type="datetime"
            placeholder="选择日期时间"
            size="mini"
            class="search-form-class"
          >
          </el-date-picker>
          <el-input
            v-model="searchform.name"
            size="mini"
            class="search-form-class"
            placeholder="请输入查询内容"
          ></el-input> -->

          <!-- <el-button type="primary" size="mini">查询</el-button> -->
        </el-col>
        <el-col :span="2" style="justify-content: flex-start">
          <el-button type="primary" size="mini" @click="handleShowDialog">导入监测数据</el-button>
        </el-col>
      </el-row>
      <div class="table-class" v-loading="loading">
        <el-table :data="tableData" style="width: 100%" height="100%" stripe>
          <el-table-column
            label="序号"
            type="index"
            width="70"
          ></el-table-column>
          <el-table-column label="申报单位" prop="datasource" width="90"></el-table-column>
          <el-table-column label="数据时间" prop="datatime" sortable>
            <template slot-scope="scope">
              {{ getTimeU(scope.row.datatime, 'YYYY-MM-DD') }}
            </template>
          </el-table-column>
          <el-table-column label="全部数据(条)" prop="totalCount">
            <template slot-scope="scope">
              <!-- <span @click="totalrow(scope.row, scope.index)" class="setclass"> -->
              {{ scope.row.totalCount }}
              <!-- </span> -->
            </template>
          </el-table-column>
          <el-table-column label="有效数据(条)" prop="yxCount">
            <template slot-scope="scope">
              <!-- <span @click="yxrow(scope.row, scope.index)" class="setclass"> -->
              {{ scope.row.yxCount }}<small>(<span v-if="scope.row.yxCount && scope.row.totalCount">
                {{ (scope.row.yxCount * 100 / scope.row.totalCount).toFixed(1) }} %
              </span>
              <span v-else>
                0%
              </span>)</small>
              <!-- </span> -->
            </template>
          </el-table-column>
          <el-table-column label="错误数据(条)" prop="errCount">
            <template slot-scope="scope">
              <span @click="errorrow(scope.row, scope.index)" class="setclass">
                {{ scope.row.errCount }}<small>(<span v-if="scope.row.errCount && scope.row.totalCount">
                {{ (scope.row.errCount * 100 / scope.row.totalCount).toFixed(1) }} %
              </span>
              <span v-else>
                0%
              </span>)</small>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="导入时间" prop="time" width="200px">
            <template slot-scope="scope">
              {{ getTimeU(scope.row.time, 'YYYY-MM-DD') }}
            </template>
          </el-table-column>
          <!-- <el-table-column label="导入用户" prop="user"></el-table-column> -->
          <el-table-column
            label="导入文件名称"
            prop="filename" width="250px"
          ></el-table-column>
          <el-table-column
            label="数据状态"
            prop="dataStatus"
          >
            <template slot-scope="scope">
              <span :class="{'flash-txt': scope.row.dataStatus == '数据存入中' }">
              {{ scope.row.dataStatus }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pages" style="margin: 15px 0 0 0;text-align: center;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total" @current-change="handleChangePage">
        </el-pagination>
      </div>
    </template>

    <el-dialog title="上传文件" :visible.sync="dialog.visible" width="500px" :before-close="handleClose">
      <el-row :gutter="20">
        <el-col :span="6">选择单位</el-col>
        <el-col :span="6">
          <el-select v-model="dialog.datasource" placeholder="请选择" size="mini">
            <el-option label="百度" value="百度">
            </el-option>
            <el-option label="高德" value="高德">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="6">选择文件</el-col>
        <el-col :span="18">
          <el-upload
            class="upload-demo"
            drag multiple ref="refCheckUpload"
            :show-file-list="true"
            :on-success="handleSuccess" :auto-upload="false"
            :action="`/stj/filemanager/upload?bid=1&datasource=${dialog.datasource}`">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <!-- <el-upload
            :action="`/stj/filemanager/upload?bid=1&datasource=${dialog.datasource}`"
            multiple ref="refCheckUpload"
            :show-file-list="true"
            :on-success="handleSuccess" :auto-upload="false"
          >
            <el-button type="primary" size="mini">选择监测数据文件</el-button>
          </el-upload> -->
        </el-col>
      </el-row>
      <div style="margin-top: 15px;text-align: right;">
        <el-button type="primary" size="mini" v-loading="loadingSC" @click="handleUpload">上传</el-button>
      </div>
    </el-dialog>

    <Tablelist
      :fileId="fileId"
      :tableHeader="tableHeader"
      :type="tableBol"
      v-if="tableBol != -1"
    />
  </div>
</template>

<script>
import Tablelist from "./monitor/Tablelist";
import { getMonitorList } from "@/api/monitor";
export default {
  components: {
    Tablelist,
  },
  data() {
    return {
      tableBol: -1,
      tableData: [],
      fileId: -1,
      tableHeader: [],

      uploadLoading: null,
      searchform: {
        datasource: '',
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      loading: false,

      dialog: {
        visible: false,
        datasource: '百度',
        loading: null
      },

      loadingSC: false,

      uploadingData: false
      
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    handleChange() {
      this.init()
    },
    handleClose() {
      this.dialog.visible = false
      if (this.uploadingData) {
        this.init()
      }
    },
    handleShowDialog() {
      this.uploadingData = false
      this.dialog.visible = true
    },
    handleUpload() {
      this.loadingSC = true
      this.uploadingData = true
      this.$refs.refCheckUpload.submit()
    },
    handleSuccess() {
      // if (this.uploadLoading) {
      //   this.uploadLoading.close()
      // }
      this.loadingSC = false
      this.$message.success('上传完成！')
      // this.init()
    },
    handleChangePage(ev) {
      this.searchform.pageIndex = ev
      this.init()
    },
    async init() {
      this.loading = true
      let res = await getMonitorList(this.searchform)
      if (res.data) {
        this.tableData = res.data.data
        this.total = res.data.total
      }
      this.loading = false
    },
    errorrow(row, index) {
      this.fileId = row.fileId;
      this.tableHeader = [
        { label: "处理状态", prop: "dataStatus", open: true },
        { label: "出行方式", prop: "tripType", open: true },
        { label: "起始时间", prop: "stime", open: true, time: true },
        { label: "结束时间", prop: "etime", open: true, time: true },
        { label: "平均速度", prop: "aveSpeed", open: true },
        { label: "最大瞬时速度", prop: "maxSpeed", open: false },
        { label: "出行里程", prop: "tripLength", open: true },
        { label: "行程时间", prop: "xctime", open: true, time: true },
        { label: "起始时间戳", prop: "qssjst", open: false },
        { label: "起始经度", prop: "slat", open: false },
        { label: "起始纬度", prop: "slng", open: false },
        { label: "结束时间戳", prop: "jssjst", open: false },
        { label: "结束经度", prop: "elat", open: false },
        { label: "结束纬度", prop: "elng", open: false },
        { label: "轨迹详情", prop: "tripDetailId", open: false },
        { label: "用户唯一标识", prop: "userCode", open: false },
        { label: "出行唯一识别码", prop: "tripCode", open: false },
      ];
      this.tableBol = 1;
    },
    yxrow(row, index) {
      this.fileId = row.fileId;
      this.tableHeader = [
        { label: "处理状态", prop: "dataStatus", open: true },
        { label: "出行方式", prop: "tripType", open: true },
        { label: "起始时间", prop: "stime", open: true, time: true },
        { label: "结束时间", prop: "etime", open: true, time: true },
        { label: "平均速度", prop: "aveSpeed", open: true },
        { label: "最大瞬时速度", prop: "maxSpeed", open: true },
        { label: "出行里程", prop: "tripLength", open: true },
        { label: "行程时间", prop: "xctime", open: true, time: true },
        { label: "起始时间戳", prop: "qssjst", open: true },
        { label: "起始经度", prop: "slat", open: true },
        { label: "起始纬度", prop: "slng", open: true },
        { label: "结束时间戳", prop: "jssjst", open: true },
        { label: "结束经度", prop: "elat", open: true },
        { label: "结束纬度", prop: "elng", open: true },
        { label: "轨迹详情", prop: "tripDetailId", open: true },
        { label: "用户唯一标识", prop: "userCode", open: true },
        { label: "出行唯一识别码", prop: "tripCode", open: true },
      ];
      this.tableBol = 2;
    },
    totalrow(row, index) {
      this.fileId = row.fileId;
      this.tableHeader = [
        { label: "处理状态", prop: "dataStatus", open: true },
        { label: "出行方式", prop: "tripType", open: true },
        { label: "起始时间", prop: "stime", open: true, time: true },
        { label: "结束时间", prop: "etime", open: true, time: true },
        { label: "平均速度", prop: "aveSpeed", open: true },
        { label: "最大瞬时速度", prop: "maxSpeed", open: true },
        { label: "出行里程", prop: "tripLength", open: true },
        { label: "行程时间", prop: "xctime", open: true, time: true },
        { label: "起始时间戳", prop: "qssjst", open: true },
        { label: "起始经度", prop: "slat", open: true },
        { label: "起始纬度", prop: "slng", open: true },
        { label: "结束时间戳", prop: "jssjst", open: true },
        { label: "结束经度", prop: "elat", open: true },
        { label: "结束纬度", prop: "elng", open: true },
        { label: "轨迹详情", prop: "tripDetailId", open: true },
        { label: "用户唯一标识", prop: "userCode", open: true },
        { label: "出行唯一识别码", prop: "tripCode", open: true },
      ];
      this.tableBol = 3;
    },

    getTimeU(time, format="YYYY-MM-DD HH:mm:ss") {
      if (time) {
        var dayjs = require("dayjs");
        let ntime = dayjs(time).format(format);
        return ntime;
      } else {
        return time;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.monitor-class {
  width: 100%;
  height: 100%;
  .row-class {
    width: 100%;
    height: 50px;
    display: flex;
    align-content: center;
    color: #fff;
    font-size: 18px;
    .search-form-class {
      width: 180px;
      margin-right: 20px;
    }
  }
  .table-class {
    width: 100%;
    height: calc(100% - 103px);
    .setclass {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>
