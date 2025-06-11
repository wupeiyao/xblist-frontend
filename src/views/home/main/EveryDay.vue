<script setup lang="ts">
import { onMounted, ref,watch } from 'vue'
import { addTask, deleteTask, reqHasTaskList, updateTaskOne, updateTaskStatus } from '@/api/tasks'
import type { Records, TaskMarkResponseData } from '@/api/tasks/type'
import useCategoryStore from '@/stores/modules/category'
import useUserStore from '@/stores/modules/user'
import { reqAllCategory } from '@/api/category'
import { showToast } from 'vant'
import { showSuccessToast } from 'vant';
const userStore = useUserStore()
const filterStatus = ref<number | null>(null); // 筛选状态，null 表示不过滤，0 表示未完成，1 表示已完成
const page = ref<number>(0)
const size = ref<number>(6)
const total = ref<number>(0)

const searchQuery = ref('');  // 存储搜索关键词


const categoryStore = useCategoryStore()
const fillCategory = ref([
  {
    id: '',
    cname: ''
  }
]);


const TaskArr = ref<Records>([])
  const params = {
  page: page.value,
  size: size.value,
  userId: userStore.$state.id,
  name: searchQuery.value,
  status: null, // 状态筛选
  categoryId: null, // 类别筛选
};

const getTaskList = async () => {

  params.page = page.value;
  params.size = size.value;
  params.userId = userStore.$state.id;
  params.name = searchQuery.value;
  params.status = filterStatus.value; // 添加状态筛选条件

  const result: TaskMarkResponseData = await reqHasTaskList(params);
  if (result.code == 200) {
    total.value = result.data.total;

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);

    TaskArr.value = result.data.records
      .filter(task => {
        const taskFinishTime = new Date(task.createTime);
        taskFinishTime.setHours(taskFinishTime.getHours() + 8);
        return taskFinishTime >= currentDate && taskFinishTime < nextDate;
      })
      .map(task => {
        // 在任务列表中添加类别名称
        const category = fillCategory.value.find((cat) => Number(cat.id) === task.categoryId);
        return {
          ...task,
          categoryName: category?.cname || '未知类别',
        };
      });
  }
};

onMounted(() => {
  getTaskList()
  categoryStore.getAllCategories()
  reqAllCategory().then((res) => {
    fillCategory.value = res.data; // 直接更新响应式变量
    console.log(fillCategory.value);
  });
})


watch(searchQuery, (newQuery) => {
  // 当搜索关键词变化时，更新 params 并重新获取任务列表
  params.name = newQuery;
  getTaskList();
});


const popupVisible = ref(false);
const formData = ref({
  userId: userStore.$state.id,
  taskTitle: "",
  categoryId: 0,
  finishTime: "",
  isImportant: 0,
  taskContent: "",
  status: 0,
  taskLabel: [],
  categoryName:''
});

const showPopup = () => {

  // 重置表单数据
  formData.value = {
    userId: userStore.$state.id,
    taskTitle: "",
    categoryId: 0,
    finishTime: "",
    isImportant: 0,
    taskContent: "",
    status: 0,
    taskLabel: [],
    categoryName:''
  };
  popupVisible.value = true;
};


const onSubmit = async () => {
  if(formData.value.taskTitle === '' ){
    showToast("请填写任务标题")
    return
  }

  if(formData.value.taskContent === '' ){
    showToast("请填写任务内容")
    return
  }
  if(formData.value.taskTitle === '' ){
    showToast("请选择任务类别")
    return
  }
  if(formData.value.finishTime === '' ){
    showToast("请选择截止时间")
    return
  }

  // 转换数据类型
  // formData.value.finishTime = new Date(formData.value.finishTime).toISOString();
  // 将截止时间转换为 Date 对象
  const finishTimeDate = new Date(formData.value.finishTime);

  // 给时间增加 8 小时
  finishTimeDate.setHours(finishTimeDate.getHours() + 8);

  // 将修改后的时间转换为 ISO 格式
  formData.value.finishTime = finishTimeDate.toISOString();



  // 提交任务
  const result = await addTask(formData.value);
  showSuccessToast('新增任务成功，记得完成哦');
  if (result.code === 200) {
    console.log('任务添加成功:', formData.value);
    popupVisible.value = false; // 提交后关闭弹窗
    await getTaskList(); // 重新获取任务列表
// 重置表单数据
    formData.value = {
      userId: userStore.$state.id,
      taskTitle: "",
      categoryId: 0,
      finishTime: "",
      isImportant: 0,
      taskContent: "",
      status: 0,
      taskLabel: [],
      categoryName:''
    };
  } else {
    console.error('添加任务失败:', result.message);
  }
};
const showPicker = ref(false);
const showDate = ref(false);

const formatDate = (date: Date) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

const onConfirm = (value: Date) => {
  showDate.value = false;
  formData.value.finishTime = formatDate(value); // 更新截止日期到formData
};

