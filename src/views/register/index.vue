<template>
  <div class="page">
    <!--标题-->
    <div
      style="
          color: #ff4379;
          text-align: left;
          margin-left: 10vw;padding-top: 10px">
      <div style="font-size: 3rem">HELLO</div>
      <div style="font-size: 1.5rem">欢迎注册</div>
    </div>
    <div style="margin-top: 5vh" v-show="isVersion">
      <div
        style="
          background-color: #fdfdfd;
          margin-inline: 8vw;
          border-radius: 2rem;
          width: 84vw;
          height: 200%;
          justify-content: center;">
        <div
          style="
            text-align: center;
            color:#ff4379;
            justify-content: center;
            font-size: 2rem;padding-top: 15px">
          小白清单
        </div>
        <!--输入表单：手机号和验证码-->
        <div style="margin-top: 1.5rem;width: 80%" >
          <van-field
            v-model="register.username"
            placeholder="请输入您的用户名"
            :left-icon="account"
            style="
              background-color: #dfefff;
              color:#ff4379;
              margin-inline: 8vw;
              padding-block: 6px;
              border-radius: 2rem;
            "
            autocomplete="off"
            :rules="[{ required: true, message: '请填写用户名' }]">
          </van-field>
        </div>
        <div style="margin-top: 1.5rem;width: 80%">
          <van-field
            id="validation_code"
            type="password"
            v-model="register.password"
            placeholder="请输入密码"
            :left-icon="shiele_check"
            style="
              background-color: #dfefff;
              color:#ff4379;
              margin-inline: 8vw;
              border-radius: 2rem;
              padding-block: 6px;
              padding-inline-end: 8px;
            "
            autocomplete="off"
            max-length="6">
          </van-field>
        </div>
        <!--邮箱-->
        <div style="margin-top: 1.5rem;width: 80%">
          <van-field
            id="validation_code"
            v-model="register.email"
            placeholder="请输入邮箱"
            :left-icon="email"
            style="
              background-color: #dfefff;
              color:#ff4379;
              margin-inline: 8vw;
              border-radius: 2rem;
              padding-block: 6px;
              padding-inline-end: 8px;
            "
            autocomplete="off"
            max-length="6">
          </van-field>
        </div>

        <!--电话-->
        <div style="margin-top: 1.5rem;width: 80%">
          <van-field
            id="validation_code"
            v-model="register.phone"
            placeholder="请输入电话"
            :left-icon="phone"
            style="
              background-color: #dfefff;
              color:#ff4379;
              margin-inline: 8vw;
              border-radius: 2rem;
              padding-block: 6px;
              padding-inline-end: 8px;
            "
            autocomplete="off"
            max-length="6">
          </van-field>
        </div>
        <!--登录按钮-->
        <div
          style="margin-top: 1rem; display: flex;justify-content: center; align-items: center">
          <van-button
            color="#ff4379"
            round
            style="
              width: 50vw;
              letter-spacing: 0.25rem;
              font-weight: bolder;
              font-size: 1rem;
            "
            @click="toAvatar">下一步</van-button>
        </div>
        <!--跳转到注册-->
        <div
          style="
            margin: 1.5rem 0 10px 0;
            color: #ff4379;
            font-size: 0.75rem;
            display: flex;
            padding-bottom: 10px;
            justify-content: center;">
          <span>已有账号，去<span
            style="text-decoration: underline"
            @click="onDirectToLogin">登录</span></span>
        </div>
      </div>
    </div>

  <!--  头像-->
    <div style="margin-top: 15vh"  v-show="isVersion2">
      <div
        style="
          background-color: #fdfdfd;
          margin-inline: 8vw;
          border-radius: 2rem;
          width: 84vw;
          height: 100%;
          justify-content: center;">
        <div
          style="
            text-align: center;
            color:#ff4379;
            justify-content: center;
            font-size: 2rem;padding-top: 15px">
          小白清单
        </div>
        <!--输入表单：手机号和验证码-->
        <div style="color: #ff4379;font-size: 15px;text-align: center;padding-top: 10px">上传头像</div>
        <div style="margin-top: 1.5rem;display: flex;justify-content: center">
          <van-uploader
            v-model="fileList"
            :after-read="afterRead"
            multiple
            max-count="1"
          />
        </div>
        <!--登录按钮-->
        <div
          style="margin-top: 1rem; display: flex;justify-content: center; align-items: center">
          <van-button
            color="#ff4379"
            round
            style="
              width: 50vw;
              letter-spacing: 0.25rem;
              font-weight: bolder;
              font-size: 1rem;
            "
            @click="onRegister">注册</van-button>
        </div>
        <!--跳转到注册-->
        <div
          style="
            margin-top: 1.5rem;
            color: #ff4379;
            font-size: 0.75rem;
            display: flex;
             padding-bottom: 10px;
            justify-content: center;">
          <span>已有账号，去<span
            style="text-decoration: underline"
            @click="onDirectToLogin">登录</span></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { showFailToast, showNotify, showSuccessToast } from 'vant'
