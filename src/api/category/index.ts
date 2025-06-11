import request from "@/utils/request";


enum API {

    //获取已有类别接口
    CATEGORY_URL = "/category/list" ,

}

export const reqAllCategory = () => request.get(API.CATEGORY_URL);

