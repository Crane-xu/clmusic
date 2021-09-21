<template>
  <div class="searchTop">
    <div class="searchTopNav">
      <div class="left" @click="$router.go(-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-arrowLeft"></use>
        </svg>
      </div>
      <div class="right">
        <input
          type="text"
          v-model="searchKeyWord"
          :placeholder="placeholder"
          @keydown.enter="saveKeyWord"
        />
      </div>
    </div>
    <div class="history" v-show="searchSongs.length==0">
      <div class="historyLeft">历史</div>
      <div class="historyRight">
        <div @click="historySearch(item)" class="keywordItem" v-for="(item, i) in keywordList" :key="i">
          {{ item }}
        </div>
      </div>
    </div>
    <div class="playlist" v-show="searchSongs.length!==0">
      <div class="playlist-top">
        <div class="left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <div class="text">
            <div class="title">播放全部</div>
            <div class="num">(共{{ searchSongs.length }}首)</div>
          </div>
        </div>
      </div>
      <div class="list">
        <div
          class="playItem"
          v-for="(item, i) in searchSongs"
          :key="i"
          @click="setPlay(item,i)"
        >
          <div class="left">
            <div class="index">{{ i + 1 }}</div>
            <div class="content">
              <div class="title">{{ item.name }}</div>
              <div class="anthor">
                <span>{{ item.artists[0].name }}</span>
                <span v-show="item.album.name">{{ " - "+item.album.name }}</span>
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
  </div>
</template>


<script>
import { searchMusic,getMusicPic } from "@/api/index";

export default {
  data() {
    return {
      placeholder: "陈奕迅",
      keywordList: [],
      searchKeyWord: "",
      searchSongs: [],
    };
  },
  beforeMount() {
    this.keywordList = localStorage.keywordList
      ? JSON.parse(localStorage.keywordList)
      : [];
  },
  methods: {
    saveKeyWord: async function () {
      let kl = this.keywordList;
      kl.push(this.searchKeyWord);
      kl =Array.from(new Set(kl));
      if(kl.length>10){
        kl = kl.slice(kl.length-10,kl.length);
      }
      localStorage.keywordList = JSON.stringify(kl);
      let res = await searchMusic(this.searchKeyWord);
      this.searchSongs = res.data.result.songs;
      // console.log(this.searchSongs);
    },
    historySearch(keyword){
      this.searchKeyWord = keyword;
      this.saveKeyWord();
    },
    setPlay(item,i){
      item.al = item.album;
      item.ar = item.artists;
      getMusicPic(item.id).then(function(fulfilled){
        console.log(fulfilled);
        item.al.picUrl = fulfilled.data.songs[0].al.picUrl;
      },
      function(rejected){
        console.error(rejected);
      });
      this.$store.commit('pushPlaylist',item);
      this.$store.commit('setPlayIndex',this.$store.state.playlist.length-1);
    },
  },
};
</script>


<style lang="less">
.searchTop {
  width: 7.5rem;
  padding: 0 0.4rem;
  .searchTopNav {
    display: flex;
    width: 100%;
    height: 1.2rem;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
    .right {
      padding: 0 0 0 0.4rem;
      flex: 1;
      input {
        border: none;
        outline: none;
        border-bottom: 1px solid #666;
        width: 100%;
        height: 0.5rem;
      }
    }
  }
  .history {
    display: flex;
    .historyLeft {
      width: 1.2rem;
      height: 0.6rem;
      font-weight: 900;
      margin: 0.2rem 0;
      line-height: 0.6rem;
    }
    .historyRight {
      color: #666;
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      .keywordItem {
        background-color: #ddd;
        height: 0.6rem;
        padding: 0 0.2rem;
        border-radius: 0.4rem;
        line-height: 0.6rem;
        margin: 0.2rem 0.1rem;
      }
    }
  }
  .playlist {
    width: 100%;
    // padding: 0 0.4rem;
    background-color: #fff;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    margin-top: 0.3rem;
    padding-bottom: 1.3rem;
    .playlist-top {
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
    }
    .list {
      margin-top: 0.2rem;
      .playItem {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1rem;
        .left {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #666;
          .index{
            font-size: 0.35rem;
            font-weight: 500;
            margin-right: 0.25rem;
          }
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
}
</style>