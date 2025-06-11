export interface loginFormData {
  username: string;
  password: string;
  captcha: string;      // 用户输入的验证码
  captchaCode: string;  // 验证码标识（从 /captcha 接口获取）
}

//loginVo
export interface dataType {
    id: number,
    token: string,
    username : string,
    avatarUrl:string,

}

//后端返回的类型
export interface loginResponseData {
        code:number,
        msg:string,
        data:dataType
}


export interface userInfoResponseData{
    code:number,
    msg:string,
    data:userDataType
}


export interface userDataType{
    id : number,
    username : string,
    email:string,
    phone :string,
    sex : string,
    avatarUrl:string,
    birthdate: string,
    address: string,
    university: string,
    secondarySchool :string,
    elementarySchool:string,
    company:string,
    introduction:string,
    major:string,
    password:string
}
//用户注册信息
export interface userRegisterData {
    username : string,
    email:string,
    phone :string,
    sex : string,
    avatarUrl:string,
    birthday: string,
    password:string
}
//用户退出登录

//用户信息回显


