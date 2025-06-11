export interface ResponseData {
    code: number
    msg: string
}

//已有的任务的ts数据类型
export interface TaskList {
    id : number
    categoryId: number
    createTime: string
    finishTime: string
    isImportant:number
    status:number
    taskContent:string
    taskLabels:[]
    taskTitle:string
    updateTime:string
    userid:number

}

//包含全部任务数据的ts类型
export type Records = TaskList[]

//获取的已有全部任务的数据ts类型
export interface TaskMarkResponseData extends ResponseData {
    data: {
        records: Records
        total: number
        size: number
        current: number
        searchCount: boolean
        pages: number
    }
}

export interface pageDto{
    page: number
    size: number
    name: string
    userId: number
    categoryId: number
    status: number

}

export interface taskAdd {
    userId:number,
    categoryId:number,
    taskContent:string,
    taskTitle:string,
    isImportant:number,
}
