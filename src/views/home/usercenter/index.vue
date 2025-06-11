<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import baseImageUrl from '@/utils/avatar'
import { reqUpdate, reqUserInfo } from '@/api/user'
import useUserStore from '@/stores/modules/user'
import { showFailToast, showSuccessToast } from 'vant'


const currentDate = ref(['2021', '01','01']);
const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const gender = ref('')
const birthday = ref<string>(''); // 如果只需要单个字符串
const profession = ref('')
const phone = ref('')
const email = ref('')
const school = ref('')
const company = ref('')

const formatBirthday = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};


const getUserInfo = async () => {
  const id = userStore.$state.id
  if (id === null) {
    console.error('用户ID不能为空')
    return
  }
  try {
    const result: any = await reqUserInfo(id)
    console.log(result)
    if (result.code === 200) {
      username.value = result.data.username;
      phone.value = result.data.phone;
      email.value = result.data.email;
      gender.value = result.data.sex;
      //处理生日字段
      // 处理生日字段并格式化
      // formatBirthday(parsedBirthday)
      const parsedBirthday = new Date(result.data.birthday.replace(' ', 'T'));
      birthday.value = formatBirthday(parsedBirthday);
      profession.value = result.data.major;

      school.value = result.data.university;
      company.value = result.data.company;

    } else {
      console.error('获取用户信息失败:', result.message)
    }
  } catch (error) {
    console.error('请求用户信息时发生错误:', error)
  }
}


// 定义格式化函数，将日期字符串转换为后端格式
function formatToBackendDate(date: string): string {
  // 前端传入的格式是 `yyyy-MM-dd`
  return `${date} 00:00:00`; // 将时间部分设置为 `00:00:00`
}

const validateForm = async () => {
  if (!username.value || username.value.length < 3) {
    showFailToast('用户名不能为空且长度不少于3个字符');
    return false;
  }
  if (!gender.value) {
    showFailToast('性别不能为空');
    return false;
  }
  if (!birthday.value) {
    showFailToast('生日不能为空');
    return false;
  }
  if (!phone.value || !/^\d{11}$/.test(phone.value)) {
    showFailToast('请输入有效的手机号');
    return false;
  }
  if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    showFailToast('请输入有效的邮箱地址');
    return false;
  }
  return true;
};


const updateUserInfomation = async () => {


  const isValid = await validateForm();
  if (!isValid) {
    return;
  }
  const formattedBirthday = formatToBackendDate(birthday.value); // 格式化日期

  const updatedData = {
    id : userStore.$state.id,
    username: username.value,
    sex: gender.value,
    birthday: formattedBirthday,
    major: profession.value,
    phone: phone.value,
    email: email.value,
    university: school.value,
    company: company.value
  }


  if (username.value === "" || username.value.length < 3) {
    showFailToast({
      message: "用户名不能为空",
      duration: 3000, // 显示时间，单位是毫秒
    });
    return;
  }
  try {
    const result = await reqUpdate(updatedData)
    if (result.code === 200) {
      console.log('用户信息更新成功')
      showSuccessToast('您的信息更新成功');
     await router.push('/home/setting')  // Navigate to settings or another page after successful update
    } else {
      console.error('更新用户信息失败:', result.message)
    }
  } catch (error) {
    console.error('请求更新用户信息时发生错误:', error)
  }
}


onMounted(() =>{
  getUserInfo()
})


const onSubmit = () => {
  console.log('提交的数据:', {
    username: username.value,
    gender: gender.value,
    birthday: birthday.value,
    profession: profession.value,
    phone: phone.value,
    email: email.value,
    school: school.value,
    company: company.value
  })
}
const onClickLeftU = () =>{
  router.push('/home/setting')
}
// =================
const showDatePicker = ref(false) // 控制日期选择器的显示


const minDate = ref(new Date(1900, 0, 1))  // 最小日期：1900年1月1日
const maxDate = ref(new Date())  // 最大日期：当前日期

const onConfirmDate = () => {
  birthday.value = `${currentDate.value[0]}-${currentDate.value[1]}-${currentDate.value[2]}`;
  showDatePicker.value = false; // 关闭日期选择器
};
</script>

<template>
  <div class="bg">
    <div style="margin-bottom: 10px">
      <van-nav-bar
        title="个人中心"
        left-text="返回"
        left-arrow
        @click-left="onClickLeftU"
      />
    </div>
    <div class="content">
        <div class="avatar">
          <van-image
            round
            width="7rem"
            height="7rem"
            :src="baseImageUrl"
            fit="cover" />
        </div>

      <van-form @submit="onSubmit">
        <div>
          <van-cell-group inset>
            <van-field
              v-model="username"
              name="用户名"
              label="用户名"
              placeholder="请输入用户名"
            />
            <van-field
              v-model="gender"
              name="性别"
              label="性别"
              placeholder="请输入性别"
            />
            <van-field
              v-model="birthday"
              name="生日"
              label="生日"
              placeholder="请输入生日"
              @click="showDatePicker = true"
            />
            <van-field
              v-model="profession"
              name="职业"
              label="职业"
              placeholder="请输入职业"
            />
            <van-field
              v-model="phone"
              name="电话"
              label="电话"
              placeholder="请输入电话"
            />
            <van-field
              v-model="email"
              name="邮箱"
              label="邮箱"
              placeholder="请输入邮箱"
            />
            <van-field
              v-model="school"
              name="学校"
              label="学校"
              placeholder="请输入学校"
            />
            <van-field
              v-model="company"
              name="公司"
              label="公司"
              placeholder="请输入公司"
            />

            <!-- van-date-picker 组件 -->
            <van-popup v-model:show="showDatePicker" position="bottom">
              <van-date-picker
                v-model="currentDate"
                type="date"
                title="选择生日"
                :min-date="minDate"
                :max-date="maxDate"
                @cancel="showDatePicker = false"
              @confirm="onConfirmDate"
              />
            </van-popup>
          </van-cell-group>
        </div>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit" @click="updateUserInfomation">
            修改资料
          </van-button>
        </div>
      </van-form>

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

.content {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin:0 15px 10px 15px;
}

.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.submit-button {
  margin-top: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
