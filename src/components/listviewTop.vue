<template>
  <div class="listViewTop">
    <img class="bg" :src="playlist.coverImgUrl" />
    <div class="listViewTopNav">
      <div class="left back" @click="$router.go(-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-arrowLeft"></use>
        </svg>
        <div class="title">歌单</div>
      </div>
      <div class="right">
        <svg class="icon search" aria-hidden="true">
          <use xlink:href="#icon-tubiaozhizuomoban-03"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-help"></use>
        </svg>
      </div>
    </div>
  </div>
  <div class="content">
    <div class="contentLeft">
      <img :src="playlist.coverImgUrl" />
      <div class="count">
        <span
          ><svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-play"></use>
          </svg>
        </span>
        <span>{{ changeValue(playlist.playCount) }}</span>
      </div>
    </div>
    <div class="contentRight">
      <h3>{{ playlist.name }}</h3>
      <div class="author">
        <img :src="playlist.creator.avatarUrl" class="header" />
        <span>{{ playlist.creator.nickname }}</span>
      </div>
      <div class="description">
        {{ playlist.description }}
      </div>
    </div>
  </div>
  <div class="iconList">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-pinglun"></use>
      </svg>
      <span>{{ playlist.commentCount }}</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{ playlist.shareCount }}</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-show_duoxuan"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>
</template>


<script>
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
      }
      return res;
    },
  },
};
</script>


<style lang="less">
.listViewTop {
  width: 7.5rem;
  padding: 0 0.4rem;
  .bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 7.5rem;
    height: auto;
    z-index: -1;
    filter: blur(40px);
  }
  .listViewTopNav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.2rem;
    font-size: 0.37rem;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
      fill: #fff;
    }
    .title {
      color: #fff;
      //对里面的元素使用display:inline-block;
      //这样变成了内联块级元素，设置他们的高度和宽度。但是可能会看起来还是不对其。
      //只需要加上 vertical-align:top；就能够水平对齐了。
      display: inline-block;
      vertical-align: top;
      margin-left: 0.4rem;
    }
    .search {
      margin-right: 0.4rem;
    }
  }
  .left .right {
    display: flex;
  }
}

.content {
  width: 7.5rem;
  display: flex;
  justify-content: space-between;
  padding: 0.4rem;
  .contentLeft {
    position: relative;
    img {
      width: 2.8rem;
      height: 2.8rem;
      border-radius: 0.1rem;
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
  .contentRight {
    width: 3.5rem;
    h3 {
      font-size: 0.4rem;
      color: #fff;
    }
    .author {
      display: flex;
      align-items: center;
      margin: 0.2rem 0;
      img.header {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 0.3rem;
        margin-right: 0.2rem;
      }
      span {
        color: #aaa;
        font-size: 0.26rem;
      }
    }
    .description {
      font-size: 0.24rem;
      color: #ccc;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
.iconList {
  display: flex;
  justify-content: space-around;
  .iconItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: 0.7rem;
      height: 0.7rem;
      fill: #fff;
    }
    span {
        color: #fff;
      font-size: 0.3rem;
      padding-top: 0.3rem;
    }
  }
}
</style>