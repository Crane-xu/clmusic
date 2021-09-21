<template>
  <div class="login">
    <div class="welcome"><img src="../assets/img/icon.png" /></div>
    <div class="login-form">
      <div class="login-inp">
        <label>帐号</label><input v-model="phone" type="text" placeholder="请输入手机号" />
      </div>
      <div class="login-inp">
        <label>密码</label><input v-model="password" type="password" placeholder="请输入密码" />
      </div>
      <div class="login-inp"><a href="#" @click="loginEvent">立即登录</a></div>
    </div>
    <div class="login-txt">
      <a href="#">立即注册</a>|<a href="#">忘记密码？</a>|<a href="http://localhost:8080/">返回首页</a>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            phone:"",
            password:"",
        }
    },
    methods:{
        loginEvent:async function(){
            let res = await this.$store.dispatch('phoneLogin',{phone:this.phone,password:this.password});
            if(res.data.code==200){
                this.$router.push('/me');
            }
        }
    }
}
</script>

<style lang="less">
@charset "utf-8";
html,body,div,p,form,label,ul,li,dl,dt,dd,ol,img,button,b,em,strong,small,h1,h2,h3,h4,h5,h6{margin:0;padding:0;border:0;list-style:none;font-style:normal;}
body{font-family:SimHei,'Helvetica Neue',Arial,'Droid Sans',sans-serif;font-size:14px;color:#333;background:#f2f2f2;}
a, a.link{color:#666;text-decoration:none;font-weight:500;}
a, a.link:hover{color:#666;}
h1,h2,h3,h4,h5,h6{font-weight: normal;}

.login{width:100%;height:100%;background-color:#d43c33;;position:fixed;z-index:10;}
.welcome{width:30%;margin:18% auto;}
.welcome img{width:100%;}
.login-inp{margin:0 30px 15px 30px;border:1px solid #fff;border-radius:25px;}
.login-inp label{width:4em;text-align:center;display:inline-block;color:#fff;}
.login-inp input{line-height:40px;color:#fff;background-color:transparent;border:none;outline: none;}
.login-inp a{display:block;width:100%;text-align:center;line-height:40px;color:#fff;font-size:16px;letter-spacing:5px;}
.login-txt{text-align:center;color:#fff;}
.login-txt a{color:#fff;padding:0 5px;}
</style>