<script setup lang="ts">
import { showConfirmDialog } from 'vant';
import { useRouter } from 'vue-router';
import { delete7Day, deleteAll, deleteByStatus } from '@/api/tasks';
import useUserStore from '@/stores/modules/user';

const router = useRouter();
const userStore = useUserStore();

const onClickLeftU = () => {
  router.push('/home/setting');
};

const confirmAction = async (message: string, apiCall: Function) => {
  const id = userStore.$state.id;
  if (!id) {
    console.error('用户ID不能为空');
    return;
  }
  try {
    await showConfirmDialog({ message, width: 240 });
    await apiCall();
  } catch {
    console.log('操作已取消');
  }
};

const userConfirmation7 = () =>
  confirmAction('确定清除7天前的任务吗？', () =>
    delete7Day({ userId: userStore.$state.id, typeId: 1 })
  );

const userConfirmation15 = () =>
  confirmAction('确定清除半个月前的任务吗？', () =>
    delete7Day({ userId: userStore.$state.id, typeId: 2 })
  );

const userConfirmation30 = () =>
  confirmAction('确定清除一个月前的任务吗？', () =>
    delete7Day({ userId: userStore.$state.id, typeId: 3 })
  );

const userConfirmationFinish = () =>
  confirmAction('确定清除所有已完成的任务吗？', () =>
    deleteByStatus({ userId: userStore.$state.id, typeId: 1 })
  );

const userConfirmationUnFinish = () =>
  confirmAction('确定清除所有未完成的任务吗？', () =>
    deleteByStatus({ userId: userStore.$state.id, typeId: 0 })
  );

const userConfirmation = () =>
  confirmAction('确定清空所有任务吗？', () =>
    deleteAll({ userId: userStore.$state.id })
  );
</script>

<template>
  <div class="bg">
    <van-nav-bar
      title="任务设置"
      left-text="返回"
      left-arrow
      @click-left="onClickLeftU"
      class="nav-bar"
    />
    <div class="task-settings">
      <van-cell-group>
        <van-cell title="清除7天前的任务" is-link @click="userConfirmation7" />
        <van-cell title="清除半个月前的任务" is-link @click="userConfirmation15" />
        <van-cell title="清除一个月前的任务" is-link @click="userConfirmation30" />
        <van-cell title="清除所有已完成任务" is-link @click="userConfirmationFinish" />
        <van-cell title="清除所有未完成任务" is-link @click="userConfirmationUnFinish" />
        <van-cell title="清空所有任务" is-link @click="userConfirmation" />
      </van-cell-group>
    </div>
  </div>
</template>

<style scoped>
.bg {
  background-color: #f5f7fa; /* 更柔和的背景色 */
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav-bar {
  background-color: #ffffff; /* 主色调 */
  color: white;
}

.task-settings {
  margin: 20px 10px;
  padding: 10px;
  background-color: white;
  border-radius: 12px; /* 添加圆角 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 增加阴影 */
}

.van-cell {
  font-size: 16px;
  color: #333; /* 文本颜色 */
}

.van-cell-title {
  font-weight: bold;
}

.van-cell.is-link {
  --van-cell-hover-background-color: #f2f2f2; /* 设置点击反馈颜色 */
}
</style>
