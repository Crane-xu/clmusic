<template>
  <div class="iconList">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-rili"></use>
      </svg>

      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shouyinji"></use>
      </svg>

      <span>私人FM</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use>
      </svg>

      <span>歌单</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang"></use>
      </svg>

      <span>排行榜</span>
    </div>
  </div>
</template>

<style lang="less">
.iconList{
    width: 7.5rem;
    display: flex;
    justify-content: space-between;
    padding: 0.4rem;
    .iconItem{
        display: flex;
        flex-direction: column;
        align-items: center;
         .icon{
        width: 1.2rem;
        height: 1.2rem;
        }
        span{
            font-size: 0.26rem;
        }
    }
}
</style>