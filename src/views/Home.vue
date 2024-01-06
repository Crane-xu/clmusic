<template>
  <div class="home">
    <top-nav></top-nav>
    <swiper-com></swiper-com>
    <icon-list></icon-list>
    <music-list></music-list>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from "@/components/top-nav.vue";
import SwiperCom from "@/components/swiper-com.vue";
import IconList from "@/components/icon-list.vue";
import MusicList from "@/components/music-list.vue";

export default {
  name: "Home",
  components: {
    TopNav,
    SwiperCom,
    IconList,
    MusicList,
  },
};
</script>

