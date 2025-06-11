<script setup lang="ts">
import useUserStore from '@/stores/modules/user';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { showFailToast, showSuccessToast } from 'vant'
import { reqUpdate } from '@/api/user';

import CryptoJS from 'crypto-js';

const userStore = useUserStore();
const router = useRouter();

const onClickLeftU = () => {
  router.push('/home/setting');
};

const password = ref('');
const confirmPassword = ref(''); // 新增确认密码字段

const onSubmit = (values: any) => {
  console.log('submit', values);
};

const changePassword = () => {
  const id = userStore.$state.id;
  if (id === null) {
    console.error('用户ID不能为空');
    return;
  }

  // 密码长度验证
  if (password.value.length < 6) {
    showFailToast({
      message: "密码长度不能小于6位",
      duration: 3000,
    });
    return;
  }

  // 确认密码验证
  if (password.value !== confirmPassword.value) {
    showFailToast({
      message: "两次密码输入不一致",
      duration: 3000,
    });
    return;
  }

  // 使用加密
  const encryptedPassword = CryptoJS.MD5(password.value).toString();
  const updatedData = {
    id: id,
    password: encryptedPassword,
  };

  reqUpdate(updatedData)
    .then(() => {
      showSuccessToast('修改密码成功');
    })
    .catch((error) => {
      console.error('密码修改失败', error);
      showFailToast({
        message: '密码修改失败',
        duration: 3000,
      });
    });
};
</script>

<template>
  <div class="bg">
    <div style="margin-bottom: 10px">
      <van-nav-bar
        title="修改密码"
        left-text="返回"
        left-arrow
        @click-left="onClickLeftU"
      />
    </div>

    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="password"
          type="password"
          name="新密码"
          label="新密码"
          placeholder="请输入新密码"
          clearable
        />
        <van-field
          v-model="confirmPassword"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="请再次输入密码"
          clearable
        />
      </van-cell-group>
      <div class="submit-button">
        <van-button round block type="primary" native-type="submit" @click="changePassword">
          修改密码
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped>
.bg {
  background-color: #f7f8fa; /* 更柔和的背景色 */
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.submit-button {
  margin: 16px;
}

.van-cell-group {
  margin: 20px 0;
}

.van-field {
  font-size: 14px;
}

.van-nav-bar {
  background-color: #ffffff; /* 主色调 */
  color: white;
}

.van-button {
  background-color: #007aff; /* 按钮颜色 */
  color: white;
}

.van-button:active {
  background-color: #005bb5; /* 按钮点击时的颜色 */
}

</style>
