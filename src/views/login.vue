<template>
  <div class="login-container">
    <div class="intro">
      
    </div>

    <div class="forms" v-loading="loading">
      <div class="inp">
        <input type="text" v-model="form.username" placeholder="请输入用户名" />
      </div>
      <div class="inp">
        <input type="password" v-model="form.password" placeholder="请输入密码" />
      </div>
      <img class="btn" @click="handleLogin" src="@/assets/images/public/login/btn_confirm.png" />
    </div>
  </div>
</template>
<script>
import { login } from '@/api/user'
export default {
  components: {
  },
  data() {
    return {
      form: {
        username: 'admin',
        password: 'admin'
      },
      loading: false
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.$store.dispatch('user/login', this.form)
        .then((res) => {
          this.$router.push('/')
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-container{
  background: url('@/assets/images/public/bg2.jpg') no-repeat 0 0;
  width: 100%;height: 100%;
  position: absolute;top:0;left:0;

  .title{
    width: 100%;
  }
  .intro{
    margin: 192px auto;
    display: flex;justify-content: space-between;
    width: 80%;
    .md{width: 30%;}
    .bd{
      margin: 20px 0 0 0;
      display: flex;justify-content: space-between;
    }
    .cir{
      background: url('@/assets/images/public/login/cir_bg.png') no-repeat 0 0;
      background-size: 100% 100%;width: 130px;height: 130px;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      .t{
        background-image: -webkit-linear-gradient(top, #fff, #d5f7fd, #d5f7fd);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: HY;
        font-size: 24px;
      }
    }
  }
  .txt{
    color: #BFDFFF;
    font-family: HY;
    font-size: 14px;
    padding: 10px 10px;
    line-height: 30px;
    text-align: center;
  }

  .forms{
    margin: 10px 0 0 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .inp{
    background: url('@/assets/images/public/login/input.png') no-repeat 0 0;
    background-size: 100% 100%;
    width: 400px;height: 120px;
    input{
      width: 80%;height: 40px;background: transparent;
      margin: 38px 0 0 5px;border: none;color:#fff;
      font-size: 18px;outline: none;
      &::-webkit-input-placeholder{
        color: #fff;
      }
    }
  }
  .btn{
    cursor: pointer;
  }
}
</style>
