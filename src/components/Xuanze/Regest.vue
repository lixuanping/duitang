<template>
  <div id="box">
    <header>
      <span @click="toggle">X</span>
    </header>
    <form @submit.prevent>
      <input type="text" placeholder="请输入手机号码" id='username' v-model='user'><br>
      <input type="password" placeholder="请输入密码" id='password' v-model='pass'><br>
      <button @click="reg">注册</button>
    </form>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      pass: ""
    };
  },
  methods: {
    toggle: function() {
      //点击顶部的X回到注册登陆页面
      location.href = "#/Xuan";
    },
    reg: function() {
      //点击注册的时候以手机号来注册
      var reg = /^1[3-9]\d{9}$/;
      if (!reg.test(this.user)) {
        alert("输入不规范");
        return false;
      } else {
        //如果符合规范则发起请求 看看是否已经注册
        $.ajax({
          url: "http://localhost:18090/d",
          type: "get",
          data: {
            user: this.user,
            pass: this.pass
          },
          success(a) {
            //如果用户名以存在则注册失败
            if (a === "no") {
              alert("注册失败");
            } else {
              //否则把用户名返回给前端 并写到sessionStorage
              window.sessionStorage.setItem("name", a);
              location.href = "#/Me";
            }
          }
        });
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
/* 注册页面 */
#box {
  height: 6.66rem;
  background: url("../../images/dd.jpg") 100% 100%;
  background-position: center center;
  background-size: cover;
  padding: 0;
}
/* 注册页面头部 */
header {
  border-bottom: 0.01rem solid #ccc;
  margin: 0;
  height: 0.5rem;
}
header span {
  float: left;
  height: 0.5rem;
  width: 0.3rem;
  text-align: center;
  height: 0.5rem;
  font-size: 0.3rem;
  line-height: 0.5rem;
  color: #fff;
}
/* 下面是改变占位符的颜色 */
#username::-webkit-input-placeholder {
  color: #fff;
}
#username:-moz-placeholder {
  color: #fff;
}
#ausernamen:-ms-input-placeholder {
  color: #fff;
}
#password::-webkit-input-placeholder {
  color: #fff;
}
#password:-moz-placeholder {
  color: #fff;
}
#password:-ms-input-placeholder {
  color: #fff;
}
/* 表单部分 */
form {
  width: 100%;
  text-align: center;
  padding-top: 1.8rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
}
form input {
  outline: none;
  height: 0.5rem;
  border: 0.01rem solid transparent;
  width: 100%;
  padding-left: 0.1rem;
  background: transparent;
  color: #fff;
  border-bottom: 0.01rem solid#fff;
}
form button {
  width: 100%;
  height: 0.4rem;
  text-align: center;
  line-height: 0.4rem;
  margin-top: 0.3rem;
  outline: none;
  color: #fff;
  background: rgba(15, 165, 224, 0.6);
  border: 0.01rem solid transparent;
  font-size: 0.2rem;
}
</style>
