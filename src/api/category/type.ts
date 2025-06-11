

export interface Category{
    id: number;
    cname:string
}

export interface categoryRes{
    code: number;
    msg: string;
    data : categories
}

export type  categories = Category[]