<template>
  <div class="top-nav">
    <div class="top-left">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-danlieliebiao"></use>
      </svg>
    </div>
    <div class="top-center">
      <span class="nav-btn" @click="$router.push('/me')">我的</span>
      <span class="nav-btn active">发现</span>
      <span class="nav-btn">云村</span>
      <span class="nav-btn">视频</span>
    </div>
    <div class="top-right" @click="$router.push('/searchview')">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuoxiao"></use>
      </svg>
    </div>
  </div>
</template>

<style lang="less">
.top-nav {
  width: 7.5rem;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem;
  .icon {
    width: 0.5rem;
    height: 0.5rem;
  }
  .top-center {
    width: 5rem;
    display: flex;
    justify-content: space-around;
    .active {
      font-weight: 900;
    }
    span {
      font-size: 0.3rem;
    }
  }
}
</style>