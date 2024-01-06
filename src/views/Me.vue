<template>
  <div class="person-page">
    <img
      class="person-bg"
      :src="$store.state.user.userDetail.profile.backgroundUrl"
    />
    <div class="person-top">
      <svg class="icon" aria-hidden="true" @click="$router.push('/')">
        <use xlink:href="#icon-arrowLeft"></use>
      </svg>
      <marquee behavior="scroll" direction="left">{{
        $store.state.user.userDetail.profile.nickname
      }}</marquee>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gengduo"></use>
      </svg>
    </div>
    <div class="person-center">
      <div class="center-left">
        <img
          v-if="$store.state.user"
          :src="$store.state.user.userDetail.profile.avatarUrl"
        />
        <p class="signature">
          {{ $store.state.user.userDetail.profile.signature }}
        </p>
      </div>
      <div class="center-right">
        <div class="crtop">
          <div class="flw">
            <span class="num">{{
              $store.state.user.userDetail.profile.followeds
            }}</span
            ><span class="text">粉丝</span>
          </div>
          <div class="flw">
            <span class="num">{{
              $store.state.user.userDetail.profile.follows
            }}</span
            ><span class="text">关注</span>
          </div>
          <div class="flw">
            <span class="num">Lv.{{ $store.state.user.userDetail.level }}</span
            ><span class="text">等级</span>
          </div>
        </div>
        <button class="btn">编辑信息</button>
      </div>
    </div>
    <div class="content">
      <button class="btn" @click="Logout()">退出登录</button>
      <!-- <span>主页</span><span>动态</span><span>播客</span> -->
    </div>
  </div>
</template>

<script>
import { userLogout } from "@/api/index";
export default {
  methods: {
    async Logout() {
      let res = await userLogout();
      if (res) {
        alert("退出登录成功");
        localStorage.clear();
      }
      window.location.href = "http://localhost:8080/";
    },
  },
  mounted() {
    console.log(this.$store.state.user.userDetail);
  },
};
</script>

<style lang="less">
.person-page {
  width: 7.5rem;
  height: auto;
  padding: 0 0.4rem;
  .person-bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 7.5rem;
    height: 5.6rem;
    z-index: -1;
  }
  .person-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 0.36rem;
    font-weight: 560;
    margin-top: 0.3rem;
    .icon {
      fill: whitesmoke;
      width: 0.65rem;
      height: 0.65rem;
    }
    .marquee {
      width: 5rem;
    }
  }
  .person-center {
    display: flex;
    margin-top: 3rem;
    //   background-color: #fff;
    z-index: 1;
    .center-left {
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 1.5rem;
      }
      .signature {
        margin-top: 0.2rem;
        color: #666;
      }
    }
    .center-right {
      display: flex;
      flex-direction: column;
      .crtop {
        display: flex;
        flex: 1;
        width: 5rem;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.7rem;
        .flw {
          display: flex;
          flex-direction: column;
          text-align: center;
          .num {
            font-weight: 700;
            color: #111;
          }
          .text {
            color: #666;
          }
        }
      }
      .btn {
        width: 5rem;
        height: 0.7rem;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 0.7rem;
      }
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 18px 60px 124px #fff;
    background-color: #fff;
    height: 8rem;
    .btn {
      width: 3rem;
      height: 0.7rem;
      color: #d43c33;
      margin-top: 1rem;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 0.7rem;
    }
  }
}
</style>