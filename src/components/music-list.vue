<template>
  <div class="music-list">
    <div class="music-list-top">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="mlist">
      <div class="swiper-container" id="music-swiper">
        <div class="swiper-wrapper">
          <router-link
            :to="{ path: '/listview', query: { id: item.id } }"
            class="swiper-slide"
            v-for="(item, i) in state.musicList"
            :key="i"
          >
            <img :src="item.picUrl" :alt="item.name" />
            <span class="name">{{ item.name }}</span>
            <div class="count">
              <span
                ><svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-play"></use>
                </svg>
              </span>
              <span>{{ changeValue(item.playCount) }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "swiper/css/swiper.css";
import Swiper from "swiper";
import { getMusicList } from "@/api/index";
import { reactive, onMounted, onUpdated } from "vue";

export default {
  setup() {
    let state = reactive({ musicList: [] });
    function changeValue(num) {
      let res = 0;
      if (num >= 100000000) {
        res = num / 100000000;
        res = res.toFixed(2) + "亿";
      } else if (num > 10000) {
        res = num / 10000;
        res = res.toFixed(2) + "万";
      }
      return res;
    }
    onMounted(async () => {
      let result = await getMusicList();
      state.musicList = result.data.result;
    });
    onUpdated(() => {
      var swiper = new Swiper("#music-swiper", {
        slidesPerView: 3,
        spaceBetween: 10,
      });
    });
    return {
      state,
      changeValue,
    };
  },
};
//vue 2 写法 上为3写法
/*export default {
  data() {
    return {
      musicList: [],
    };
  },
  methods:{
      changeValue(num){
          let res = 0;
          if(num>=100000000){
              res = num/100000000;
              res = res.toFixed(2) + '亿';
          }else if(num>10000){
               res = num/10000;
              res = res.toFixed(2) + '万';
          }
          return res;
      }
  },
  async mounted() {
    let result = await getMusicList();
    this.musicList = result.data.result;
  },
  updated() {
    var swiper = new Swiper("#music-swiper", {
      slidesPerView: 3,
      spaceBetween: 10,
    });
  },
};*/
</script>

<style lang="less">
.music-list {
  width: 7.5rem;
  padding: 0 0.4rem;
  .music-list-top {
    display: flex;
    justify-content: space-between;
    height: 1rem;
    align-items: center;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      border-radius: 0.2rem;
      font-size: 0.24rem;
      height: 0.5rem;
      width: 1.2rem;
      text-align: center;
      line-height: 0.5rem;
    }
  }
  .mlist {
    .swiper-container {
      width: 100%;
      height: 3rem;
      z-index: 0;
      .swiper-slide {
        display: flex;
        flex-direction: column;
        position: relative;
        img {
          width: 100%;
          height: auto;
          border-radius: 0.1rem;
        }
        .name {
          height: 0.6rem;
          width: 100%;
          font-size: 0.2rem;
          line-height: 0.3rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .count {
          position: absolute;
          right: 0.1rem;
          top: 0.1rem;
          font-size: 0.24rem;
          color: #ccc;
          display: flex;
          align-items: center;
          .icon {
            /* 设置svg颜色 fill */
            fill: #ccc;
          }
        }
      }
    }
  }
}
</style>