<script>
import ItemListCompo from "@/components/list/ItemListCompo.vue";

export default {
  name: "ItemListManage",
  components: {ItemListCompo},
}

</script>

<template>
  <ItemListCompo
      :isAdmin="true"
      page-title="상품관리"

  />

</template>