const fieldValue = ref('');
const onConfirmC = ({ selectedOptions }: any) => {
  showPicker.value = false;
  if (selectedOptions.length > 0) {
    fieldValue.value = selectedOptions[0].text; // 更新显示的类别名称
    formData.value.categoryId = selectedOptions[0].value; // 更新类别 ID
    formData.value.categoryName = selectedOptions[0].text; // 更新类别名称
  }
};


// 类别
import { computed } from 'vue';


const columns = computed(() => fillCategory.value.map(category => ({
  text: category.cname, // 显示的文本
  value: category.id,    // 绑定的值
})));


// 修改任务状态
const changeStatus = async (taskId: number, currentStatus: number) => {
  const newStatus = currentStatus === 1 ? 0 : 1; // 切换状态
  // 临时更新状态
  const taskIndex = TaskArr.value.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    TaskArr.value[taskIndex].status = newStatus; // 立即更新界面显示
  }

  const paramsStatus = {
    id: taskId,
    userId: userStore.$state.id,
    status: newStatus,
    isImportant: '' // 这里可以根据需要设置
  };

  const result = await updateTaskStatus(paramsStatus);
  if (result.code !== 200) {
    // 如果更新失败，恢复原状态
    TaskArr.value[taskIndex].status = currentStatus;
    showToast('更新状态失败');
  } else {
    await getTaskList(); // 更新任务列表
  }
};


// 修改任务重要性
const changeImportant = async (taskId: number, currentImportance: number) => {
  const newImportance = currentImportance === 1 ? 0 : 1; // 切换重要性
  const taskIndex = TaskArr.value.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    TaskArr.value[taskIndex].isImportant = newImportance; // 立即更新界面显示
  }

  const paramsImportance = {
    id: taskId,
    userId: userStore.$state.id,
    status: '', // 保持原状态
    isImportant: newImportance,
  };

  const result = await updateTaskStatus(paramsImportance);
  if (result.code !== 200) {
    TaskArr.value[taskIndex].isImportant = currentImportance; // 恢复原状态
    showToast('更新重要性失败');
  } else {
    await getTaskList(); // 更新任务列表
  }
};

//详细的任务信息
const taskDetailVisible = ref(false); // 控制任务详情弹窗
const currentTaskId = ref<number | null>(null); // 存储当前任务ID

const showTaskDetail = (task:any) => {
  taskDetailVisible.value = true;
  currentTaskId.value = task.id; // 保存当前任务ID

  const category = fillCategory.value.find((cat) => cat.id === task.categoryId);
  formData.value = { // 填充当前任务的详情
    userId: task.userId,
    taskTitle: task.taskTitle,
    categoryId: task.categoryId,
    finishTime: task.finishTime,
    isImportant: task.isImportant,
    taskContent: task.taskContent,
    status: task.status,
    taskLabel: task.taskLabel,
    categoryName: category?.cname || '未知类别', // 添加类别名称
  };
};

const updateTask = async () => {
  if (currentTaskId.value === null) return; // 确保当前任务ID存在

  // 准备更新数据
  const updatedData = {
    id: currentTaskId.value,
    userId: userStore.$state.id,
    taskTitle: formData.value.taskTitle,
    categoryId: formData.value.categoryId,
    finishTime: new Date(formData.value.finishTime).toISOString(), // 转换为 ISO 格式
    isImportant: formData.value.isImportant,
    taskContent: formData.value.taskContent,
    status: formData.value.status,
    taskLabel: []
  };
  const result = await updateTaskOne(updatedData);
  if (result.code === 200) {
    showSuccessToast('任务更新成功');
    taskDetailVisible.value = false;
    await getTaskList();
  } else {
    showToast('任务更新失败');
  }
};

const deleteTaskById = async () => {
  if (currentTaskId.value === null) return; // 确保当前任务ID存在

  const id  = currentTaskId.value
  const result = await deleteTask(id);
  if (result.code === 200) {
    showToast('任务删除成功');
    taskDetailVisible.value = false;
    await getTaskList();
  } else {
    showToast('任务删除失败');
  }
};

const menuRef = ref(null);
const itemRef = ref(null);
const value = ref(0);
const switch1 = ref(false);
const switch2 = ref(false);
const onConfirmq = () => {
  if (!switch1.value && !switch2.value) {
    filterStatus.value = null; // 显示所有任务
  }
  getTaskList();
  itemRef.value.toggle();
};


const onFilterChange = (status: number) => {
  if (status === 0) {
    switch1.value = true; // 确保开关状态正确
    switch2.value = false;
    filterStatus.value = 0; // 筛选未完成任务
  } else if (status === 1) {
    switch2.value = true;
    switch1.value = false;
    filterStatus.value = 1; // 筛选已完成任务
  } else {
    switch1.value = false;
    switch2.value = false;
    filterStatus.value = null; // 不筛选
  }
  getTaskList(); // 调用获取任务列表方法
};



