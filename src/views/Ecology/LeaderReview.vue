<template>
  <div class="leaderreview-class">
    <template v-if="tableBol == -1">
      <el-row class="row-class">
        <el-col :span="24" style="justify-content: flex-start">
          <!-- 申报单位：
          <el-select
            v-model="searchform.datasource"
            placeholder="请选择"
            size="mini"
            class="search-form-class"
          ><el-option label="百度" value="百度">
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
            class="search-form-class"
            value-format="yyyy-MM"
            format="yyyy-MM"
            clearable
          >
          </el-date-picker>
          <!-- 到达时间：
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
          >
          </el-input> -->
          <el-button type="primary" size="mini" @click="handleSearch">查询</el-button>
        </el-col>
      </el-row>
      <div class="leaderreview-table-class" v-loading="loading">
        <!-- table斑马条纹 -->
        <el-table :data="reviewData" width="100%" heihgt="100%" stripe>
          <el-table-column label="序号" prop="id" width="100">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="申报单位"
            prop="datasource"
            :width="getWidth('datasource')"
          ></el-table-column>
          <el-table-column label="数据时间" prop="time" sortable></el-table-column>
          <el-table-column
            label="有效数据(吨)"
            prop="yxCount"
            :width="getWidth('yxCount')"
          ></el-table-column>
          <el-table-column
            label="有效减排量(吨)"
            prop="yxNumber"
            :width="getWidth('yxNumber')"
          >
            <template slot-scope="scope">
              {{ $tran(scope.row.yxNumber) }}
            </template>
          </el-table-column>

          <el-table-column
            label="无效数据(条)"
            prop="errCount"
            :width="getWidth('errCount')"
          >
            <template slot-scope="scope">
              <span
                @click="invalidData(scope.row, scope.index)"
                class="text-button"
              >
                {{ scope.row.errCount }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="无效减排量(吨)"
            prop="errNumber"
            :width="getWidth('errNumber')"
          >
            <template slot-scope="scope">
              {{ $tran(scope.row.errNumber) }}
            </template>
          </el-table-column>
          <el-table-column label="当前状态">
            <template slot-scope="scope">
              <span v-if="scope.row.flow">{{ scope.row.flow.status }}{{ scope.row.flow.lastCheckResult ? '(信息：' + scope.row.flow.lastCheckResult + ')' : '' }}</span>
              <span v-else>{{ scope.row.flow }}</span>

            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.flow && (scope.row.flow.curNodeStep == 3 || scope.row.flow.curNodeStep == 4) && (scope.row.flowNode && scope.row.flowNode.checkRole == roles)" @click="submit(scope.row, scope.index)" type="text">
                提交
              </el-button>
              <el-button v-if="scope.row.flow && (scope.row.flow.curNodeStep == 3 || scope.row.flow.curNodeStep == 4) && (scope.row.flowNode && scope.row.flowNode.checkRole == roles)" @click="callback(scope.row, scope.index)" type="text">
                驳回
              </el-button>
              <el-button v-if="scope.row.flow && (scope.row.flow.curNodeStep == 5)" @click="send(scope.row, scope.index) && (scope.row.flowNode && scope.row.flowNode.checkRole == roles)" type="text">
                发放
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pages">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total" @current-change="handleChangePage">
        </el-pagination>
      </div>
    </template>
    <template v-else>
      <Tablelist :datasource="datasource" :groupDate="groupDate" />
    </template>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="400px">
      <el-row class="demo-autocomplete">
        <el-col :span="24">
          <div class="sub-title" style="margin: 0 0 10px 0;">请输入驳回原因：</div>
          
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
  getRecheckList,
  setRecheck,
  addFlow,
  nextFlow,
  lastFlow,
} from "@/api/recheck";
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['roles'])
  },
  components: {
    Tablelist,
  },
  data() {
    return {
      searchform: {
        datasource: '',
        groupDate: '',
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      loading: false,

      reviewData: [],

      tableBol: -1,
      fileId: -1,
      
      datasource: '',
      groupDate: '',


      dialogVisible: false,
      restaurants: [],
      state1: '',
      curflowId: '',
      saveType: ''
    };
  },
  mounted() {
    this.restaurants = this.loadAll();
    this.init();
  },
  methods: {
    async init() {
      this.loading = true
      let res = await getRecheckList(this.searchform)
      this.reviewData = res.data.data;
      this.total = res.data.total
      this.loading = false
    },
    invalidData(rw) {
      if (rw.flow) {
        this.groupDate = rw.time
        this.datasource = rw.datasource
        this.tableBol = 1
      } else {
        this.$message.error('请先复核数据')
      }
    },
    handleSearch() {
      this.init()
    },
    send(row) {
      nextFlow({
        flowId: row.flow.id,
      }).then((res) => {
        this.init()
        this.$message.success("数据发放成功")
      })
    },
    callback(row, index) {
      this.dialogVisible = true
      this.curflowId = row.flow.id
      this.state1 = ''
      this.saveType = 'last'
    },
    submit(row, index) {
      this.dialogVisible = true
      this.state1 = ''
      this.curflowId = row.flow.id
      this.saveType = 'next'
    },
    handleChangePage(ev) {
      this.searchform.pageIndex = ev
      this.init()
    },


    getWidth(prop) {
      // 获取tableData中prop的文字最多的字数
      let max = 16;
      for (let i of this.reviewData) {
        if (i[prop]) {
          if (String(i[prop]).length > max) {
            max = i[prop].length;
          }
        } else {
          return "200";
        }
      }
      return max * 12;
    },


    ////////////
    async handleBH() {
      if (this.saveType == 'last') {
        lastFlow({
          flowId: this.curflowId,
          reason: this.state1
        }).then((res) => {
          this.init();
          this.$message.success("已驳回")
        });
      } else if (this.saveType == 'next') {
        nextFlow({
          flowId: this.curflowId,
          reason: this.state1
        }).then((res) => {
          this.init()
          this.$message.success("提交成功")
        })
      }
      
      this.dialogVisible = false
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      console.log(results)
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        { "value": "数据不正确", "address": "数据不正确" },
        { "value": "数据不完整", "address": "数据不完整" },
        { "value": "检查错误数据", "address": "检查错误数据" },
        { "value": "重新复核", "address": "重新复核" }
      ];
    },
    handleSelect(item) {
      console.log(item);
    }
  },
};
</script>

<style lang="scss" scoped>
.pages{
  text-align: center;
}
.leaderreview-class {
  width: 100%;
  height: 100%;
  .row-class {
    width: 100%;
    height: 50px;
    display: flex;
    align-content: center;
    color: #fff;
    font-size: 20px;

    .search-form-class {
      width: 180px;
      margin-right: 20px;
    }
  }
  .leaderreview-table-class {
    width: 100%;
    height: calc(100% - 122px);
    // width: 100%;
    // position: absolute;
    // top: 10%;
    .text-button {
      // 文字下划线
      text-decoration: underline;
      cursor: pointer;
      margin-right: 5px;
    }
  }
}
</style>
