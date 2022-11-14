<template>
  <div class="parameter-class">
    <iframe :src="downloadUrl" frameborder="0" v-show="false"></iframe>
    <Card height="90%" title="复合参数设置">
      <div class="row-class">
        <div class="col-card">
          <div class="title-class">
            <span class="title">里程转换系数</span>
          </div>
          <div class="body-class">
            <div class="small-card">
              <span class="label-class">步行：</span>
              <el-input v-model="lczhxsFrom.cx" class="input-class"></el-input>
            </div>
            <div class="small-card">
              <span class="label-class">自行车：</span>
              <el-input v-model="lczhxsFrom.zxc" class="input-class"></el-input>
            </div>
            <div class="small-card">
              <span class="label-class">公交：</span>
              <el-input v-model="lczhxsFrom.gj" class="input-class"></el-input>
            </div>
            <div class="small-card">
              <span class="label-class">地铁：</span>
              <el-input v-model="lczhxsFrom.dt" class="input-class"></el-input>
            </div>
            <div style="width: 100%; text-align: right">
              <el-button
                type="primary"
                style="margin-right: 14%; width: 120px"
                @click="lczhxsClick"
              >
                保存
              </el-button>
            </div>
          </div>
        </div>

        <div class="col-card">
          <div class="title-class">
            <span class="title">减排系数</span>
          </div>
          <div class="body-class">
            <div class="big-card">
              <span class="label-class">步行：</span>
              <div class="big-card-button">
                <el-upload
                  action="/stj/jianpai/upload?bid=4"
                  multiple
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                >
                  <el-button type="primary" style="width: 100px">
                    导入
                  </el-button>
                </el-upload>
                <el-button
                  type="primary"
                  style="width: 100px"
                  @click="downloadFile('/stj/cpf/export?type=BX')"
                >
                  导出
                </el-button>
              </div>
            </div>
            <div class="big-card">
              <span class="label-class">自行车：</span>
              <div class="big-card-button">
                <el-upload
                  action="/stj/jianpai/upload?bid=5"
                  multiple
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                >
                  <el-button type="primary" style="width: 100px">
                    导入
                  </el-button>
                </el-upload>
                <el-button
                  type="primary"
                  style="width: 100px"
                  @click="downloadFile('/stj/cpf/export?type=ZXC')"
                >
                  导出
                </el-button>
              </div>
            </div>
            <div class="big-card">
              <span class="label-class">公交：</span>
              <div class="big-card-button">
                <el-upload
                  action="/stj/jianpai/upload?bid=6"
                  multiple
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                >
                  <el-button type="primary" style="width: 100px">
                    导入
                  </el-button>
                </el-upload>
                <el-button
                  type="primary"
                  style="width: 100px"
                  @click="downloadFile('/stj/cpf/export?type=GJ')"
                >
                  导出
                </el-button>
              </div>
            </div>
            <div class="big-card">
              <span class="label-class">地铁：</span>
              <div class="big-card-button">
                <el-upload
                  action="/stj/jianpai/upload?bid=7"
                  multiple
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                >
                  <el-button type="primary" style="width: 100px">
                    导入
                  </el-button>
                </el-upload>
                <el-button
                  type="primary"
                  style="width: 100px"
                  @click="downloadFile('/stj/cpf/export?type=DT')"
                >
                  导出
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-card">
          <div class="title-class">
            <span class="title">全市域小汽车碳排放系数</span>
          </div>
          <div class="body-class">
            <div class="big-card all-car-class">
              <el-upload
                action="/stj/cpf/upload?bid=8"
                multiple
                :show-file-list="false"
              >
                <el-button type="primary" style="width: 100px">
                  导入
                </el-button>
              </el-upload>
              <el-button
                type="primary"
                style="width: 100px"
                @click="downloadFile('/stj/cpf/export')"
              >
                导出
              </el-button>
            </div>
          </div>
        </div>

        <div class="col-card">
          <div class="title-class">
            <span class="title">项目排放系数</span>
          </div>
          <div class="body-class">
            <!--<div class="big-card">
              <span class="label-class">步行减排系数：</span>
              <div class="big-card-button">
                <el-upload
                  :action="upload.url + '?bid=-1'"
                  multiple
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                >
                  <el-button type="primary" style="width: 100px">
                    导入
                  </el-button>
                </el-upload>
                <el-button type="primary" style="width: 100px">
                  导出
                </el-button>
              </div>
            </div>
            <div class="big-card">
              <span class="label-class">自行车减排系数：</span>
              <div class="big-card-button">
                <el-upload
                  :action="upload.url + '?bid=-1'"
                  multiple
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                >
                  <el-button type="primary" style="width: 100px">
                    导入
                  </el-button>
                </el-upload>
                <el-button type="primary" style="width: 100px">
                  导出
                </el-button>
              </div>
            </div>
            <div class="big-card">
              <span class="label-class">公交减排系数：</span>
              <div class="big-card-button">
                <el-upload
                  :action="upload.url + '?bid=-1'"
                  multiple
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                >
                  <el-button type="primary" style="width: 100px">
                    导入
                  </el-button>
                </el-upload>
                <el-button type="primary" style="width: 100px">
                  导出
                </el-button>
              </div>
            </div>
            <div class="big-card">
              <span class="label-class">地铁减排系数：</span>
              <div class="big-card-button">
                <el-upload
                  :action="upload.url + '?bid=-1'"
                  multiple
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                >
                  <el-button type="primary" style="width: 100px">
                    导入
                  </el-button>
                </el-upload>
                <el-button type="primary" style="width: 100px">
                  导出
                </el-button>
              </div>
            </div> -->

            <div class="small-card">
              <span class="label-class">步行：</span>
              <el-input v-model="xmpfxsFrom.bx" class="input-class"></el-input>
            </div>
            <div class="small-card">
              <span class="label-class">自行车：</span>
              <el-input v-model="xmpfxsFrom.zxc" class="input-class"></el-input>
            </div>
            <div class="small-card">
              <span class="label-class">公交：</span>
              <el-input v-model="xmpfxsFrom.gj" class="input-class"></el-input>
            </div>
            <div class="small-card">
              <span class="label-class">地铁：</span>
              <el-input v-model="xmpfxsFrom.dt" class="input-class"></el-input>
            </div>
            <div style="width: 100%; text-align: right">
              <el-button
                type="primary"
                style="margin-right: 14%; width: 120px"
                @click="xmpfxsClick"
              >
                保存
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/techStyle/public/Card.vue";
import {
  getData,
  addData,
  updateData,
  getProjectData,
  addProjectData,
  updateProjectData,
} from "@/api/parameter";
export default {
  components: {
    Card,
  },
  data() {
    return {
      lczhxsFrom: {},
      xmpfxsFrom: {},
      isCreate: false,
      isxmpfxsCreate: false,
      form: {},

      upload: {
        url: "/stj/jianpai/upload",
      },

      downloadUrl: "",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      getData().then((res) => {
        if (res.data) {
          this.lczhxsFrom = res.data;
          this.isCreate = false;
        } else {
          this.isCreate = true;
        }
      });

      getProjectData().then((res) => {
        if (res.data) {
          this.xmpfxsFrom = res.data;
          this.isxmpfxsCreate = false;
        } else {
          this.isxmpfxsCreate = true;
        }
      });
    },
    lczhxsClick() {
      if (this.isCreate) {
        addData(this.lczhxsFrom).then((res) => {
          if (res.success) {
            this.$message.success("新建成功！");
          } else {
            this.$message.error("新建失败！请联系管理员！");
          }
          this.init();
        });
      } else {
        updateData(this.lczhxsFrom).then((res) => {
          if (res.success) {
            this.$message.success("修改成功！");
          } else {
            this.$message.error("修改失败！请联系管理员！");
          }
          this.init();
        });
      }
    },
    xmpfxsClick() {
      if (this.isxmpfxsCreate) {
        addProjectData(this.xmpfxsFrom).then((res) => {
          if (res.success) {
            this.$message.success("新建成功！");
          } else {
            this.$message.error("新建失败！请联系管理员！");
          }
          this.init();
        });
      } else {
        updateProjectData(this.xmpfxsFrom).then((res) => {
          if (res.success) {
            this.$message.success("修改成功！");
          } else {
            this.$message.error("修改失败！请联系管理员！");
          }
          this.init();
        });
      }
    },
    uploadSuccess() {
      this.$message.success("上传成功！");
    },
    downloadFile(url) {
      // window.open(url);
      this.downloadUrl = url;
    },
  },
};
</script>

