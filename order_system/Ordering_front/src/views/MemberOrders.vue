<script>
import OrderListCompo from "@/components/list/OrderListCompo.vue";
export default {
  props: ['id'],
  components:{
    OrderListCompo
  }
}
</script>

<template>
  <OrderListCompo
      :is-admin="true"
      :api-url="`/member/${id}/orders`"
  />
</template>