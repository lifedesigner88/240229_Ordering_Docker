<script>
import axios from "axios";


export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      city: "",
      street: "",
      zipcode: "",
    }
  },
  methods: {
    async memberCreate() {

      try {
        const registerData = {
          name: this.name,
          email: this.email,
          password: this.password,
          city: this.city,
          street: this.street,
          zipcode: this.zipcode,
        }

        await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/create`, registerData);
        this.$router.push({name: 'Login'});
        // window.location.href = "/login";

      } catch (error) {
        const err_msg = error.response.data.error_message;
        if (err_msg) {
          console.log(err_msg);
          alert(err_msg);
        } else {
          console.log(error);
          alert("입력값 확인 필요");
        }
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="page-header" style="padding: 15px"><h1>회원 가입</h1></div>

    <form class="form-group" @submit.prevent="memberCreate" style="padding: 15px">

      <label for="name" class="form-control" style="padding: 15px">이름 :
        <input id="name" v-model="name" type="text" class="form-control" >
      </label>

      <label for="email" class="form-control" style="padding: 15px">이메일 :
        <input id="email" v-model="email" type="text" class="form-control">
      </label>

      <label for="password" class="form-control" style="padding: 15px">비밀번호 :
        <input id="password" v-model="password" type="text" class="form-control">
      </label>

      <label for="city" class="form-control" style="padding: 15px">도시 :
        <input id="city" v-model="city" type="text" class="form-control">
      </label>

      <label for="street" class="form-control" style="padding: 15px">동 :
        <input id="street" v-model="street" type="text" class="form-control">
      </label>

      <label for="zipcode" class="form-control" style="padding: 15px">우편번호 :
        <input id="zipcode" v-model="zipcode" type="text" class="form-control">
      </label>
      <p style="margin: 15px; padding: 15px"><button class="btn btn-primary" type="submit">Submit</button></p>

    </form>
  </div>
</template>

<style>

</style>