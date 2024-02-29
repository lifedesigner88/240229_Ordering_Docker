<script>
import ItemListCompo from "@/components/list/ItemListCompo.vue";


export default {
  name: "ItemList",
  components: {ItemListCompo},
}
</script>

<template>
  <ItemListCompo
      :isAdmin="false"
      pageTitle="상품목록"
  />
</template>

