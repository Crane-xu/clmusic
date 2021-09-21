<template>
  <div class="playController">
    <div v-show="!show" class="left" @click="show = !show">
      <img :src="playlist[playCurrentIndex].al.picUrl" />
      <div class="content">
        <div class="title">{{ playlist[playCurrentIndex].name }}</div>
        <div class="tips">横划可以切换上下首哦</div>
      </div>
    </div>
    <div v-show="!show" class="right">
      <svg v-if="paused" class="icon bofang" aria-hidden="true" @click="play">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg v-else class="icon bofang" aria-hidden="true" @click="play">
        <use xlink:href="#icon-icon_bofang"></use>
      </svg>

      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofangliebiao"></use>
      </svg>
    </div>
    <play-music
      @back="show = !show"
      v-show="show"
      :play="play"
      :paused="paused"
      :playDetail="playlist[playCurrentIndex]"
    ></play-music>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`"
    ></audio>
  </div>
</template>

<script>
import { mapState } from "vuex";
import playMusic from "@/components/playMusic.vue";

export default {
  data() {
    return {
      paused: true,
      show: false,
    };
  },
  computed: {
    ...mapState(["playlist", "playCurrentIndex"]),
  },
  mounted() {
    this.$store.dispatch("reqLyric", {
      id: this.playlist[this.playCurrentIndex].id,
    });
  },
  updated() {
    // this.UpdateTime();
    this.$store.dispatch("reqLyric", {
      id: this.playlist[this.playCurrentIndex].id,
    });
  },
  methods: {
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.paused = false;
        this.UpdateTime();
      } else {
        this.$refs.audio.pause();
        this.paused = true;
        clearInterval(this.$store.state.id);
      }
    },
    UpdateTime() {
     if(this.$refs.audio.currentTime===null)return;
     this.$store.state.id = setInterval(() => {
        this.$store.commit("setCurrentTime", this.$refs.audio.currentTime);
     }, 1500);
    },
  },
  components: {
    playMusic,
  },
};
</script>

<style lang="less">
.playController {
  width: 7.5rem;
  height: 1.2rem;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #ccc;
  .left {
    display: flex;
    padding: 0 0.2rem;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.4rem;
    }
    .content {
      display: inline-block;
      padding: 0 0.2rem;
      .tips {
        font-size: 0.2rem;
        color: #999;
      }
    }
  }
  .right {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    .icon {
      width: 0.55rem;
      height: 0.55rem;
      margin: 0 0.2rem;
    }
    .bofang {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>