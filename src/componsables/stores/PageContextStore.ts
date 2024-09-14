import {ref} from "vue";
import type {FrontendDtos} from "@/componsables/apis/FrontendDtos";
import { defineStore } from "pinia";

export const pageStore = defineStore('page', () => {
    const context = ref<FrontendDtos.WmNewsPageVo[]>()
    return {
        context
    };
})
