import {createRouter, createWebHistory} from 'vue-router';
import '@/assets/css/bootstrap.min.css';
import LoginCompo from "@/views/LoginCompo.vue";
import memberRouter from "@/router/memberRouter.js";
import itemRouter from "@/router/itemRouter";
import orderRouter from "@/router/orderRouter";
import ItemList from "@/views/list/ItemList.vue";
import BasicCompo from "@/components/BasicCompo.vue";


const routes = [
    {
        path: '/',               // url 경로 지정
        name: 'ItemList',           // 이 라우터 이름
        component: ItemList
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginCompo,
    },
    {
        path: '/basic',
        name: 'BasicCompo',
        component: BasicCompo,
    },


    // 스프레드 연산자로 불리고, 주로 배열 요소를 다른 배열 요소에 합할때 사용.
    ...memberRouter,
    ...orderRouter,
    ...itemRouter,

];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
