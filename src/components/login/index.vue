<template>
  <div id="box">
    <header>
      <span @click="toggle">X</span>
    </header>
    <form @submit.prevent>
      <input
        type="text"
        placeholder="请输入手机号码"
        id='username'
        v-model='user'
        v-focus
      ><br>
      <input
        type="password"
        placeholder="请输入密码"
        id='password'
        v-model='pass'
      ><br>
      <button @click="login" v-if='judge'>登陆</button>
      <button @click="reg" v-if='!judge'>注册</button>
    </form>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      pass: "",
      judge:false
    };
  },
  directives: {
    //自定义指令  一开始让输入框获得焦点
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  },
  methods: {
    //点击顶部的X回到注册登陆页面
    toggle() {
      this.$router.push({
        path: "myDate"
      });
    },
    //点击登陆的时候以手机号来注册
    login() {
      var reg = /^1[3-9]\d{9}$/;
      var self = this;
      if (!reg.test(this.user)) {
        console.log("输入不规范");
        return false;
      } else {
        //如果符合规范则发起请求 看看是否已经注册
        $.ajax({
          url: "http://localhost:18090/e",
          type: "get",
          data: {
            user: self.user,
            pass: self.pass
          },
          success(res) {
            if (res === "no") {
              console.log("登陆失败");
            } else {
              //否则把用户名返回给前端 并写到sessionStorage
              window.sessionStorage.setItem("name", self.user);
              console.log("登陆成功");
              self.$router.push({
                path: "Me"
              });
            }
          }
        });
      }
    },
    //点击注册的时候
    reg(){
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
          success(res) {
            //如果用户名以存在则注册失败
            if (res === "no") {
              alert("注册失败");
            } else {
              //否则把用户名返回给前端 并写到sessionStorage
              window.sessionStorage.setItem("name", res);
              alert("注册成功");
              this.$router.push({
                  paht:'Me'
              })
            }
          }
        });
      }
    }
  },
  created() {
    //判断显示的是登陆还是注册
    if (this.$route.query.id === 1 ) {
        this.judge = true
    } else {
        this.judge = false
    }
  }
};
</script>

<style scoped>
/* 登陆页面 */
#box {
  height: 6.66rem;
  background: url("../../assets/images/dd.jpg") 100% 100%;
  background-position: center center;
  background-size: cover;
  padding: 0;
}
/* 登陆页面头部 */
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
  background: transparent !important;
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
