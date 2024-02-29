<template>
  <HeaderCompo/>
  <div>
    <router-view/>
  </div>
  <FooterCompo/>
</template>

<script>
// import HomeComponent from "./components/HomeCompo.vue"; // 절대경로
// import HomeComponent from "@/components/HomeCompo.vue"; // 상대경로 main.js 기준
import HeaderCompo from "@/components/HeaderCompo.vue";
import FooterCompo from "@/components/FooterCompo.vue";

export default {
  components:{
    // HomeComponent,
    HeaderCompo,
    FooterCompo
  }
}
</script>
