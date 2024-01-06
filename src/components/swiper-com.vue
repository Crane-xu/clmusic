<template>
  <div class="swcom">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, i) in imgs" :key="i">
          <img :src="item.pic" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import "swiper/css/swiper.css";
import Swiper from "swiper";
import { getBanner } from "@/api/index";
export default {
  data: function () {
    return {
      imgs: [
        { pic: require("../assets/img/swiper1.jpg") },
        { pic: require("../assets/img/swiper2.jpg") },
        { pic: require("../assets/img/swiper3.jpg") },
      ],
    };
  },
  async mounted() {
    var mySwiper = new Swiper(".swiper-container", {
      //   direction: "vertical", // 垂直切换选项
      loop: true, // 循环模式选项

      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
      },
    });
    let res = await getBanner(1);
    this.imgs = res.data.banners;
  },
};
</script>

<style lang="less">
.swcom {
  width: 7.5rem;
  .swiper-container {
    width: 7.1rem;
    height: 2.6rem;
    border-radius: 0.1rem;
    z-index: 0;
  }
  .swiper-slide img {
    width: 100%;
  }
}
</style>