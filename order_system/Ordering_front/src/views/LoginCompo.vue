<script>
import axios from "axios";
import {jwtDecode} from "jwt-decode";


export default {
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    async doLogin() {

      // 2가지 예외 가증성 :
      // 1) 200번대 상태값이면서 token
      // 2) 200번대 상태값 이 아닌 경우ㅏ
      try {
        const loginData = {
          email: this.email,
          password: this.password
        }
        const response = await axios
            .post(`${process.env.VUE_APP_API_BASE_URL}/doLogin`, loginData);

        const name = response.data.result.name;
        const token = response.data.result.token;

        if (token) {
          const decode = jwtDecode(token);
          localStorage.setItem("token", token);
          localStorage.setItem("name", name);
          localStorage.setItem("role", decode.role);
          window.location.href = "/";
        } else {
          console.log("200 ok but not token");
          alert("login Failed");
        }

      } catch (error) {
        const error_message = error.response.data.error_message;
        if (error_message) {
          console.log(error_message)
          alert(error_message)
        } else {
          console.log(error)
          alert("login Failed")
        }
      }
    }
  }
}

</script>

<template>
  <div class="container">
    <div class="page-header" style="padding: 15px"><h1>로그인</h1></div>


    <!--    submit은 기본적으로 폼 제출시 브라우저가 페이지를 다시 새로고침 하지 않는다.-->
    <form @submit.prevent="doLogin" class="form-group" style="padding: 15px">

      <label for="email" class="form-control" style="padding: 15px">이메일 :
        <input id="email" v-model="email" class="form-control" type="text">
      </label>

      <label for="password" class="form-control" style="padding: 15px">비밀번호 :
        <input id="password" v-model="password" type="password" class="form-control">
      </label>

      <p style="margin: 15px; padding: 15px">
        <button class="btn btn-primary" type="submit">Login</button>
      </p>

    </form>
  </div>
</template>
<style scoped>
</style>