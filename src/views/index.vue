<template>
  <div class="main">
    <el-row>
      <el-col :span="9"></el-col>
      <el-col :span="6">
        <el-card style="margin-top: 100px">
          <div class="title">
            <router-link class="active" :to="{name:'login'}">登录</router-link>
            <span>·</span>
            <router-link :to="{name:'register'}">注册</router-link>
          </div>
          <div class="sign-up-container">
            <el-form ref="userForm" :model="user">
              <el-form-item class="input-prepend restyle" prop="username" :rules="[
            {required: true, message: '请输入用户名', trigger: 'blur' },
            ]">
                <div>
                  <el-input type="text" placeholder="用户名" v-model="user.username"/>
                  <i class="iconfont icon-phone"/>
                </div>
              </el-form-item>
              <el-form-item class="input-prepend" prop="password" :rules="[
            { required:true, message: '请输入密码', trigger: 'blur' }
            ]">
                <div>
                  <el-input type="password" placeholder="密码" v-model="user.password"/>
                  <i class="iconfont icon-password"/>
                </div>
              </el-form-item>
              <div class="btn">
                <input type="button" class="sign-in-button" value="登录" @click="submitLogin()">
              </div>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getUserInfo, subjectLogin} from "../api/user";
import {setToken} from "../utils/auth";

export default {
  name: "loginPage",
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      //用户信息
      loginInfo: {}
    }
  },
  methods: {
    submitLogin() {
      subjectLogin(this.user).then(response => {
        const token = response.data.token
        setToken("user_token", token)
        getUserInfo()
            .then(response => {
              console.log(response.data)
              this.loginInfo = response.data.user
              setToken("user_id", this.loginInfo.uid)
              setToken("avatar", this.loginInfo.avatar)
              setToken("user_name", this.loginInfo.username)
              window.location.href = "/"
            })
      })
    }
  }
}
</script>

<style scoped>
.title{
  text-align: center;
}
</style>
