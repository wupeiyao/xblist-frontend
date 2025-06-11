<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const onClickLeftU = () => {
  router.push('/home/setting');
};
</script>

<template>
  <div class="bg">
    <div style="margin-bottom: 20px">
      <van-nav-bar
        title="关于小白清单"
        left-text="返回"
        left-arrow
        @click-left="onClickLeftU"
      />
    </div>

    <div class="content1">
      <!-- 软件简介 -->
      <section class="section">
        <h2 class="section-title">软件简介</h2>
        <p class="section-text">
          小白清单是一款简洁高效的任务管理工具，旨在帮助您更轻松地规划日程，专注于重要的事情。
        </p>
      </section>

      <!-- 核心功能展示 -->
      <section class="section">
        <h2 class="section-title">核心功能</h2>
        <ul class="features-list">
          <li>🌟 简单直观的任务清单管理</li>
          <li>⏰ 智能提醒，重要事项不遗漏</li>
          <li>📅 支持任务定时设置与日程查看</li>
          <li>☁️ 数据同步，随时随地查看任务</li>
          <li>🎨 极简白色主题，减少视觉干扰</li>
        </ul>
      </section>

      <!-- 开发者信息 -->
      <section class="section">
        <h2 class="section-title">开发者信息</h2>
        <p class="section-text">
          小白清单由一群热爱效率与简洁设计的开发者制作。我们希望通过这个工具，帮助用户更高效地管理时间。
        </p>
      </section>

      <!-- 用户反馈 -->
      <section class="section">
        <h2 class="section-title">用户反馈</h2>
        <p class="section-text">
          如果您在使用过程中遇到问题或有任何建议，请通过以下方式联系我们：
        </p>
        <p class="section-text">📧 邮箱：2034037932@qq.com</p>
      </section>

      <!-- 版本信息 -->
      <section class="section">
        <h2 class="section-title">版本信息</h2>
        <p class="section-text">当前版本：1.0.2</p>
        <p class="section-text">更新内容：修复部分用户电话，邮箱信息显示bug；提高安全性</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.bg {
  background-color: #f3f3f3;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
}

.content1 {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 0 15px 10px 15px;
}

.section {
  margin-bottom: 20px;
  text-align: center;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  text-align: center;
}

.section-text {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
}

.features-list {
  padding-left: 20px;
  list-style: none;
  text-align: center;
}

.features-list li {
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
}
</style>
