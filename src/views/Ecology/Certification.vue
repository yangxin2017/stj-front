
<template>
  <div class="certification-class">
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

          <!-- 申报单位：
          <el-select
            v-model="searchform.cxfs"
            placeholder="请选择"
            size="mini"
            class="search-form-class"
          ><el-option label="百度" value="百度">
            </el-option>
            <el-option label="高德" value="高德">
            </el-option>
          </el-select>

          出发时间：
          <el-date-picker
            v-model="searchform.cfsj"
            type="datetime"
            placeholder="选择日期时间"
            size="mini"
            class="search-form-class"
          >
          </el-date-picker>

          到达时间：
          <el-date-picker
            v-model="searchform.ddsj"
            type="datetime"
            placeholder="选择日期时间"
            size="mini"
            class="search-form-class"
          >
          </el-date-picker>

          导入时间：
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
          ></el-input>
          <el-button type="primary" size="mini">查询</el-button> -->
        </el-col>
        
        <el-col :span="2">
          <!-- <el-upload
            action="/stj/filemanager/upload?bid=2"
            multiple
            :show-file-list="false"
            :on-success="init"
          > -->
            <el-button type="primary" size="mini" @click="showDialog">导入核证数据</el-button>
          <!-- </el-upload> -->
        </el-col>
      </el-row>
      <div class="table-class" v-loading="loading">
        <el-table :data="tableData" style="width: 100%" height="100%" stripe>
          <el-table-column label="序号">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="申报单位" prop="datasource"></el-table-column>
          <el-table-column label="数据时间" prop="datatime" sortable>
            <template slot-scope="scope">
              <span>{{ getTimeU(scope.row.datatime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="全部数据" prop="totalCount">
            <template slot-scope="scope">
              <!-- <span @click="errorrow(scope.row, scope.index)" class="setclass"> -->
              {{ scope.row.totalCount }}
              <!-- </span> -->
            </template>
          </el-table-column>
          <el-table-column label="有效数据" prop="yxCount">
            <template slot-scope="scope">
              <!-- <span @click="errorrow(scope.row, scope.index)" class="setclass"> -->
              {{ scope.row.yxCount }}<small>(<span v-if="scope.row.yxCount && scope.row.totalCount">
                {{ (scope.row.yxCount * 100 / scope.row.totalCount).toFixed(1) }} %
              </span>
              <span v-else>
                0%
              </span>)</small>
              <!-- </span> -->
            </template>
          </el-table-column>
          <el-table-column label="错误数据" prop="errCount">
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
              <span>{{ getTimeU(scope.row.time) }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="导入用户" prop="user"></el-table-column> -->
          <el-table-column
            label="导入文件名称"
            prop="filename"  width="250px"
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
      <div class="pages">
        <el-pagination
          background :page-size="pageSize"
          layout="prev, pager, next"
          :total="total" @current-change="handleChangePage">
        </el-pagination>
      </div>
    </template>

    <Tablelist v-if="tableBol == 1" :fileId="fileId" />

    <el-dialog title="上传文件" :visible.sync="dialog.visible" width="500px">
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
            :action="`/stj/filemanager/upload?bid=2&datasource=${dialog.datasource}`">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <!-- <el-upload
            :action="`/stj/filemanager/upload?bid=2&datasource=${dialog.datasource}`"
            multiple ref="refCheckUpload"
            :show-file-list="true"
            :on-success="handleSuccess" :auto-upload="false"
          >
            <el-button type="primary" size="mini">选择核证数据文件</el-button>
          </el-upload> -->
        </el-col>
      </el-row>
      <div style="margin-top: 15px;text-align: right;">
        <el-button type="primary" v-loading="loadingSC" size="mini" @click="handleUpload">上传</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Tablelist from "./certification/Tablelist";

import { getCheckList } from "@/api/certification";
export default {
  components: {
    Tablelist,
  },
  data() {
    return {
      tableBol: -1,
      searchform: {
        datasource: ''
      },
      tableData: [],
      fileId: -1,
      dialog: {
        visible: false,
        datasource: '高德',
        loading: null
      },
      pageIndex: 1,
      pageSize: 15,
      total: 0,
      loading: false,

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
    handleUpload() {
      // this.dialog.loading = this.$loading({
      //   lock: true,
      //   text: '正在导入数据，请稍候~',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // })
      this.uploadingData = true
      this.loadingSC = true
      this.$refs.refCheckUpload.submit()
    },
    handleSuccess() {
      // this.dialog.loading.close()
      this.loadingSC = false
      this.$message.success('数据导入成功！')
      // this.dialog.visible = false
      // this.init()
    },
    showDialog() {
      this.uploadingData = false
      this.dialog.visible = true;
    },
    handleChangePage(ev) {
      this.pageIndex = ev
      this.init()
    },
    async init() {
      this.loading = true
      let obj = await getCheckList({ pageIndex: this.pageIndex, pageSize: this.pageSize, datasource: this.searchform.datasource })
      this.tableData = obj.data.data
      this.total = obj.data.total
      this.loading = false
    },
    errorrow(row, index) {
      this.fileId = row.fileId;
      this.tableBol = 1;
    },
    getTimeU(time) {
      if (time == "--") {
        return time;
      }
      if (time) {
        var dayjs = require("dayjs");
        let ntime = dayjs(time).format("YYYY-MM-DD");
        return ntime;
      } else {
        return time;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pages{
  text-align: center;
}
.certification-class {
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
    height: calc(100% - 100px);
    .setclass {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>
