<script>
import axios from "axios";

const TOKEN = localStorage.getItem("token");
const headers = TOKEN ? {Authorization: `Bearer ${TOKEN}`} : {};

export default {
  props: ['isAdmin', 'apiUrl'],
  data() {
    return {
      orderList: [],
      visibleOrder: new Set()
    }
  },

  methods: {

    async fetchMembers() {
      const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}${this.apiUrl}`, {headers});
      this.orderList = response.data;
    },


    toggleOrder(orderId) {
      if (this.visibleOrder.has(orderId)) {
        this.visibleOrder.delete(orderId);
      } else {
        this.visibleOrder.add(orderId);
      }
    },

    async orderCancle(orderId) {
      console.log(orderId);
      confirm("정말 취소하시겠습니까?")
      await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/order/${orderId}/cancel`,{headers})
      const order = this.orderList.find(order => order.orderId === orderId)
      order.orderStatus = "CANCELED"
    }

  },

  created() {
    this.fetchMembers();
  },

}
</script>

<template>
  <div class="container">
    <div class="page-header" style="padding: 15px"><h1>주문 목록</h1></div>
    <table class="table">
      <thead>
      <tr>
        <th>#</th>
        <th>회원 Email</th>
        <th>주문상태</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="order in orderList" :key="order.orderId">
        <tr style="cursor: pointer" @click="toggleOrder(order.orderId)">
          <td>{{ order.orderId }}</td>
          <td>{{ order.memberEmail }}</td>
          <td>{{ order.orderStatus }}</td>
          <td>
            <button
              v-if="order.orderStatus==='ORDERED'"
              @click.stop="orderCancle(order.orderId)"
            style="font-size: 12px">CANCLE</button>
          </td>
        </tr>
        <tr v-if="visibleOrder.has(order.orderId)">
          <td colspan="4">
              <span v-for="orderItem in order.orderItems" :key="orderItem.itemId">
                {{ orderItem.itemName }}      {{ orderItem.quantity }}
              </span>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<style>

</style>