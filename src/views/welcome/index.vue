<template>
  <div class="page">
    <div class="content">
      <div class="curve-container">
        <div class="text-overlay">小白清单</div>
        <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#ffffff"
            d="
        M0,224
        C480,400 960,48 1440,224
        L1440,320
        L0,320
        Z" />
        </svg>
      </div>
      <div style="padding-top: 2rem; margin-top: -5px"  class="center">
        <van-button @click="login"
          round
          color="#1ec8ff"
          style="width: 70vw; letter-spacing: 0.5rem; color: #ffffff">立即登录
        </van-button>
        <van-button @click="register"
          round
          color="#1ec8ff"
          style="
            width: 70vw;
            letter-spacing: 0.25rem;
            color: #ffffff;
            margin-top: 1rem;
          ">立即注册
        </van-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const login = () =>{
   router.push("/login")
}
const register = () =>{
  router.push("/register")
}

</script>
<style scoped>
.page {
  width: 100vw;
  min-height: 100vh;
}

.content {
  margin-top: 0px;
  padding-bottom: 0px;
}

.curve-container {
  position: relative;
  height: 60vh;
  width: 100vw;
  background-image: url('@/assets/images/bg3.webp');
  background-size: cover;
  background-position: center;
  border: none;
}

.curve-container svg {
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
}

.text-overlay {
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2rem;
}
.center{
display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
