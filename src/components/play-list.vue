<template>
  <div class="play-list">
    <div class="play-list-top">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <div class="text">
          <div class="title">播放全部</div>
          <div class="num">(共{{ playlist.tracks.length }}首)</div>
        </div>
      </div>
      <div class="btn">+ 收藏({{ changeValue(playlist.subscribedCount) }})</div>
    </div>
    <div class="list">
      <div
        class="play-item"
        v-for="(item, i) in playlist.tracks"
        :key="i"
        @click="setPlayIndex(i)"
      >
        <div class="left">
          <div class="index">{{ i + 1 }}</div>
          <div class="content">
            <div class="title">{{ item.name }}</div>
            <div class="anthor">
              <span>{{ item.ar[0].name }} - </span>
              <span>{{ item.al.name }}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shipinbofangyingpian"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gengduo"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: ["playlist"],
  methods: {
    changeValue(num) {
      let res = 0;
      if (num >= 100000000) {
        res = num / 100000000;
        res = res.toFixed(2) + "亿";
      } else if (num > 10000) {
        res = num / 10000;
        res = res.toFixed(2) + "万";
      } else {
        res = num;
      }
      return res;
    },
    ...mapMutations(["setPlayIndex"]),
  },
};
</script>

<style lang="less">
.play-list {
  width: 7.5rem;
  padding: 0 0.4rem;
  background-color: #fff;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  margin-top: 0.3rem;
  padding-bottom: 1.3rem;
  .play-list-top {
    display: flex;
    justify-content: space-between;
    height: 0.8rem;
    align-items: center;
    .left {
      display: flex;
      .icon {
        width: 0.6rem;
        height: 0.6rem;
      }
      .title {
        font-size: 0.4rem;
        font-weight: 400;
      }
      .num {
        font-size: 0.3rem;
        color: #ccc;
      }
      .text {
        display: flex;
        align-items: center;
      }
    }
    .btn {
      font-size: 0.3rem;
      color: #fff;
      background-color: orangered;
      line-height: 0.5rem;
      padding: 0.1rem;
      border-radius: 0.37rem;
    }
  }
  .list {
    margin-top: 0.2rem;
    .play-item {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1rem;
      .left {
        display: flex;
        align-items: center;
        color: #666;
        .content {
          display: block;
          margin-left: 0.1rem;
        }
        .title {
          font-size: 0.3rem;
          font-weight: 900;
          color: #000;
          margin-bottom: 0.1rem;
        }
        .tag {
          font-size: 0.2rem;
          color: #666;
        }
        .author {
          font-size: 0.2rem;
          color: #666;
        }
      }
      .right {
        position: absolute;
        right: 0;
        .icon {
          height: 0.4rem;
          width: 0.4rem;
          margin: 0 0.2rem;
        }
      }
    }
  }
}
</style>