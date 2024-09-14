<script setup lang="ts">
import {onMounted, ref} from "vue";
import Pagination from "@/components/Pagination.vue";
import GenerateDialog from "@/components/GenerateDialog.vue";
import {$message} from "@/componsables/element-plus";
import ResourceItem from "@/views/ResourceManage/_components/ResourceItem.vue";
import type {ResourceTypes} from "@/componsables/apis/ResourceTypes";
import {$api} from "@/componsables/api";
import type { UploadProps } from 'element-plus'
import {Plus} from "@element-plus/icons-vue";


/** ===== 表头筛选-start ===== **/
const radios = ref<string>('1')
/** ===== 表头筛选-end ===== **/

/** ===== 表格-start ===== **/
const tableData = ref<ResourceTypes.Resource[]>([])
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
async function handleConfirm(index: boolean) {
  if (index) {
    console.log(imageUrl.value[0])
    await handle2Upload(imageUrl.value[0].raw)
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
async function handleChange(index: string) {
  if (index === '1') {
    $message({
      message: '全部',
      type: 'info'
    })
    isCollection.value = 0
    await getPage();
  } else {
    $message({
      message: '收藏',
      type: 'info'
    })
    isCollection.value = 1
    tableData.value = [] // 暂时清空
    await getPage();
  }
}
/** ===== radio切换-end ===== **/

/** ===== 获取分页-start ===== **/
const pageNo = ref<number>(1)
const isCollection = ref<number>(0)
interface responseVo {
  id: number;
  userId: number;
  url: string;
  type: number;
  isCollection: number;
  createTime: Date;
}
async function getPage() {
  await $api.getList(pageNo.value, isCollection.value).then((res: any) => {
    const data: responseVo[] = res.data.data;
    total.value = res.data.total
    current.value = pageNo.value
    tableData.value.push(...data.map((item: responseVo) => {
      return {
        id: item.id,
        imgUrl: item.url,
        isCollect: item.isCollection === 1,
        sign: false
      }
    }))
  });
}
onMounted(async () => {
  isCollection.value = 0
  await getPage();
})
async function changePage(index: number) {
  pageNo.value = index
  current.value = index
  tableData.value = [] // 暂时清空
  await getPage();
}
/** ===== 获取分页-end ===== **/

/** ===== 素材上传-start ===== **/
const imageUrl = ref<any[]>([])


// 检查图片格式和大小
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    $message.error('图片格式必须是 JPG 或 PNG 格式 !')
    return false
  } else if (rawFile.size / 1024 / 1024 > 1) {
    $message.error('图片尺寸不能超过1M !')
    return false
  }
  return true
}
async function handle2Upload(params: File) {
  await $api.uploadResource(params).then(async (res: any) => {
    if (res.data.code === 200) {
      $message({
        message: '上传成功',
        type: 'success'
      })
      dialogVisible.value = false
      tableData.value = [] // 暂时清空
      imageUrl.value = []
      isCollection.value = 0
      await getPage();
    } else {
      $message({
        message: '上传失败',
        type: 'error'
      })
      imageUrl.value = []
      dialogVisible.value = false
    }
  });
}
function getFile(file: string, fileList: string[]) {
  imageUrl.value = fileList
}
/** ===== 素材上传-end ===== **/
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
                v-if="tableData.length"
                class="w-full h-full grid grid-cols-5 grid-rows-2 gap-2 p-4"
            >
              <div
                  v-for="(item, index) in tableData"
                  :key="index"
                  class="w-full h-full flex"
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
              @change:current-page="changePage"
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
    <div class="w-full h-auto flex flex-col justify-center items-center">
      <span class="w-full h-auto text-xl text-red-500">你确定要上传图片吗 ?</span>
      <div class="w-full h-auto p-4 flex justify-center">
        <el-upload
            ref="upload"
            class="avatar-uploader"
            action="#"
            limit="1"
            :auto-upload="false"
            :file-list="imageUrl"
            :crossorigin="'anonymous'"
            :on-change="getFile"
            accept="image/jpeg,image/png"
            :before-upload="beforeAvatarUpload"
        >
          <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </div>
    </div>
  </GenerateDialog>
</template>

<style scoped>
@import "@/assets/css/element-edit.scss";
:deep(.el-card__body) {
  padding: 0;
  width: 100%;
  height: 100%;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.resource-list {
  border: 1px solid #ebeef5;
}
</style>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
