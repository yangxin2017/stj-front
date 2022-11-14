<template>
  <div class="header-class">
    <div class="header-left">
      <div class="title-zh">{{ title }}</div>
      <!-- <div class="title-en">{{ title_en }}</div> -->
    </div>
    <div class="header-right">
      <ul class="nav-menu" v-if="roles">
        <template v-for="(item, index) in menu">
          <li v-if="!item.role || item.role.indexOf(roles + ',') >= 0"
            class="nav-menu-li"
            :key="item.title + index"
            @mousemove="showHandle(index)"
            @mouseout="hideHandle()"
          >
            <span
              class="nav-menu-li-span"
              :class="current(item)"
              @click="jumpPath(item)"
            >
              <i :class="item.icon"></i>
              {{ item.title }}
            </span>
            <ul
              v-if="item.children"
              v-show="showIndex == index"
              class="nav-menu-children"
              @mousemove="showHandle(index)"
              @mouseout="hideHandle()"
            >
              <li
                class="nav-menu-children-li"
                v-for="(item_c, index_c) in item.children"
                :key="item_c.title + index_c"
                @click="jumpPath(item_c)"
                :style="childrenStyle(item_c) ? { color: '#F0FF26' } : {}"
              >
                {{ item_c.title }}
              </li>
            </ul>
          </li>
        </template>
      </ul>

      <i class="el-icon-user-solid user-icon" v-if="roles"></i>

      <div class="user-information" v-if="roles">
        <div class="user-zh">欢迎登录</div>
        <div class="user-en">{{ name }}</div>
      </div>

      <i v-if="roles" class="el-icon-switch-button login-out" @click="handleLogout"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['roles', 'name'])
  },
  props: {
    title: {
      type: String,
      default: "标题",
    },
    title_en: {
      type: String,
      default: "Title",
    },
  },
  data() {
    return {
      showIndex: -1,
      menu: [
        {
          title: "首页",
          path: "/ecology/index",
          icon: "el-icon-monitor",
        },
        {
          title: "数据导入",
          icon: "el-icon-document-add",
          children: [
            {
              title: "监测数据",
              path: "/ecology/monitor",
            },
            {
              title: "核证数据",
              path: "/ecology/certification",
            },
          ],
          role: '5,1,'
        },
        {
          title: "部门复核",
          icon: "el-icon-tickets",
          children: [
            {
              title: "复核数据",
              path: "/ecology/RecheckData",
            },
            {
              title: "参数设置",
              path: "/ecology/parameter",
            },
          ],
          role: '5,1,'
        },
        {
          title: "数据审核",
          icon: "el-icon-document-checked",
          path: "/ecology/LeaderReview",
          role: '2,3,1,'
        },
        {
          title: "统计分析",
          icon: "el-icon-s-data",
          path: "/ecology/statisticanalysis",
        },
        {
          title: "数据查询",
          icon: "el-icon-search",
          children: [
            {
              title: "监测数据",
              path: "/ecology/query/detectiondataquery",
            },
            {
              title: "核证数据",
              path: "/ecology/query/checkdataquery",
            },
            {
              title: "复核数据",
              path: "/ecology/query/re-checkdataquery",
            },
            {
              title: "审核数据",
              path: "/ecology/query/auditdataquery",
            },
          ],
        },
        {
          title: "文件管理",
          icon: "el-icon-folder-opened",
          path: "/",
        },
      ],
      isHide: false,
    };
  },
  mounted() {},
  methods: {
    async handleLogout() {
      await this.$store.dispatch('user/logout')
      window.location.href = '/login'
    },
    showHandle(index) {
      this.isHide = false;
      this.showIndex = index;
    },
    hideHandle() {
      this.isHide = true;
      setTimeout(() => {
        if (this.isHide) {
          this.showIndex = -1;
        }
      }, 100);
    },
    current(item) {
      if (this.$route.meta.title) {
        return {
          "nav-menu-li-span-active":
            this.$route.meta.title.indexOf(item.title) > -1,
        };
      } else {
        return "";
      }
    },
    jumpPath(item) {
      if (item.path) {
        this.$router.push({
          path: item.path,
        });
      }
    },
    childrenStyle(item) {
      if (this.$route.meta.title) {
        return this.$route.meta.title.indexOf(item.title) > -1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header-class {
  width: 98%;
  height: 69px;
  margin-left: 1%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba($color: #fff, $alpha: 0.3);
  .header-left {
    .title-zh {
      font-size: 30px;
      color: #fff;
      font-family: HY;
      margin-bottom: 6px;
    }
    .title-en {
      color: #000;
      background: #00bfff;
      line-height: 14px;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    .nav-menu {
      // 去除默认样式
      list-style: none;
      display: flex;
      .nav-menu-li {
        margin: 0 20px;
        // width: 68px;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .nav-menu-li-span {
          width: 100%;
          height: 100%;
          float: left;
          color: #00bfff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          font-size: 20px;
          i {
            font-size: 24px;
            margin-bottom: 6px;
          }
        }
        .nav-menu-li-span:hover {
          color: #ffff26;
          cursor: pointer;
        }
        .nav-menu-li-span-active {
          background-image: url("@/assets/images/ec/nav-background.png");
          color: #ffff26;
        }
        .nav-menu-children {
          list-style: none;
          position: absolute;
          left: 0;
          top: 70px;
          z-index: 50;
          width: 80px;
          text-align: center;
          background: #070e3d;
          color: #fff;
          .nav-menu-children-li {
            padding: 10px 0;
            font-size: 18px;
            cursor: pointer;
          }
          // .nav-menu-children-li:hover {
          //   background: #00bfff;
          // }
        }
      }
      // 1440
      @media screen and (max-width: 1440px) {
        .nav-menu-li {
          margin: 0;
          font-size: 14px;
        }
      }
    }
    .user-icon {
      font-size: 20px;
      color: #73b9ff;
      margin: 10px;
      padding: 6px;
      border: 1px solid #73b9ff;
      border-radius: 5px;
    }
    .user-information {
      color: #fff;
      margin-right: 10px;
      .user-zh {
        font-size: 16px;
      }
      .user-en {
        font-size: 18px;
      }
    }
    .login-out {
      font-size: 36px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
