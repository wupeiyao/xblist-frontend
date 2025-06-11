//用户相关接口
import request from "@/utils/request";
import type {
    loginFormData,
    loginResponseData, userDataType,
    userInfoResponseData,
     userRegisterData
} from "@/api/user/type";

enum API {
    LOGIN_URL = '/user/login',
    USER_REGISTER = '/user/register',
    USER_UPDATE = '/user/update',
    USER_ONE = '/user/one',
    USER_LOGOUT = '/user/logout',
}

//登录接口
export const reqLogin = (data: loginFormData) =>
    request.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息
export const reqUserInfo = (id:number ) =>
    request.get<any, userInfoResponseData>(`${API.USER_ONE}?id=${id}`)
//退出登录
export const reqLogout = (token:  string) =>
    request.post<any, any>(`${API.USER_LOGOUT}?token=${token}`)

//用户注册
export const reqRegister = (data :userRegisterData) =>
    request.post<any, any>(API.USER_REGISTER,data)
//用户更新
export const reqUpdate = (data :any) =>
    request.post<any, any>(API.USER_UPDATE,data)

