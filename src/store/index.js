import { createStore } from 'vuex';
import { getLyric, phoneLogin, userDetail } from "@/api/index";

export default createStore({
  state: {
    playlist: [{
      name: '夜晚看见月亮',
      id: 1842135106,
      al: {
        id: 126854786,
        name: "夜晚看见月亮",
        pic: 109951165946343780,
        picUrl: "http://p3.music.126.net/pzPJRUscKVjFZbfj4DWNXA==/109951165946343782.jpg",
        pic_str: "109951165946343782",
      },
      ar: [{
        id: 12270036,
        name: '武昱州',
      }],
    }],
    playCurrentIndex: 0,
    lyric: [],
    currentTime: 0,
    intervalId: 0,
    user: {
      isLogin: false,
      account: {},
      userDetail: {},
    }
  },
  getters: {
    lyricList(state) {
      if (state.lyric == "") return;
      let arr = state.lyric.split(/\n/igs).map((item, i, arr) => {

        let text = item.split("]").pop();
        let min = parseInt(item.split("[").pop());
        let sec = parseInt(item.split(":").pop());
        let mill = parseInt(item.split(".").pop());

        return {
          min, sec, mill,
          lyric: text,
          content: item,
          time: mill + sec * 1000 + min * 60 * 1000
        };
      });

      arr.forEach((item, i) => {
        if (i == 0) item.pre = 0;
        else item.pre = arr[i - 1].time;
      });
      return arr;
    }
  },
  mutations: {
    setPlaylist(state, value) {
      state.playlist = value;
    },
    pushPlaylist(state, value) {
      state.playlist.push(value);
    },
    setPlayIndex(state, value) {
      state.playCurrentIndex = value;
    },
    setLyric(state, value) {
      state.lyric = value;
    },
    setCurrentTime(state, value) {
      state.currentTime = value;
    },
    setUser(state, value) {
      state.user = value;
    },
  },
  actions: {
    async reqLyric(content, payload) {
      let result = await getLyric(payload.id);
      content.commit('setLyric', result.data.lrc.lyric);
    },
    async phoneLogin(content, payload) {
      let result = await phoneLogin(payload.phone, payload.password);
      console.log(result);
      // result.data.code  200登录成功 400不是手机号 502密码错误
      if (result.data.code == 400) {
        alert('手机号错误，请重新输入');
      } else if (result.data.code == 502) {
        alert('密码错误，请重新输入');
      } else
        if (result.data.code == 200) {
          content.state.user.isLogin = true;
          content.state.user.account = result.data.account;
          let _userDetail = await userDetail(result.data.account.id);
          content.state.user.userDetail = _userDetail.data;
          localStorage.userData = JSON.stringify(content.state.user);
          content.commit('setUser', content.state.user);
        }
      return result;
    },
  },
  modules: {
  }
})
