//创建用户相关的小仓库
import {defineStore} from 'pinia'
import type {loginFormData, loginResponseData, userInfoResponseData, userRegisterData} from "@/api/user/type";
import {reqLogin, reqLogout, reqRegister, reqUserInfo} from '@/api/user';
import type {UserState} from "@/stores/modules/type/type";
import {
    SET_TOKEN,
    GET_TOKEN,
    REMOVE_TOKEN,
    GET_ID,
    SET_ID,
    GET_USERNAME,
    GET_AVATAR,
    SET_USERNAME,
    SET_AVATAR, REMOVE_USERNAME, REMOVE_AVATAR
} from '@/utils/token'
//引入路由
let useUserStore = defineStore('User', {


    //小仓库存储数据地方
    state: (): UserState => {
        return {
            token: GET_TOKEN(), //用户唯一标识token
            username: GET_USERNAME(),
            avatar: GET_AVATAR(),
            //存储当前用户是否包含某一个按钮
            buttons: [],
            id: GET_ID() ,
        }
    },
    //异步|逻辑地方
    actions: {
        //用户登录的方法
        async userLogin(data: loginFormData) {
            //登录请求
            const result: loginResponseData = await reqLogin(data)
            //登录请求:成功200->token
            //登录请求:失败500->登录失败错误的信息
            if (result.code == 200) {
                //pinia仓库存储一下token
                //由于pinia|vuex存储数据其实利用js对象
                this.token = (result.data.token as string)
                //本地存储持久化存储一份
                this.avatar = result.data.avatarUrl
                this.username = result.data.username
                this.id = result.data.id
                console.log(result.data.token)
                SET_USERNAME(result.data.username)
                SET_AVATAR(result.data.avatarUrl)
                SET_ID(result.data.id)
                SET_TOKEN(result.data.token as string)
                console.log(this.id)
                //能保证当前async函数返回一个成功的promise
                return 'ok'
            } else {
                return Promise.reject(new Error(result.msg))
            }
        },
        async userRegister(data:userRegisterData){
            const result :any = await reqRegister(data)

            if(result.code === 200){
                return 'ok';
            }else {
                return Promise.reject(new Error(result.msg))
            }
        },
        async userLogout() {
            try {
                // 退出登录请求
                const result: any = await reqLogout(GET_TOKEN() as string);

                if (result.code === 200) {
                    // 成功退出：清空本地数据
                    this.token = ''; // 清空状态
                    this.username = '';
                    this.avatar = '';
                    console.log("有执行到这里")
                    REMOVE_TOKEN(); // 清空 localStorage 中的 token
                    REMOVE_USERNAME()
                    REMOVE_AVATAR()
                    this.clearUserData(); // 清空状态管理中的数据
                    // 这里可以触发一个事件或调用一个方法，通知其他组件用户已退出
                    this.notifyLogoutSuccess(); // 示例函数，实际实现根据需要

                    return 'ok'; // 返回成功标志
                } else {
                    this.token = ''; // 清空状态
                    this.username = '';
                    this.avatar = '';
                    REMOVE_TOKEN(); // 清空 localStorage 中的 token
                    REMOVE_USERNAME()
                    REMOVE_AVATAR()
                    console.error(`Logout failed: ${result.message}`); // 输出错误信息
                    return Promise.reject(new Error(`Logout failed: ${result.message || 'Unknown error'}`));
                }
            } catch (error) {
                // 捕获到的任何其他异常，例如网络错误
                this.token = ''; // 清空状态
                this.username = '';
                this.avatar = '';
                REMOVE_TOKEN(); // 清空 localStorage 中的 token
                REMOVE_USERNAME()
                REMOVE_AVATAR()
                console.error("An error occurred during logout:", error);
                return Promise.reject(new Error('error')); // 返回详细的错误信息
            }
        },

// 通知其他组件的示例方法
        notifyLogoutSuccess() {
            // 可能使用事件总线、状态管理或直接调用方法更新状态
            // 例如，使用 Pinia 状态管理
            // this.userStore.clearUserData();
            console.log("User has logged out successfully");
        }
        ,
        clearUserData() {
            this.token = '';
            this.username = '';
            this.avatar = '';
        },
        //获取用户信息方法
        async userInfo() {
            if (this.id !== null && this.id !== undefined) {
                const result: userInfoResponseData = await reqUserInfo(this.id);
                if (result.code == 200) {
                    //获取用户信息进行存储仓库当中[用户头像、名字]
                    // const result: userInfoResponseData = await reqUserInfo(this.id)
                    //如果获取用户信息成功，存储一下用户信息
                    console.log(result.data)
                    this.username = result.data.username
                    this.avatar = result.data.avatarUrl
                    return 'ok'
                } else {
                    return Promise.reject(new Error(result.msg))
                }

            } else {
                throw new Error('User ID is not valid');
            }

        },
        getters: {},
    },

})

export default useUserStore;
