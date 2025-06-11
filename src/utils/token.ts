//封装本地存储存储数据与读取数据方法
//存储数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}
//本地存储获取数据
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}
//本地存储删除数据方法
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}

export const GET_ID = (): number | null => {
  const id = localStorage.getItem('id');
  // 检查是否存在 id
  return id !== null ? parseFloat(id) : null;
}


//本地存储获取数据
export const SET_ID = (id :number) => {
  return localStorage.setItem('id',id.toString())
}

export const SET_USERNAME = (username: string) => {
  localStorage.setItem('username', username)
}
//本地存储获取数据
export const GET_USERNAME = (): string => {
  return localStorage.getItem('username') || ''
}

//本地存储删除数据方法
export const REMOVE_USERNAME = () => {
  localStorage.removeItem('username')
}


export const SET_AVATAR = (avatar: string) => {
  localStorage.setItem('AVATAR', avatar)
}
//本地存储获取数据
export const GET_AVATAR = () => {
  return localStorage.getItem('AVATAR') || ''
}
//本地存储删除数据方法
export const REMOVE_AVATAR = () => {
  localStorage.removeItem('AVATAR')
}


