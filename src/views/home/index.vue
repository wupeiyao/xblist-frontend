<script setup lang="ts">

import baseImageUrl from '@/utils/avatar'
import useUserStore from '@/stores/modules/user'
import { getTime } from '@/utils/time'
import { useRoute, useRouter } from 'vue-router'
import router from '@/router'

const userStore = useUserStore()
const $router = useRouter();
//获取路由对向
const $route = useRoute();
// 退出登录点击回调
const logout = async () => {
  try {
    // 第一件事情: 向服务器发请求 [退出登录接口]
    await userStore.userLogout();
    // 第二件事情: 仓库当中关于用户的相关数据清空 [token | username | avatar]
    // 这一步确保用户信息被清除
    // 第三件事情: 跳转到登录页面
    await $router.push({path: '/login', query: {redirect: $route.path}});
  } catch (error) {
    console.error('Logout failed:', error);

    // 处理错误，例如显示错误消息
  }
};

</script>

<template>
  <div class="home_page">
    <div class="header">
      <div class="header_left">
        <!--头像-->
        <div style="padding: 10px 9px  0  10px" @click="router.push('/usercenter')">
          <van-image
            round
            width="2.6rem"
            height="2.6rem"
            :src="baseImageUrl"
            fit="cover" />
        </div>
        <!--  用户名-->
        <div>
          <p style="margin: 13px 0 0 0">{{ userStore.username }}</p>
          <p   style="margin: 4px 0 0 0" class="subtitle">小白清单</p>
        </div>
      </div>
      <!-- <div style="margin: 14px 13px 0 0 "><van-icon name="wap-nav" size="24px"  /></div> -->
    </div>
    <div class="info">
      <router-view></router-view>
    </div>
    <div class="tabbar">
      <van-tabbar route active-color="#1ec8ff">
        <van-tabbar-item replace to="/home/everyday" icon="smile">每天</van-tabbar-item>
        <van-tabbar-item replace to="/home/notes" icon="notes">重要</van-tabbar-item>
        <van-tabbar-item replace to="/home/task" icon="todo-list">任务</van-tabbar-item>
        <van-tabbar-item replace to="/home/setting" icon="setting">设置</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<style scoped>
.home_page {
  width: 100%;
  height: 100%;
}

.info {
  padding-top: 8.4vh; /* 为 header 留出空间 */
  padding-bottom: 8vh; /* 为 tabbar 留出空间 */
  overflow-y: auto; /* 启用滚动 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 18.4vh); /* 确保背景图片至少覆盖整个视口 */

  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.header {
  position: fixed; /* 固定在页面顶部 */
  top: 0;
  left: 0;
  width: 100vw;
  height: 8.4vh;
  display: flex;
  justify-content: space-between;
  background-color: rgb(246, 246, 246);
  z-index: 99; /* 确保 header 位于页面最上层 */
}

.tabbar {
  height: 10%;
}

.header_left {

  display: flex;
}

.subtitle {
  font-style: italic;
  color: skyblue;
  font-size: 12px;
}
</style>
