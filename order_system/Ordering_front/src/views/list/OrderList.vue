<script>
import OrderListCompo from "@/components/list/OrderListCompo.vue";
export default {
  components:{
    OrderListCompo
  }
}


</script>

<template>
<OrderListCompo
    :isAdmin="true"
    api-url="/orders"
/>
</template>

<style>

</style>



































