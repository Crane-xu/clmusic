<template>
  <div class="listview">
    <listview-top :playlist="state.playlist"></listview-top>
    <play-list :playlist="state.playlist"></play-list>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import store from "@/store/index.js";
import { getPlayListDetail } from "@/api/index";
import PlayList from "@/components/playList.vue";
import ListViewTop from "@/components/list-view-top.vue";

export default {
  setup() {
    const route = useRoute();
    let state = reactive({
      list: [],
      playlist: {
        creator: {},
        tracks: [],
      },
    });
    onMounted(async () => {
      let id = route.query.id;
      let result = await getPlayListDetail(id);
      state.playlist = result.data.playlist;
      // console.log(state);
      store.commit("setPlaylist", state.playlist.tracks);
    });
    return {
      state,
    };
  },
  components: {
    PlayList,
    ListViewTop,
  },
};
</script>
