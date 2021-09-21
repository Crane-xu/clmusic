<template>
  <div class="playMusic">
    <div
      class="bg"
      :style="{ backgroundImage: `url(${playDetail.al.picUrl})` }"
    ></div>
    <div class="playTop">
      <div class="back" @click="$emit('back')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-arrowLeft"></use>
        </svg>
      </div>
      <div class="center">
        <marquee behavior="scroll" direction="left">{{
          playDetail.name
        }}</marquee>
        <div class="auther">{{ playDetail.ar[0].name }}</div>
      </div>
      <div class="share">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div class="playContent" v-show="!isLyric">
      <img class="needle" :class="{ndle_active:!paused}" id="needle" src="@\assets\img\needle-ab.png" @click="play"/>
      <img class="disc" src="@\assets\img\disc.png" @click="isLyric = !isLyric"/>
      <img class="playImg" :class="{img_active:!paused}" id="playImg" :src="playDetail.al.picUrl" @click="isLyric = !isLyric"/>
    </div>
    <div class="playLyric" v-show="isLyric" ref="playLyric" @click="isLyric = !isLyric">
      <p :class="{plrc_active:(currentTime*1000>=item.pre&&currentTime*1000<item.time)}" v-for="(item,i) in $store.getters.lyricList" :key="i">{{ item.lyric }}</p>
    </div>
    <div class="progress"></div>
    <div class="playFooter"> 
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>

      <svg v-if="paused" class="icon bofang" aria-hidden="true" @click="play">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg v-else class="icon bofang" aria-hidden="true" @click="play">
        <use xlink:href="#icon-icon_bofang"></use>
      </svg>

      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofangliebiao"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["playDetail", "paused", "play"],
  data(){
    return{
      isLyric:false,
    }
  },
  computed:{
    ...mapState(['lyric','currentTime','playlist','playCurrentIndex']),
  },
  watch: {
    currentTime:function(){
      let p = document.querySelector('.plrc_active');
      if(!p)return;
      this.$refs.playLyric.scrollTop = p.offsetTop;
    }
  },
  methods:{
    goPlay(num){
      let index = this.playCurrentIndex+num;
      if(index<0){
        index = this.playlist.length-1;
      }else if(index==this.playlist.length){
        index=0;
      }
      this.$store.commit('setPlayIndex',index);
    }
  },
};
</script>

<style lang="less">
.playMusic {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgb(172, 172, 172);
  z-index: 2;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-size: auto 100%;
    background-position: center;
    filter: blur(60px);
  }
  .playTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 7.5rem;
    height: 1.2rem;
    position: absolute;
    left: 0;
    top: 0;
    color: #fff;
    padding: 0 0.4rem;
    .icon {
      fill: #fff;
      width: 0.5rem;
      height: 0.5rem;
    }
    marquee {
      width: 4rem;
    }
  }
  .playContent {
    position: absolute;
    width: 7.5rem;
    height: 7.5rem;
    left: 0;
    top: 1.5rem;
    .needle {
      width: 2rem;
      height: auto;
      position: absolute;
      top: 1rem;
      left: 4.6rem;
      transform-origin: 0.18rem 0;
      transform: rotate(-10deg);
      transition: all 1s;
      z-index: 10;
    }
    .ndle_active {
      transform: rotate(10deg);
    }
    .disc {
      width: 5.5rem;
      height: auto;
      position: absolute;
      left: calc(50% - 2.75rem);
      top: 2.2rem;
    }
    .playImg {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 2.5rem;
      position: absolute;
      left: calc(50% - 1.74rem);
      top: 3.22rem;
    }
    .img_active {
      animation: Spin 10s linear infinite;
    }
    @keyframes Spin {
      0% {
        transform: rotate(0deg);
      }
      10% {
        transform: rotate(36deg);
      }
      20% {
        transform: rotate(72deg);
      }
      30% {
        transform: rotate(108deg);
      }
      40% {
        transform: rotate(144deg);
      }
      50% {
        transform: rotate(180deg);
      }
      60% {
        transform: rotate(216deg);
      }
      70% {
        transform: rotate(252deg);
      }
      80% {
        transform: rotate(288deg);
      }
      90% {
        transform: rotate(324deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
  .playLyric{
    position: absolute;
    width: 7.5rem;
    height: 8rem;
    left: 0;
    top: 2rem;
    color: #bbb;
    overflow: scroll;
    text-align: center;
    padding: 0.2rem 0;
    .plrc_active{
      color: #dff;
    }
    p{
      height: 0.4rem;
      margin-top: 0.3rem;
    }
  }
  .playFooter {
    width: 7.5rem;
    height: 1.5rem;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.4rem;
    .icon {
      fill: #fff;
      width: 0.5rem;
      height: 0.5rem;
    }
    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>