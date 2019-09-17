<template>
  <el-container class="register-container">
    <el-form :model="ruleForm" :rules="rules"
             ref="ruleForm"
             status-icon
             label-position="left"
             label-width="0px"
             class="register-page">
      <h3 class="title">中国移动咪咕互娱经营分析系统</h3>
      <el-form-item prop="username">
        <el-input type="text"
                  v-model="ruleForm.username"
                  auto-complete="off"
                  placeholder="请输入用户名"
                  clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="ruleForm.password"
                  auto-complete="off"
                  placeholder="请输入密码"
                  clearable
        ></el-input>
      </el-form-item>
      <router-link to="/login" class="el-user-login">返回登录</router-link>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%"  @click="submitForm()" :loading="logining">注册</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
  export default {
    name: 'register',
    data() {
      return {
        logining: false,
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        checked: false
      }
    },
    methods: {
      submitForm:function(){
        // 注册用户，用户名和密码非空
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.logining = true;
              //验证通过，调用后台接口
            this.$ajax({
              method: 'post',
              url: '/api/user/addUser',
              data: {
                username:this.ruleForm.username,
                password: this.ruleForm.password
              }
            }).then((res) =>{
              debugger
               console.log(res);
               if(res.status==200){
                 //表示运行成功
                 this.logining = false;
                 this.$confirm('用户注册成功', '提示', {
                   confirmButtonText: '登录',
                   cancelButtonText: '关闭',
                   type:'success',
                   roundButton:true
                 }).then(() => {
                   //跳转登录页面
                   this.$router.push('/login');
                 }).catch(() => {
                   //关闭当前窗口，不予操作
                 });
               }else{
                 //表示注册失败
                 this.$alert('用户注册失败!', '提示', {
                   confirmButtonText: 'ok',
                   type:'error',
                   roundButton:true
                 })

               }
            }).catch((error)=>{
               console.log(error);
            });

          }else {
            //验证失败
            console.log('error submit!!');
            return false;
          }
        });

      }
    }
  }
</script>

<style scoped lang="less">
  .register-container{
    width: 100%;
    height: 100%;
    background-image: -moz-linear-gradient(top, #CBEE9F, #D2EFAD); /* Firefox */
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0,#CBEE9F), color-stop(1, #D2EFAD)); /* Saf4+, Chrome */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#CBEE9F', endColorstr='#D2EFAD', GradientType='0'); /* IE*/;
    background-size: 100% 100%;
    position: fixed;
    left: 0;
    top:0;
  }
  .register-page{
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    height: 300px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .el-user-login{
    text-decoration: none;
    text-align: right;
    font-size: 14px;
    color: #606266;
    padding: 0 15px;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    margin: 0 0 15px;
  }
</style>
