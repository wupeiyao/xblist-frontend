import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingStore = defineStore('settingStore', () => {
    //折叠
    const fold = ref(false)
    //刷新
    const refresh = ref(false)

    return { fold, refresh }
})

const useLayOutSettingStore = defineStore('SettingStore', {
    state: () => {
        return {
            fold: false, //用户控制菜单折叠还是收起控制
            refsh: false, //仓库这个属性用于控制刷新效果
        }
    },
})

export default useLayOutSettingStore