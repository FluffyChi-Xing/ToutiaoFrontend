<script setup lang="ts">
import { ref } from 'vue'
import {DashBoardTypes} from "@/componsables/apis/DashBoardTypes";
import Appearance from "@/components/Appearance.vue";


/** ===== dashboard初始化-start ===== **/
const defaultDash = [
  {
    icon: 'fensiguanli',
    iconColor: '#55ff6c',
    bgColor: '#aafcb5',
    description: '累计粉丝数量',
    number: 0
  },
  {
    icon: 'yuedu',
    iconColor: '#ff9655',
    bgColor: '#f6b28a',
    description: '累计阅读数量',
    number: 0
  },
  {
    icon: 'shouyiqingkuang',
    iconColor: '#a755ff',
    bgColor: '#ca9bfc',
    description: '累计收益（元）',
    number: 0
  },
  {
    icon: 'yonghuquguan',
    iconColor: '#55aaff',
    bgColor: '#94c8fc',
    description: '取消关注量',
    number: 0
  }
]
const dashData = ref<DashBoardTypes.DashCardType[]>(defaultDash)
/** ===== dashboard初始化-end ===== **/
</script>

<template>
  <div class="w-full h-full flex">
    <el-card class="w-full h-full flex flex-col overflow-y-auto">
      <div class="w-full h-full flex flex-col p-4">
        <!-- 表头筛选 -->
        <div class="w-full h-20 flex flex-col bg-red-950">

        </div>
        <!-- 数据卡片 -->
        <div class="w-full h-auto my-4 grid grid-cols-4 gap-2">
          <div
              v-for="(item, index) in dashData"
              :key="index"
              class="w-full h-auto flex justify-center"
          >
            <Appearance
                :bg-color="item.bgColor"
                :icon-color="item.iconColor"
                :icon="item.icon"
                :description="item.description"
                :number="item.number"
            />
          </div>
        </div>
        <div style="height: calc(100% - 204px)" class="w-full block overflow-y-scroll">
          <!-- 统计折线图 -->
          <div class="w-full h-[400px] mb-4 bg-red-500" />
          <!-- 数据列表 -->
          <div class="w-full h-[300px] bg-yellow-500" />
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
:deep(.el-card__body) {
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
