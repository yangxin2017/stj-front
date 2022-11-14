<template>
  <div id="app" v-if="curpath != '/login'">
    <Header :title="title" :title_en="title_en" ref="header" />
    <router-view class="router-view-class" />
  </div>
  <div id="app" v-else>
    <router-view />
  </div>
</template>

<script>
// 引入setting.json
import setting from "@/setting.json";
import Header from "@/components/techStyle/public/Header.vue";

import { login } from "@/api/index";
export default {
  components: {
    Header,
  },
  data() {
    return {
      title: "",
      title_en: "",
      curpath: ''
    };
  },
  watch: {
    '$route': function(n,o) {
      this.curpath = n.path
      console.log(this.curpath)
    }
  },
  mounted() {
    this.title = setting.title;
    this.title_en = setting.title_en;

    if (!sessionStorage.getItem("token")) {
      login({ username: "admin", password: "admin" }).then((res) => {
        sessionStorage.setItem("token", res.data.token);
      });
    }
  },
  methods: {},
};
</script>


<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #070e3d;
  // background-image: url("@/assets/images/public/background.png");
  .router-view-class {
    width: 98%;
    height: calc(100% - 90px);
    position: absolute;
    left: 1%;
    top: 80px;
  }
}
</style>
