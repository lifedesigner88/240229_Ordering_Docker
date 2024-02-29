import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index.js";
import axios from "axios";
import store from "./store/cart.js";


// 401응답의 경우 interceptor를 통해 공통적으로 토큰 제거 후 로그아웃 처리
axios.interceptors.response.use(
    response => response,
    error => {
        if(error.response
            && error.response.status === 401) {
            localStorage.clear();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    })
const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');

