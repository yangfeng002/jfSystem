<template>
  <el-container class="login-container">
    <div id="particles">
      <div style="position: relative; top: 200px;">
        <canvas width="1600" height="788"></canvas>
      </div>
    </div>
    <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px"
             class="demo-ruleForm login-page">
      <h3 class="title">经分系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox>
      <router-link to="/register" class="el-user-register">用户注册</router-link>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
  </el-container>

</template>

<script>
  import API from '../api/api_user';

  export default {
    data() {
      return {
        loading: false,
        account: {
          username: 'admin',
          pwd: '123456'
        },
        rules: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            //{ validator: validaePass }
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleLogin() {
        let that = this;
        this.$refs.AccountFrom.validate((valid) => {
          if (valid) {
            this.loading = true;
            let loginParams = {username: this.account.username, pwd: this.account.pwd};
            API.login(loginParams).then(function (result) {
              that.loading = false;
              if (result && result.id) {
                localStorage.setItem('access-manageboard', JSON.stringify(result));
//                that.$store.commit('SET_ROUTERS', manageboard.permissions)
//                that.$router.addRoutes(that.$store.getters.addRouters);
//                that.$router.options.routes = that.$store.getters.routers;
                that.$router.push({path: '/'});
              } else {
                that.$message.error({showClose: true, message: result.errmsg || '登录失败', duration: 2000});
              }
            }, function (err) {
              that.loading = false;
              that.$message.error({showClose: true, message: err.toString(), duration: 2000});
            }).catch(function (error) {
              that.loading = false;
              console.log(error);
              that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
            });
          }
        });
      }
    }
  }
</script>
<style>
  body {
    background-image: -moz-linear-gradient(top, #CBEE9F, #D2EFAD); /*Firefox*/
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0,#CBEE9F), color-stop(1, #D2EFAD)); /*saf4+, Chrome */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#CBEE9F', endColorstr='#D2EFAD', GradientType=0); /* IE */
    background-size: 100% 100%;
  }
</style>
<style lang="scss" scoped>
   .login-container{
     #particles{
       position: absolute;
       width: 100%;
       top: 0;
       bottom: 0;
       overflow: hidden;
     }
     .login-page{
       /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
       -webkit-border-radius: 5px;
       border-radius: 5px;
       -moz-border-radius: 5px;
       background-clip: padding-box;
       margin: 160px auto;
       width: 350px;
       padding: 35px 35px 15px 35px;
       background: #fff;
       border: 1px solid #eaeaea;
       box-shadow: 0 0 25px #cac6c6;
       background: -ms-linear-gradient(top,#CBEE9F, #D2EFAD); /* IE 10 */
       background: -moz-linear-gradient(top, #CBEE9F,#D2EFAD); /*火狐*/
       background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#D2EFAD), to(#D2EFAD)); /*谷歌*/
       background: -webkit-linear-gradient(top,#D2EFAD,#D2EFAD); /*Safari5.1 Chrome 10+*/
       background: -o-linear-gradient(top,#D2EFAD,#D2EFAD); /*Opera 11.10+*/
       .title {
         margin: 0px auto 40px auto;
         text-align: center;
         color: #505458;
       }
       .rememberme{
         margin: 0px 0px 15px;
         text-align: left;
       }
       .el-user-register{
         text-decoration: none;
         text-align: right;
         font-size: 14px;
         color: #606266;
         padding: 0 15px;
         cursor: pointer;
         -webkit-box-sizing: border-box;
         box-sizing: border-box;
         width: 80px;
       }
     }
   }

</style>
