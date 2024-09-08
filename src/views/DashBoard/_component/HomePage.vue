<script setup lang="ts">
import { ref } from 'vue';
import {DashBoardTypes} from "@/componsables/apis/DashBoardTypes";
import Appearance from "@/components/Appearance.vue";
import Pagination from "@/components/Pagination.vue";


/** ===== 仪表渲染-start ===== **/
const defaultCardList = [
  {
    icon: 'zhifeiji',
    description: '推文发布量',
    number: 0,
    iconColor: '#409EFF',
    bgColor: '#c3e2ff'
  },
  {
    icon: 'dianzan',
    description: '点赞数量',
    number: 0,
    iconColor: '#67C23AFF',
    bgColor: '#b0f68e'
  },
  {
    icon: 'shoucang',
    description: '收藏数量',
    number: 0,
    iconColor: '#FFC107FF',
    bgColor: '#FADB82FF'
  },
  {
    icon: 'zhuanfa',
    description: '转发数量',
    number: 0,
    iconColor: '#9422FFFF',
    bgColor: '#B872FAFF'
  }
]
const dashBoard = ref<DashBoardTypes.DashCardType[]>(defaultCardList)
/** ===== 仪表渲染-end ===== **/

/** ===== 仪表数据-start ===== **/
const tableData = ref()
/** ===== 仪表数据-end ===== **/

/** ===== 换页器初始化-start ===== **/
const currentPage = ref<number>(1)
const total = ref<number>(0)
const background = ref<boolean>(true)
/** ===== 换页器初始化-end ===== **/
</script>

<template>
  <div class="w-full h-full flex">
    <el-card class="global-card w-full h-full flex flex-col">
      <div class="w-full h-full flex p-4">
        <div class="w-full h-full flex flex-col">
          <!-- 表头筛选 -->
          <div class="w-full h-10 flex bg-red-950 mb-4" />
          <!-- 仪表卡片 -->
          <div class="w-full h-auto mb-4 grid grid-cols-4 gap-2">
            <div
                v-for="(item, index) in dashBoard"
                :key="index"
                class="w-full h-auto flex justify-center"
            >
              <Appearance
                  :icon="item.icon"
                  :description="item.description"
                  :bg-color="item.bgColor"
                  :icon-color="item.iconColor"
                  :number="item.number"
              />
            </div>
          </div>
          <!-- 概况图表 -->
          <div style="height: calc(100% - 220px)" class="w-full flex flex-col mb-4">
            <el-table
                v-model="tableData"
                :header-cell-style="{background: '#f5f7fa', color: '#909399', textAlign: 'center'}"
                border
                stripe
                fit
            >
              <el-table-column
                  label="序号"
                  prop="index"
                  width="80"
              />
              <el-table-column
                  label="文章名称"
                  prop="title"
              />
              <el-table-column
                  label="阅读量"
                  prop="readCount"
              />
              <el-table-column
                  label="点赞量"
                  prop="likeCount"
              />
              <el-table-column
                  label="收藏量"
                  prop="collectCount"
              />
              <el-table-column
                  label="转发量"
                  prop="forwardCount"
              />
              <el-table-column label="操作" width="100" :fixed="'right'">
                <el-button type="text">详细分析</el-button>
              </el-table-column>
              <template #empty>
                <el-empty
                    description="暂无数据"
                />
              </template>
            </el-table>
          </div>
          <!-- 换页器 -->
          <div class="w-full h-10 flex justify-center">
            <Pagination
                :total="total"
                :current-page="currentPage"
                :background="background"
            />
          </div>
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
}
</style>
