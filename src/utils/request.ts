//进行axios二次封装:使用请求与响应拦截器
import axios from 'axios'
import useUserStore from "@/stores/modules/user";

import {useRouter} from "vue-router";

const router = useRouter()
//引入用户相关的仓库
// import useUserStore from '@/store/modules/todolist'
//第一步:利用axios对象的create方法,去创建axios实例(其他的配置:基础路径、超时的时间)
const request = axios.create({
  //基础路径
  baseURL: 'http://localhost:8989', //基础路径上会携带
  timeout: 5000, //超时的时间的设置
})
// 第二步:request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  const userStore = useUserStore();
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`; // 需要加上 Bearer 前缀
  }
  return config;
});


//第三步:响应拦截器
request.interceptors.response.use(
  (response) => {
    const contentType = response.headers['content-type'];
    if (contentType?.includes('image')) {
      // 如果是图片，不精简 response，保留 headers 等信息
      return response;
    }
    return response.data;
  },

  (error) => {
    //失败回调:处理http网络错误的
    //定义一个变量:存储网络错误信息
    let message = ''
    //http状态码
    const status = error.response.status

    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    return Promise.reject(error)
  },
)



//对外暴露
export default request


