// 创建用户相关的小仓库
import { defineStore } from 'pinia';
import { reqAllCategory } from "@/api/category";
import type { categoryRes, Category } from "@/api/category/type";


let useCategoryStore = defineStore('Category', {
    // 小仓库存储数据地方
    state: () => ({
        categories: [] as Category[], // 设置 categories 的类型为 Category 数组
    }),

    // 异步|逻辑地方
    actions: {
        async getAllCategories() {
            try {
                const result: any  = await reqAllCategory();
                if (result && result.code === 200) {
                    this.categories = result.data; // 更新状态
                    localStorage.setItem("categories", JSON.stringify(result.data));
                } else {
                    throw new Error(result.msg || '获取分类失败');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                throw error; // 或者处理错误的其他方式
            }
        },
    },
});

export default useCategoryStore;