import CryptoJS from 'crypto-js'; // 引入 crypto-js 库

import useUserStore from '@/stores/modules/user';
import { useRouter } from 'vue-router';

// 控制版本
const isVersion = ref<boolean>(true);
const isVersion2 = ref<boolean>(false);
const router = useRouter();

// 图片资源
const shiele_check = new URL('@/assets/svg/shield_check_pink.svg', import.meta.url).href;
const account = new URL('@/assets/svg/accountPink.svg', import.meta.url).href;
const email = new URL('@/assets/svg/email_pink.svg', import.meta.url).href;
const phone = new URL('@/assets/svg/phonePink.svg', import.meta.url).href;

// 注册表单数据
const register = reactive({
  username: '',
  password: '',
  email: '',
  phone: '',
  sex: '',
  avatarUrl: '',
  birthday: '',
});

// 用户状态管理
const userStore = useUserStore();

// 头像上传文件列表
const fileList = ref<[]>([]);

// 表单验证与切换视图
const toAvatar = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 邮箱格式验证
  const phonePattern = /^1[3-9]\d{9}$/; // 中国大陆手机号格式验证

  if (register.username === '' || register.username.length < 3) {
    showFailToast({
      message: '请输入正确的用户名',
      duration: 3000,
    });
    return;
  }
  if (register.password.length < 6) {
    showFailToast({
      message: '请输入正确的密码',
      duration: 3000,
    });
    return;
  }
  // 校验邮箱格式
  if (!emailPattern.test(register.email)) {
    showFailToast({
      message: '请输入正确的邮箱',
      duration: 3000,
    });
    return;
  }
  // 校验电话格式
  if (!phonePattern.test(register.phone)) {
    showFailToast({
      message: '请输入正确的电话格式',
      duration: 3000,
    });
    return;
  }

  // 对密码进行加密
  register.password = CryptoJS.MD5(register.password).toString();

  // 切换到头像上传界面
  isVersion.value = false;
  isVersion2.value = true;
};

// 提交注册信息
const onRegister = async () => {
  if (fileList.value.length === 0) {
    showFailToast('请上传头像');
    return;
  }

  try {
    // 提交注册请求
    await userStore.userRegister(register);

    // 注册成功通知
    showSuccessToast( '注册成功' );
    await router.push('/login');
  } catch (error: any) {
    showFailToast({
      message: '账号已存在',
      duration: 3000,
    });
    console.error(error);
  }
};

// 跳转到登录页面
const onDirectToLogin = () => {
  router.push('/login');
};

// 头像上传处理
const afterRead = (file: any) => {
  // 创建表单数据
  const formData = new FormData();
  formData.append('avatar', file.file); // 使用 file.file 获取实际的 File 对象

  // 发送上传请求
  fetch('http://47.122.10.247:8989/user/upload', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Upload success:', data);
      register.avatarUrl = data.data; // 更新用户头像 URL
    })
    .catch((error) => {
      console.error('Upload failed:', error);
    });
};
</script>
<style scoped>
.page {
  width: 100vw;
  min-height: 100vh;
  background-image: url("@/assets/images/re~1.webp");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

::v-deep(.van-field__control) {
  margin-left: 1rem;
  color: #a6a6a6;
  height: 33px;
}
::v-deep(input::placeholder) {
  color: #acacac;
  letter-spacing: 0.1rem;
}
::v-deep(.van-field__left-icon) {
  margin-top: 7.5px;
}
</style>
