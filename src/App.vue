<template>
  <div>
    <router-view />
    <play-controller></play-controller>
  </div>
</template>

<script>
import playController from "@/components/playController.vue"
export default {
  components:{
    playController
  },
  mounted(){
    if(!localStorage.userData)return;
    let userData = JSON.parse(localStorage.userData);
    this.$store.commit('setUser',userData);
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  overflow-y: scroll;
}
:root {
  overflow-y: auto;
  overflow-x: hidden;
}
:root body {
  position: absolute;
}
body {
  width: 100vw;
  overflow: hidden;
}

.icon {
  width: 0.3rem;
  height: 0.3rem;
}
a {
  color: #333;
  text-decoration: none;
}
</style>
