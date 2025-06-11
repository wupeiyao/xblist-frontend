import request from '@/utils/request'
import type { ResponseData, TaskMarkResponseData } from '@/api/tasks/type'

enum API {

  //获取已有任务接口
  TASKADD = '/task/add',
  TASKLIST_URL = '/task/page',

  TASKUPDATESTATUS = '/task/updatestatus',

  TASKUPDATE = '/task/update',
  DELETETASK = '/task/deleteone',
  DELETETASKBYSEVENDAY = '/task/delbyday',
  DELETETASKBYSTATUS = '/task/delbystatus',
  DELETE  = '/task/delall',

  GETTASKSETTINGS = '/task/settings',

}

export const reqHasTaskList = (parma: any): Promise<TaskMarkResponseData> => {
  return request.post<any, TaskMarkResponseData>(API.TASKLIST_URL, parma)
}

export const updateTaskStatus = (parmaUpdate: any) => {
  return request.post<any, ResponseData>(API.TASKUPDATESTATUS, parmaUpdate)
}

export const addTask = (parma: any) => {
  return request.post<any, any>(API.TASKADD, parma)
}

export const updateTaskOne = (parmaUpdate: any) => {
  return request.post<any, ResponseData>(API.TASKUPDATE, parmaUpdate)
}

export const deleteTask = (id: number) => {
  return request.post<any, ResponseData>(API.DELETETASK, null, {
    params: { id } // 将 id 作为 URL 参数传递
  })
}

//清除天数前
export const delete7Day = (param: any) => {
  return request.post<any, any>(API.DELETETASKBYSEVENDAY, param)
}

//清除已完成任务
export const deleteByStatus = (param: any) => {
  return request.post<any, any>(API.DELETETASKBYSTATUS, param)
}

//清除任务
export const deleteAll = (param: any) => {
  return request.post<any, any>(API.DELETE, param)
}



export const getUserTaskSetting = (param: any) => {
  return request.post<any, any>(API.GETTASKSETTINGS, param)
}


export const saveUserTaskSetting = (taskSettings: { setting1: number, setting2: number, setting3: number, userId: number }) => {
  return request.post<any, any>('/task/updatetasksetting', taskSettings);
}


