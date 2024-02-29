import ItemList from "@/views/list/ItemList.vue";
import ItemListManage from "@/views/list/ItemListManage.vue";
import ItemCreate from "@/views/create/ItemCreate.vue";

export default [
    {
        path: '/items',
        name: 'ItemListRouter',
        component: ItemList,
    },
    {
        path: '/items/manage',
        name: 'ItemListManageRouter',
        component: ItemListManage,
    },
    {
        path: '/item/create',
        name: 'ItemCreate',
        component: ItemCreate,
    },

]