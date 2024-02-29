<script>
import axios from "axios";

const TOKEN = localStorage.getItem("token");
const headers = TOKEN ? {Authorization: `Bearer ${TOKEN}`} : {};

export default {
  data() {
    return {
      name: "",
      category: "",
      price: 0,
      stockQuantity: 0,
      itemImage: null,
    }
  },


  methods: {
    async fileUpload(event) {
      // 이벤트가 발생한 DOM요소를 가리키는 객체
      this.itemImage = event.target.files[0]
      const registerData = new FormData()

      registerData.append("name", this.name)
      registerData.append("category", this.category)
      registerData.append("price", this.price)
      registerData.append("stockQuantity", this.stockQuantity)
      registerData.append("itemImage", this.itemImage)

      try {
        await axios.post(
            `${process.env.VUE_APP_API_BASE_URL}/item/create`,
            registerData,
            {headers}
        );
        this.$router.push("/items/manage");
      } catch (e) {
        console.log(e)
        alert("입력값 확인 필요")
      }
    }
  }



}
</script>

<template>
  <div class="container">
    <div class="page-header" style="padding: 15px"><h1>상품 등록</h1></div>

    <form class="form-group" style="padding: 15px" >
      <label class="form-control" for="name" style="padding: 15px">이름 :
        <input id="name" v-model="name" class="form-control" type="text">
      </label>

      <label class="form-control" for="category" style="padding: 15px">분류 :
        <input id="category" v-model="category" class="form-control" type="text">
      </label>

      <label class="form-control" for="price" style="padding: 15px">가격 :
        <input id="price" v-model="price" class="form-control" type="text">
      </label>

      <label class="form-control" for="stockQuantity" style="padding: 15px">재고 :
        <input id="stockQuantity" v-model="stockQuantity" class="form-control" type="text">
      </label>

      <label class="form-control" for="itemImage" style="padding: 15px">이미지 :
        <input id="itemImage" accept="image/*" class="form-control" type="file" @change="fileUpload">
      </label>
    </form>
  </div>
</template>

<style>

</style>