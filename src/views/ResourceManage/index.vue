<script setup lang="ts">
import { ref } from "vue";
import Pagination from "@/components/Pagination.vue";
import GenerateDialog from "@/components/GenerateDialog.vue";
import {$message} from "@/componsables/element-plus";
import ResourceItem from "@/views/ResourceManage/_components/ResourceItem.vue";
import {ResourceTypes} from "@/componsables/apis/ResourceTypes";


/** ===== 表头筛选-start ===== **/
const radios = ref<string>('1')
/** ===== 表头筛选-end ===== **/

/** ===== 表格-start ===== **/
const defaultItem = [
  {
    id: 1,
    imgUrl: 'https://picsum.photos/200/300?1',
    isCollect: false,
    sign: false
  },
  {
    id: 2,
    imgUrl: 'https://picsum.photos/200/300?2',
    isCollect: true,
    sign: false
  },
  {
    id: 3,
    imgUrl: 'https://picsum.photos/200/300?3',
    isCollect: false,
    sign: false
  }
]
const tableData = ref<ResourceTypes.Resource[]>(defaultItem)
const isLoading = ref<boolean>(false)
/** ===== 表格-end ===== **/

/** ===== 分页-start ===== **/
const total = ref<number>(3)
const current = ref<number>(1)
const background = ref<boolean>(true)
const hidden = ref<boolean>(false)
/** ===== 分页-end ===== **/

/** ===== 上传图片-start ===== **/
const dialogVisible = ref<boolean>(false)
function handleUpload() {
  dialogVisible.value = true
}
function handleConfirm(index: boolean) {
  if (index) {
    dialogVisible.value = false
    $message({
      message: '上传成功',
      type: 'success'
    })
  } else {
    dialogVisible.value = false
    $message({
      message: '取消',
      type: 'info'
    })
  }
}
/** ===== 上传图片-end ===== **/

/** ===== 收藏素材-start ===== **/
function handleCollect(index: number) {
  if (index) {
    tableData.value.find((item: ResourceTypes.Resource) => {
      if (item.id === index) {
        item.isCollect = !item.isCollect
        if (item.isCollect) {
          $message({
            message: '收藏成功',
            type: 'success'
          })
        } else {
          $message({
            message: '取消收藏',
            type: 'info'
          })
        }
      }
    })
  }
}
/** ===== 收藏素材-end ===== **/

/** ===== 删除素材-start ===== **/
function handleDelete(index: number) {
  if (index) {
    // TODO: 发送删除请求
    tableData.value.find((item: ResourceTypes.Resource) => {
      if (item.id === index) {
        item.sign = !item.sign
      }
    })
    $message({
      message: '删除成功',
      type: 'success'
    })
  }
}
/** ===== 删除素材-end ===== **/

/** ===== radio切换-start ===== **/
function handleChange(index: string) {
  if (index === '1') {
    $message({
      message: '全部',
      type: 'info'
    })
  } else {
    $message({
      message: '收藏',
      type: 'info'
    })
  }
}
/** ===== radio切换-end ===== **/
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <el-card class="w-full h-full">
      <div class="w-full h-full flex flex-col p-4">
        <!-- 表头筛选 -->
        <div class="w-full h-10 flex justify-between mb-4">
          <div class="w-au h-full flex">
            <el-radio-group
                v-model="radios"
                @change="handleChange"
            >
              <el-radio-button value="1">全部</el-radio-button>
              <el-radio-button value="2">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <div class="w-auto h-full flex">
            <div class="w-auto px-2 h-full flex flex-col items-center">
              <div class="w-auto h-auto my-auto text-gray-500 text-[10px] align-middle text-center">
                已上传
                <span class="text-danger mx-1">{{ total }}</span>
                张图片
              </div>
            </div>
            <div class="w-au h-full flex flex-col items-center">
              <el-button @click="handleUpload" icon="Upload" type="primary" class="my-auto">上传图片</el-button>
            </div>
          </div>
        </div>
        <!-- 表格 -->
        <div style="height: calc(100% - 112px)" class="w-full flex flex-col resource-list">
          <el-skeleton
              animated
              :rows="10"
              :loading="isLoading"
              class="w-full h-full"
          >
            <div
                v-if="tableData"
                class="w-full h-full grid grid-cols-5 p-4 gap-2"
            >
              <div
                  v-for="(item, index) in tableData"
                  :key="index"
                  class="col-span-1 w-full h-auto mb-2 flex flex-col overflow-y-auto"
              >
                <ResourceItem
                    :id="item.id"
                    :img-url="item.imgUrl"
                    :is-collect="item.isCollect"
                    :sign="item.sign"
                    @collect="handleCollect"
                    @delete="handleDelete"
                />
              </div>
            </div>
            <div
                v-else
                class="w-full h-full flex flex-col justify-center items-center"
            >
              <el-empty
                  description="暂无数据"
              />
            </div>
          </el-skeleton>
        </div>
        <!-- 分页 -->
        <div class="w-full h-10 flex justify-center items-center mt-4">
          <Pagination
              :total="total"
              :current-page="current"
              :background="background"
              :hidden="hidden"
          />
        </div>
      </div>
    </el-card>
  </div>
  <GenerateDialog
      v-model:visible="dialogVisible"
      title="上传图片"
      @confirm:sign="handleConfirm"
  >
    <span>你确定要上传图片吗 ?</span>
  </GenerateDialog>
</template>

<style scoped>
:deep(.el-card__body) {
  padding: 0;
  width: 100%;
  height: 100%;
}
.resource-list {
  border: 1px solid #ebeef5;
}
</style>
