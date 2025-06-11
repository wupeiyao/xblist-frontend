<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { getUserTaskSetting, saveUserTaskSetting } from '@/api/tasks';
import useUserStore from '@/stores/modules/user';

const checked1 = ref(false);  // 默认关闭
const checked2 = ref(false);  // 默认关闭
const checked3 = ref(false);  // 默认关闭

const userStore = useUserStore();
const router = useRouter();

const onClickLeftU = () => {
  router.push('/home/setting');
};

const getTaskSettings = async () => {
  try {
    const result = await getUserTaskSetting({
      userId: userStore.$state.id,
    });
    const settings = result.data;
    checked1.value = settings.setting1 === 1;
    checked2.value = settings.setting2 === 1;
    checked3.value = settings.setting3 === 1;
  } catch (error) {
    console.error('获取任务设置失败', error);
    alert('获取任务设置失败');
  }
};

onMounted(() => {
  getTaskSettings();
});

const saveSettings = async () => {
  const id = userStore.$state.id;
  if (id === null) {
    console.error('用户ID不能为空');
    return;
  }
  const settings = {
    setting1: checked1.value ? 1 : 0,
    setting2: checked2.value ? 1 : 0,
    setting3: checked3.value ? 1 : 0,
    userId: id,
  };

  try {
    await saveUserTaskSetting(settings);
    console.log('设置保存成功');
  } catch (error) {
    console.error('保存设置失败', error);
  }
};

const onSwitchChange = () => {
  saveSettings();
};
</script>

<template>
  <div class="bg">
    <van-nav-bar
      title="任务定时设置"
      left-text="返回"
      left-arrow
      @click-left="onClickLeftU"
      class="nav-bar"
    />
    <div class="settings-container">
      <van-cell center title="每天凌晨4点自动清除未完成任务">
        <template #right-icon>
          <van-switch v-model="checked1" @change="onSwitchChange" />
        </template>
      </van-cell>
      <van-cell center title="每天凌晨4点自动清除已完成任务">
        <template #right-icon>
          <van-switch v-model="checked2" @change="onSwitchChange" />
        </template>
      </van-cell>
      <van-cell center title="每天凌晨4点自动清除所有任务">
        <template #right-icon>
          <van-switch v-model="checked3" @change="onSwitchChange" />
        </template>
      </van-cell>
    </div>
  </div>
</template>

<style scoped>
.bg {
  background-color: #f7f8fa; /* 更柔和的背景色 */
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav-bar {
  background-color: #ffffff; /* 主色调 */
  color: white;
}

.settings-container {
  margin: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 增加阴影 */
  padding: 15px;
}

.van-cell {
  font-size: 16px;
  color: #333; /* 文字颜色 */
  padding: 10px 0;
}

.van-cell-title {
  font-weight: bold;
}

.van-switch {
  --van-switch-on-color: #4cd964; /* 开关打开时的颜色 */
  --van-switch-off-color: #cccccc; /* 关闭时的颜色 */
}

.van-cell.is-link {
  --van-cell-hover-background-color: #f2f2f2; /* 设置点击反馈颜色 */
}
</style>
