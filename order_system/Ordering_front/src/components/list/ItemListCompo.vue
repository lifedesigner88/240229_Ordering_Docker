<script>
import axios from "axios";
import {mapActions} from "vuex";

const TOKEN = localStorage.getItem("token");
const headers = TOKEN ? {Authorization: `Bearer ${TOKEN}`} : {};

export default {
  props: {
    isAdmin: Boolean,
    pageTitle: String,
  },

  data() {
    return {
      itemList: [],
      pageSize: 10,
      currentPage: 0,
      searchType: "name",
      searchValue: ``,
      isLastPage: false,
      isLoading: false,
      quantity: 0,
      selectedItems: Object,

    }
  },
  methods: {
    ...mapActions(['addToCart']),

    addCart() {
      const cartedItems = Object.keys(this.selectedItems)
          .filter(key => this.selectedItems[key] === true)
          .map(key => {
            const item = this.itemList.find(item => item.id === parseInt(key))
            return {
              itemId: item.id,
              itemName: item.name,
              quantity: item.quantity
            }
          });
      // 뮤테이션 직접 호출 방식
      // cartedItems.forEach(item => this.$store.commit('addToCart', item));
      // 액션 호출 방식
      cartedItems.forEach(item => this.$store.dispatch('addToCart', item));
      this.selectedItems = [];
      window.location.reload();
    },


    async deleteItem(deleteItemId) {
      if (confirm("정말로 삭제하시겠습니까?")) {
        try {
          await axios.delete(
              `${process.env.VUE_APP_API_BASE_URL}/item/${deleteItemId}/delete`,
              {headers})
          window.location.reload()
        } catch (e) {
          console.log(e)
        }
      }
    },

    async placeOrder() {

      const seleted = this.getSelectedItems()
      if (seleted.length === 0) {
        alert("선택사항이 없습니다")
        return
      }

      if (!confirm(`${seleted.length}개의 상품을 주문하시겠습니까?`)) {
        alert("주문이 취소되었습니다.")
        return;
      }

      try {
        await axios.post(
            `${process.env.VUE_APP_API_BASE_URL}/order/create`,
            seleted,
            {headers}
        );
        alert("주문이 완료되었습니다");
        window.location.reload();
      } catch (e) {
        console.log(e);
        alert("주문이 실패되었습니다.");
      }
    },
    getSelectedItems() {
      return Object.keys(this.selectedItems)
          .filter(key => this.selectedItems[key] === true)
          .map(key => {
            const item = this.itemList.find(item => item.id === parseInt(key))
            return {itemId: item.id, quantity: item.quantity}
          })
    },

    async loadItems() {
      try {
        this.isLoading = true;
        const params = {
          page: this.currentPage,
          size: this.pageSize,
          [this.searchType]: this.searchValue,
        }
        console.log(this.isLastPage);
        const res = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/items`, {params});
        const addItemList = res.data.map(item => ({...item, quantity: 1}));

        if (addItemList.length < this.pageSize) {
          this.isLastPage = true;
        }

        this.itemList = [...this.itemList, ...addItemList];
      } catch (e) {
        console.log(e);
      }
      this.isLoading = false;
    },

    serarchItems() {
      console.log("클리어")
      this.itemList = [];
      this.currentPage = 0;
      this.isLastPage = false;
      this.loadItems();
    },

    getImage(id) {
      return `${process.env.VUE_APP_API_BASE_URL}/item/${id}/image`;
    },

    scrollPagination() {
      // innerHeight : 브라우저 창의 내부톺이를 픽셀단위로 변환
      // offsetHeight : 전체 브라우저 창의 높이
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;

      if (nearBottom && !this.isLastPage && !this.isLoading) {
        this.currentPage++;
        this.loadItems();
      }
    },

  },

  created() {
    this.loadItems();
  },

  mounted() {
    window.addEventListener('scroll', this.scrollPagination);
  },
}
</script>


<template>
  <div class="container">
    <div class="float-right">
      <button v-if="!isAdmin" class="btn" style="margin: 10px" type="submit" @click="addCart"> 장바구니</button>
      <button v-if="!isAdmin" class="btn" style="margin: 10px" type="submit" @click="placeOrder"> 주문하기</button>
      <button v-if="isAdmin" class="btn" style="margin: 10px" type="submit"
              @click="$router.push('/item/create')">상품등록
      </button>
    </div>

    <div class="page-header" style="padding: 15px">
      <h1>{{ pageTitle }}</h1>

      <div class="d-flex justify-content-between float-left" style="margin-top:20px">
        <form style="display: flex; padding : 10px" @submit.prevent="serarchItems">
          <select v-model="searchType"
                  class="form-control"
                  style="display: inline-block;
                  width: auto;
                  margin-right: 5px">
            <option value="option">선택</option>
            <option value="name">상품명</option>
            <option value="category">카테고리</option>
          </select>
          <input v-model="searchValue" class="form-control" placeholder="텍스트 입력" type="text"/>
          <button class="btn" style="margin-left: 5px" type="submit"> 검색</button>
        </form>
      </div>


      <table class="table">
        <thead>
        <tr>
          <th>id</th>
          <th v-if="!isAdmin"></th>
          <th>제품사진</th>
          <th>제품명</th>
          <th>카테고리</th>
          <th>가격</th>
          <th>재고수량</th>
          <th v-if="!isAdmin">주문수량</th>
          <th v-if="isAdmin">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in itemList" :key="item.id">
          <td>{{ item.id }}</td>
          <td v-if="!isAdmin">
            <input
                :id="`check${item.id}`"
                v-model="selectedItems[item.id]"
                class="form-check"
                type="checkbox">
          </td>
          <td>
            <label :for="`check${item.id}`">
              <img :src="getImage(item.id)" alt="상품이미지" style="height:100px; width:100px">
            </label>
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.stockQuantity }}</td>
          <td v-if="!isAdmin">
            <input v-model="item.quantity"
                   class="form-control" min="1"
                   style="width:70px; text-align: center"
                   type="number"/></td>

          <td v-if="isAdmin">
            <button class="btn btn-secondary" @click="deleteItem(item.id)">삭제</button>
          </td>

        </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<style scoped>

</style>

<!--
[
  {
    "id": 1,
    "name": "apple",
    "category": "과일",
    "price": 10000,
    "stockQuantity": 1323827190,
    "imagePath": "C:\\Users\\Playdata\\IdeaProjects\\Ordering\\src\\main\\resources\\temp\\1_apple.jpg"
  },
]
-->
