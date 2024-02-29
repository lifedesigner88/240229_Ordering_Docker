import OrderList from "@/views/list/OrderList.vue"
import OrderCart from "@/views/OrderCart.vue";


export default [
    {
        path: '/orders',
        name: 'OrderList',
        component: OrderList,
    },
    {
        path: '/ordercart',
        name: 'OrderCart',
        component: OrderCart,
    },
]