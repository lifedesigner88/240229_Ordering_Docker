<script>
import axios from "axios";
import OrderListCompo from "@/components/list/OrderListCompo.vue";

const TOKEN = localStorage.getItem("token");
const headers = TOKEN ? {Authorization: `Bearer ${TOKEN}`} : {};

export default {
  components: {OrderListCompo},
  data() {
    return {
      mydata: {},
    }
  },

  methods: {
    async fetchMyInfo() {
      const res = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/myInfo`, {headers});
      this.mydata = res.data;
    }
  },

  created() {
    this.fetchMyInfo();
  }
}
</script>


<template>
  <div class="container">
    <div class="page-header" style="padding: 15px">
      <h1>회원 정보</h1>
    </div>
    <table class="table">
      <tr>
        <th>이름</th>
        <td>{{mydata.name}}</td>
      </tr>
      <tr>
        <th>email</th>
        <td>{{mydata.email}}</td>
      </tr>
      <tr>
        <th>도시</th>
        <td>{{mydata.city}}</td>
      </tr>
      <tr>
        <th>상세주소</th>
        <td>{{mydata.street}}</td>
      </tr>
      <tr>
        <th>우편번호</th>
        <td>{{mydata.zipcode}}</td>
      </tr>
      <tr>
        <th>주문수량</th>
        <td>{{mydata.orderCount}}</td>
      </tr>
    </table>
  </div>

  <OrderListCompo
      :is-admin="false"
      api-url="/member/myorders"
  />

</template>