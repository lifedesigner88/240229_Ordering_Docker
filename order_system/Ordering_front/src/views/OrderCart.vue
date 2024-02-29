<script>
import {mapGetters} from "vuex";
import axios from "axios";

const TOKEN = localStorage.getItem("token");
const headers = TOKEN ? {Authorization: `Bearer ${TOKEN}`} : {};


export default {
  name: "OrderCart",

  computed: {
    ...mapGetters(['getCartItems', 'getTotalQuantity']),
  },

  methods: {
    async placeOrder() {
      const orderItems = this.getCartItems.map(
          item => {
            return {
              itemId: item.itemId,
              quantity: item.quantity
            }
          }
      );

      if (!confirm(`${this.getTotalQuantity}개의 상품을 주문하시겠습니까?`)) {
        alert("추문이 취소되었습니다.")
        return;
      }

      try {
        await axios.post(
            `${process.env.VUE_APP_API_BASE_URL}/order/create`,
            orderItems,
            {headers}
        );
        alert("주문이 완료되었습니다");
        window.location.reload();
        this.cartClear();
      } catch (e) {
        console.log(e);
        alert("주문이 실패되었습니다.");
      }
    },

    cartClear() {
      this.$store.commit('clearCart');
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="page-header" style="padding: 15px"><h1>장바구니 목록</h1></div>
    <div>
      <button class="btn btn-primary float-right"
              @click="cartClear">장바구니 비우기</button>
      <button class="btn btn-secondary float-right"
              @click="placeOrder">주문하기</button>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th>제품 id</th>
        <th>제품명</th>
        <th>주문수량</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in getCartItems" :key="item.id">
        <td>{{ item.itemId }}</td>
        <td>{{ item.itemName }}</td>
        <td>{{ item.quantity }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
</style>

<style scoped>

</style>