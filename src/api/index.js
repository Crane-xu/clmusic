import axios from "axios";

let baseUrl = "http://47.100.131.150:3000";

// 获取轮播图 typew为设备机型 1:安卓 2:iphone 3:ipad
export function getBanner(type = 0) {
    return axios.get(`${baseUrl}/banner?type=${type}`);
}

// 获取推荐歌单 limit获取数量
export function getMusicList(limit=10){
    return axios.get(`${baseUrl}/personalized?limit=${limit}`);
}

// 获取歌单详情
export function getPlayListDetail(id){
    return axios.get(`${baseUrl}/playlist/detail?id=${id}`);
}

// 获取歌词
export function getLyric(id){
    return axios.get(`${baseUrl}/lyric/?id=${id}`);
}

// 搜索歌曲
export function searchMusic(keyword){
    return axios.get(`${baseUrl}/search?keywords=${keyword}`);
}

// 获取歌曲图片
export function getMusicPic(id){
    return axios.get(`${baseUrl}/song/detail?ids=${id}`);
}

// 手机登录
export function phoneLogin(phone,password){
    return axios.get(`${baseUrl}/login/cellphone?phone=${phone}&password=${password}`);
}

// 获取用户详情
export function userDetail(uid){
    return axios.get(`${baseUrl}/user/detail?uid=${uid}`);
}

// 退出登录
export function userLogout(){
    return axios.get(`${baseUrl}/logout`);
}