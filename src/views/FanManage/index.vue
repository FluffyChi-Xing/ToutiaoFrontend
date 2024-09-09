<script setup lang="ts">
import { ref } from 'vue'
import {DashBoardTypes} from "@/componsables/apis/DashBoardTypes";
import Appearance from "@/components/Appearance.vue";
import ReadCharts from "@/views/FanManage/_components/ReadCharts.vue";
import {FanManage} from "@/componsables/apis/FanManage";
import Pagination from "@/components/Pagination.vue";


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

/** ===== 表头筛选-start ===== **/
const date = ref<string>('')
const shortcuts = [
  {
    text: '上周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 7)
      return [start, end]
    },
  },
  {
    text: '上个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 1)
      return [start, end]
    },
  },
  {
    text: '三个月前',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 3)
      return [start, end]
    },
  },
]
/** ===== 表头筛选-end ===== **/

/** ===== 数据列表-start ===== **/
const fanData = ref<FanManage.FanDataTypes[]>()
/** ===== 数据列表-end ===== **/

/** ===== 分页-start ===== **/
const total = ref<number>(0)
const currentPage = ref<number>(1)
const background = ref<boolean>(true)
const hidden = ref<boolean>(true)
/** ===== 分页-end ===== **/

/** ===== 页头筛选-start ===== **/
const headRadio = ref<string>('1')
const headRadioList = [
  {
    label: '粉丝概况',
    value: '1'
  },
  {
    label: '粉丝画像',
    value: '2'
  },
  {
    label: '粉丝列表',
    value: '3'
  }
]
const headDate = ref<string>('')
const headTimer = ref<string>('1')
const timerList = [
  {
    label: '今日',
    value: '1'
  },
  {
    label: '本周',
    value: '2'
  },
  {
    label: '近7天',
    value: '3'
  },
  {
    label: '近30天',
    value: '4'
  }
]
/** ===== 页头筛选-end ===== **/
</script>

<template>
  <div class="w-full h-full flex">
    <el-card class="w-full h-full flex flex-col overflow-y-auto">
      <div class="w-full h-full flex flex-col p-4">
        <!-- 表头筛选 -->
        <div class="w-full h-20 flex flex-col">
          <el-form label-width="auto">
            <el-form-item>
              <el-radio-group v-model="headRadio">
                <el-radio-button
                    v-for="(item, index) in headRadioList"
                    :key="index"
                    :value="item.value"
                >
                  {{ item.label }}
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <div class="w-auto h-auto flex">
                <el-date-picker
                    v-model="headDate"
                    type="datetimerange"
                    :shortcuts="shortcuts"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    class="mr-4 w-60"
                />
                <el-radio-group v-model="headTimer">
                  <el-radio-button
                      v-for="(item, index) in timerList"
                      :key="index"
                      :value="item.value"
                  >
                    {{ item.label }}
                  </el-radio-button>
                </el-radio-group>
              </div>
            </el-form-item>
          </el-form>
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
        <div style="height: calc(100% - 204px)" class="w-full block overflow-y-scroll overflow-x-hidden">
          <!-- 统计折线图 -->
          <div class="w-full h-[400px] mb-4">
            <ReadCharts />
          </div>
          <!-- 数据列表 -->
          <div class="w-full h-[500px] flex flex-col">
            <!-- 表头筛选 -->
            <div class="w-full h-10 mb-4 flex">
              <el-form-item label="数据列表">
                <el-date-picker
                    v-model="date"
                    type="datetimerange"
                    :shortcuts="shortcuts"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                />
              </el-form-item>
            </div>
            <!-- 表格 -->
            <div style="height: calc(100% - 112px)" class="w-full flex flex-col">
              <el-table
                  v-model="fanData"
                  fit
                  stripe
                  border
                  :header-cell-style="{background: '#f5f7fa', color: '#909399', textAlign: 'center'}"
              >
                <el-table-column
                    label="日期"
                    prop="date"
                    width="180"
                />
                <el-table-column
                    label="粉丝数量"
                    prop="account"
                />
                <el-table-column
                    label="阅读数量"
                    prop="read"
                />
                <el-table-column
                    label="收益（元）"
                    prop="payment"
                />
                <el-table-column
                    label="取消关注量"
                    prop="disSub"
                />
                <template #empty>
                  <el-empty
                      description="暂无数据"
                  />
                </template>
              </el-table>
            </div>
            <!-- 分页 -->
            <div class="w-full h-10 flex mt-4 justify-center">
              <Pagination
                  :total="total"
                  :current-page="currentPage"
                  :hide="hidden"
                  :background="background"
              />
            </div>
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
  overflow-y: auto;
}
</style>
