<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, onMounted } from 'vue';

const router = useRouter();
const checked = ref(false);  // 默认关闭

// 从localStorage读取用户的偏好
onMounted(() => {
  const darkMode = localStorage.getItem('darkMode');
  if (darkMode === 'true') {
    checked.value = true;
    document.body.classList.add('dark');
  } else {
    checked.value = false;
    document.body.classList.remove('dark');
  }
});

// 监听暗黑模式开关状态的变化
watch(checked, (newValue) => {
  if (newValue) {
    // 启用暗黑模式
    document.body.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
  } else {
    // 禁用暗黑模式
    document.body.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  }
});

const goBack = () => {
  router.back();
};

const onNavigate = (path: string) => {
  router.push({ name: path });
};

const toUserCenter = () => {
  router.push('/usercenter');
};

const helpAuthor = () => {
  router.push('/subscribe');
};

const toTaskSetting = () => {
  router.push('/tasksetting');
};

const toRegularSetting = () => {
  router.push('/regularsetting');
};

const toChangePassword = () => {
  router.push('/changepassword');
};

const toAbout = () => {
  router.push('/about');
};

import useUserStore from '@/stores/modules/user'
import { showSuccessToast } from 'vant'

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
    showSuccessToast('退出账号成功');
  } catch (error) {
    console.error('Logout failed:', error);

    // 处理错误，例如显示错误消息
  }
};
</script>

<template>
  <div class="settings-container">
    <header class="header">
      <h1>设置</h1>
    </header>

    <van-cell-group>
      <van-cell title="账号资料" is-link @click="toUserCenter" />
      <van-cell title="任务设置" is-link @click="toTaskSetting" />
      <!-- <van-cell center title="暗黑模式">
        <template #right-icon>
          <van-switch v-model="checked" />
        </template>
      </van-cell> -->
      <van-cell title="任务定期设置" is-link @click="toRegularSetting" />
      <van-cell title="修改密码" is-link @click="toChangePassword" />
      <van-cell title="关于" is-link @click="toAbout" />
      <!-- <van-cell title="拯救作者✧٩(ˊωˋ*)و✧" is-link @click="helpAuthor" /> -->
    </van-cell-group>
    <div style="margin-top: 15px ;width: 100%" class="van-button">
      <van-button plain hairline type="default" block @click="logout">退出登录</van-button>
    </div>

  </div>
</template>

<style scoped>
.settings-container {
  font-family: Arial, sans-serif;
}



.header {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.header h1 {
  flex: 1;
  text-align: center;
  font-size: 18px;
  margin: 0;
}

/* 针对按钮的普通样式 */
.van-button {
  transition: background-color 0.2s;
}



/* 按下按钮时的样式 */
.van-button:active {
  background-color: rgba(0, 0, 0, 0.1); /* 更深的颜色 */
}


.divider {
  height: 10px;
  background-color: #f5f5f5;
  margin: 5px 0;
}

/* 暗黑模式下的全局样式 */
body.dark {
  background-color: #121212;
  color: #e0e0e0;
}

body.dark .settings-container {
  background-color: #1e1e1e;
}

body.dark .header {
  background-color: #333;
  border-bottom: 1px solid #555;
}

body.dark .van-cell {
  background-color: #222;
  color: #e0e0e0;
}

body.dark .van-cell:active {
  background-color: #444;
}
</style>
