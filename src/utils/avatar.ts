import {computed} from "vue";


import useUserStore from "@/stores/modules/user";

const userStore = useUserStore();



const baseImageUrl = computed(() => {
    const avatarPath = userStore.avatar; // 默认头像
    return avatarPath;
});

export default baseImageUrl ;