const options = computed(() => [
  { text: '全部类别', value: 0 },
  ...fillCategory.value.map(category => ({
    text: category.cname,
    value: category.id,
  })),
]);

watch(value, (newValue) => {
  params.categoryId = newValue === 0 ? null : newValue; // 0 为全部类别
  getTaskList();
});

watch(switch1, (newValue) => {
  if (newValue) switch2.value = false;
});

watch(switch2, (newValue) => {
  if (newValue) switch1.value = false;
});

</script>

<template>
  <!--搜索-->
  <div class="all">
    <div style="width: 100%;height: 7vh;margin-bottom: 7px;display: flex;justify-content: center" class="van-search" >
      <van-search
        style="min-width: 80vw"
        placeholder="请输入搜索关键词"
        v-model="searchQuery"
        @search="getTaskList"
      /></div>

      <van-dropdown-menu ref="menuRef">
      <van-dropdown-item v-model="value" :options="options" />
      <van-dropdown-item title="状态筛选" ref="itemRef">
        <van-cell center title="未完成">
          <template #right-icon>
            <van-switch v-model="switch1" @change="onFilterChange(0)" />
          </template>
        </van-cell>
        <van-cell center title="已完成">
          <template #right-icon>
            <van-switch v-model="switch2" @change="onFilterChange(1)" />
          </template>
        </van-cell>

        <div style="padding: 5px 16px;">
          <van-button type="default" block round @click="onConfirmq">
            确认
          </van-button>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
    <div class="task">
      <van-row v-for="task in TaskArr" class="card" style="margin-bottom: 8px;">
        <van-col :span="5" style="display: flex; justify-content: center; align-items: center">
          <van-icon name="checked" size="30px" :color="task.status === 1 ? 'green' : '#d7e0f5'" @click="changeStatus(task.id, task.status)" />
        </van-col>
        <van-col :span="16"   @click="showTaskDetail(task)" ><p style="margin-top: 20px" >{{ task.taskTitle }}</p></van-col>
        <van-col :span="3" size="27px" style="display: flex; justify-content: center; align-items: center">
          <van-icon name="star" :color="task.isImportant ? '#9480ff' : '#d7e0f5'" @click="changeImportant(task.id, task.isImportant)" />
        </van-col>
      </van-row>
    </div>
    <van-popup v-model:show="popupVisible" position="bottom">
      <van-form @submit="onSubmit">
        <van-field v-model="formData.taskTitle" label="任务标题" placeholder="请输入任务标题" />
        <van-field v-model="formData.taskContent" label="任务内容" placeholder="请输入任务内容" />
        <van-field
          v-model="formData.categoryName"
          is-link
          readonly
          label="任务类别"
          placeholder="选择任务类别"
          @click="showPicker = true"
        />
        <van-cell title="截止日期"  is-link :value="formData.finishTime" @click="showDate = true" />
      </van-form>
      <div style="display: flex; justify-content: center">
        <van-button type="default" style="width: 80%;" @click="onSubmit">添加任务</van-button>
      </div>
    </van-popup>

    <!-- 任务详情弹窗 -->
    <!-- 任务详情弹窗 -->
    <van-popup v-model:show="taskDetailVisible" position="bottom">
      <van-form>
        <van-field v-model="formData.taskTitle" label="任务标题" placeholder="请输入任务标题" />
        <van-field v-model="formData.taskContent" label="任务内容" placeholder="请输入任务内容" />
        <van-field
          v-model="formData.categoryName"
          is-link
          readonly
          label="任务类别"
          placeholder="选择任务类别"
          @click="showPicker = true"
        />
        <van-cell title="截止日期" is-link :value="formData.finishTime" @click="showDate = true" />
      </van-form>
      <div style="display: flex; justify-content: space-between">
        <van-button type="default" style="width: 30%;" @click="updateTask">修改任务</van-button>
        <van-button type="default" style="width: 30%;" @click="deleteTaskById">删除任务</van-button>
        <van-button type="default" style="width: 30%;" @click="taskDetailVisible = false">关闭</van-button>
      </div>
    </van-popup>
    <!------------------------------>
    <van-calendar v-model:show="showDate" @confirm="onConfirm" />

    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirmC"
      />
    </van-popup>
  </div>
  <div style="position: fixed;; right: 5%; bottom: 10%">
    <van-icon name="add" color=#969696 size="60px" @click="showPopup" />
  </div>
</template>

<style scoped>
.task {
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
}
.card {
  margin-top: 0.2em;
  width: 92%;
  height: 3.6em;
  background-color: white; /* 背景色 */
  border-radius: 8px; /* 圆角 */
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.all{
}

/* 在当前组件中覆盖 van-search 背景 */
.van-search {
  --van-search-background: transparent;
  padding-top: 1em;
}




</style>
