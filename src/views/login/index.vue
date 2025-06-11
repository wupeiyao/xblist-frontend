<template>
  <div class="page">
      <!--标题-->
      <div
        style="
          color: #1ec8ff;
          text-align: left;
          margin-left: 10vw;padding-top: 10px">
        <div style="font-size: 3rem">HELLO</div>
        <div style="font-size: 1.5rem">欢迎登录</div>
      </div>
    <div style="margin-top: 5vh;" >
      <div
        style="
          background-color: #fdfdfd;
          margin-inline: 8vw;
          border-radius: 2rem;
          width: 84vw;
          height: 67%;
          justify-content: center;">
        <!--公司名称-->
        <div
          style="
            text-align: center;
            color: #1ec8ff;
            justify-content: center;
            font-size: 2rem;padding-top: 15px">
          小白清单
        </div>
        <!--输入表单：手机号和验证码-->
        <div style="margin-top: 1.5rem;width: 80%;">
          <van-field
            v-model="loginForm.username"
            placeholder="请输入您的用户名"
            :left-icon="account"
            style="
              background-color: #dfefff;
              color: #1ec8ff;
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
            v-model="loginForm.password"
            placeholder="请输入密码"
            :left-icon="shiele_check"
            style="
              background-color: #dfefff;
              color:#1ec8ff;
              margin-inline: 8vw;
              border-radius: 2rem;
              padding-block: 6px;
              padding-inline-end: 8px;
            "
            autocomplete="off"
            max-length="6">
          </van-field>
        </div>
        <!-- 验证码输入 -->
        <div style="margin-top: 1.5rem;width: 80%">
          <van-field
            v-model="loginForm.captcha"
            placeholder="请输入验证码"
            :left-icon="secure"
            style="
      background-color: #dfefff;
      color:#1ec8ff;
      margin-inline: 8vw;
      border-radius: 2rem;
      padding-block: 6px;
      padding-inline-end: 8px;
    "
            autocomplete="off"
          >
            <template #right-icon>
              <img
                :src="captchaImg"
                alt="验证码"
                @click="loadCaptcha"
                style="width: 80px; height: 32px; border-radius: 0.5rem; margin-right: 8px; cursor: pointer;"
              />
            </template>
          </van-field>
        </div>

        <!--登录按钮-->
        <div
          style="margin-top: 1rem; display: flex;justify-content: center; align-items: center">
          <van-button
            color="#1ec8ff"
            round
            style="
              width: 50vw;
              letter-spacing: 0.25rem;
              font-weight: bolder;
              font-size: 1rem;
            "
            @click="onLogin">立即登录</van-button>
        </div>
        <!--跳转到注册-->
        <div
          style="
            margin: 1.5rem;
            padding-bottom: 10px;
            color: #1ec8ff;
            font-size: 0.75rem;
            display: flex;
            justify-content: center;">
          <span>没有账号，去<span
            style="text-decoration: underline"
            @click="onDirectToRegister">注册</span></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { showFailToast,  showSuccessToast } from 'vant'
import CryptoJS from 'crypto-js'

import useUserStore from '@/stores/modules/user'
import { useRouter } from 'vue-router'
import { getCaptcha } from '@/utils/captcha'

const router = useRouter()

// 图标资源
const shiele_check = new URL("@/assets/svg/shield_check.svg", import.meta.url).href
const account = new URL("@/assets/svg/account.svg", import.meta.url).href
const secure = new URL("@/assets/svg/secure.svg", import.meta.url).href // 新增验证码图标

// 登录表单
const loginForm = reactive({
  username: '',
  password: '',
  captcha: ''
})

// 验证码图片和验证码 code
const captchaImg = ref('')
const captchaCode = ref('')

const userSrote = useUserStore()

// 密码加密函数
const encryptPassword = (password: string): string => {
  return CryptoJS.MD5(password).toString()
}

// 获取验证码
const loadCaptcha = async () => {
  const res = await getCaptcha();
  console.log("1:",res.captchaCode); // 调试
  console.log("2:",res.imageUrl); // 调试

  captchaImg.value = res.imageUrl;
  captchaCode.value = res.captchaCode; // 确保赋值
  console.log("新验证码标识:", captchaCode.value); // 调试
};
onMounted(() => {
  loadCaptcha()
})

// 登录逻辑
const onLogin = async () => {
  if (loginForm.username.length < 3) {
    showFailToast('用户名不能为空')
    return
  }
  if (loginForm.password.length < 6) {
    showFailToast('密码格式错误')
    return
  }
  if (!loginForm.captcha || loginForm.captcha.length === 0) {
    showFailToast('请输入验证码')
    return
  }

  try {
    const encryptedPassword = encryptPassword(loginForm.password)

    const loginData = {
      username: loginForm.username,
      password: encryptedPassword,
      captcha: loginForm.captcha,
      captchaCode: captchaCode.value // header中返回的验证码标识
    }

    console.log("登录请求数据:", loginData); // 调试日志
    await userSrote.userLogin(loginData)

    await router.push('/home/everyday')
    showSuccessToast('小白清单欢迎您')
  } catch (error) {
    showFailToast('账号、密码或验证码错误')
    await loadCaptcha() // 刷新验证码
  }
}

const onDirectToRegister = () => {
  router.push('/register')
}

</script>
<style scoped>
.page {
  width: 100vw;
  min-height: 100vh;
  background-image: url("@/assets/images/task.webp");
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