<style lang="scss" scoped>
.parameter-class {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .row-class {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .col-card {
      width: 24%;
      height: 100%;
      .title-class {
        margin: 10px 0;
        width: 100%;
        height: 42px;
        background: url("@/assets/images/ec/pertitle.png");
        position: relative;
        .title {
          font-size: 20px;
          font-family: "HY";
          color: #fff;
          position: absolute;
          left: 34px;
          top: 8px;
        }
      }
      .body-class {
        width: 100%;
        height: calc(100% - 150px);
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        .label-class {
          font-size: 24px;
          font-family: "HY";
          color: #bfdfff;
          margin-left: 10px;
        }
        .input-class {
          width: 100px;
          margin-right: 10px;
        }
        .small-card {
          width: 336px;
          height: 58px;
          background: url("@/assets/images/ec/smallback.png");
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .big-card {
          width: 336px;
          height: 114px;
          background: url("@/assets/images/ec/bigback.png");
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .big-card-button {
            display: flex;
            align-items: center;
            justify-content: space-around;
            flex-direction: column;
            height: 100%;
            margin-right: 10px;
            .el-button + .el-button,
            .el-checkbox.is-bordered + .el-checkbox.is-bordered {
              margin-left: 0;
            }
          }
        }
        .all-car-class {
          display: flex;
          align-content: center;
          justify-content: space-around;
          flex-direction: column;
          .el-button + .el-button,
          .el-checkbox.is-bordered + .el-checkbox.is-bordered {
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>