<script setup lang="ts">
import {onMounted, ref} from 'vue';
import PaperItem from "@/views/ContentList/_component/PaperItem.vue";
import type {ContentListTypes} from "@/componsables/apis/ContentListTypes";
import {$message} from "@/componsables/element-plus";
import {$api} from "@/componsables/api";
import GenerateDialog from "@/components/GenerateDialog.vue";
import {Plus} from "@element-plus/icons-vue";
import Pagination from "@/components/Pagination.vue";
import type {FrontendDtos} from "@/componsables/apis/FrontendDtos";
import {$stores} from "@/componsables/stores";

/** ===== 文章筛选表单-start ===== **/
const paperStatus = ref<string>('9')
const defaultList = [
  {
    label: '全部',
    value: '9'
  },
  {
    label: '草稿',
    value: '0'
  },
  {
    label: '待审核',
    value: '1'
  },
  {
    label: '审核通过',
    value: '8'
  },
  {
    label: '未过审',
    value: '2'
  }
]
const radioList = ref<ContentListTypes.ContentItemTypes[]>(defaultList)
const keyWord = ref<string>('')
const select = ref<string>('1')
const options = ref<ContentListTypes.ContentOptions[]>([])
async function handleSearch() {
  if (keyWord.value) {
    initData()
    await getPage();
  } else {
    $message({
      message: '请输入关键字',
      type: 'warning'
    })
  }
}
function initData() {
  response.value = []
  pageStore.context = []
}
async function handleClear() {
  keyWord.value = ''
  initData()
  await getPage();
}

async function changeStatus() {
  initData()
  await getPage();
}

/**
 * 获取频道列表
 */
async function gteChannels() {
  await $api.getChannelList().then((res: any) => {
    pageStore.channelList = res.data.data
    res.data.data?.forEach((item: FrontendDtos.channelDto) => {
      options.value.push({
        label: item.name,
        value: String(item.id)
      })
    })
  })
}
async function changeChannel() {
  initData()
  await getPage()
}
onMounted(async () => {
  await gteChannels()
})
/** ===== 文章筛选表单-end ===== **/

/** ===== 封面更改-start ===== **/
const dialogVisible = ref<boolean>(false)
const coverImage = ref<string>('')
function handleChange(index: number) {
  // console.log('更改封面：', index)
  dialogVisible.value = true
}
function handleConfirm(index: boolean) {
  if (index) {
    dialogVisible.value = false
    $message({
      message: '更改成功',
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
/** ===== 封面更改-end ===== **/

/** ===== 分页-start ===== **/
const pageNo = ref<number>(1)
const total = ref<number>(10)
const pageSize = 10
const response = ref<FrontendDtos.WmNewsPageVo[]>([])
const background = ref<boolean>(true)
const current = ref<number>(1)
const hidden = ref<boolean>(true)
const pageStore = $stores.pageStore()

async function getPage() {
  const req: FrontendDtos.WmNewsPageDto = {
    page: pageNo.value,
    size: pageSize,
    status: Number(paperStatus.value),
    beginPubDate: null,
    endPubDate: null,
    channelId: Number(select.value),
    keyword: keyWord.value
  }
  await $api.getPaperList(req).then((res: any) => {
    pageStore.context = res.data.data
    pageStore.context?.forEach((item: FrontendDtos.WmNewsPageVo) => {
      response.value.push({
        ...item,
        content: JSON.parse(item.content)
      })
    })
    // console.log('文章列表：', response.value)
  })
}
onMounted(async () => {
  await getPage()
})
/** ===== 分页-end ===== **/
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <el-card class="global-card w-full h-full flex">
      <div class="w-full h-full flex flex-col p-4">
        <!-- 筛选 -->
        <div class="w-full h-24 mb-4 flex flex-col">
          <el-form
              label-width="auto"
          >
            <el-form-item label="文章状态">
              <el-radio-group
                  v-model="paperStatus"
                  @change="changeStatus"
              >
                <el-radio
                    v-for="(item, index) in radioList"
                    :key="index"
                    :value="item.value"
                >
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <el-form
              label-width="auto"
              inline
          >
            <el-form-item label="关键字">
              <el-input
                  v-model="keyWord"
                  placeholder="请输入关键字"
                  clearable
                  class="w-60"
                  @keydown.enter="handleSearch"
                  @clear="handleClear"
              />
            </el-form-item>
            <el-form-item label="频道列表">
              <el-select
                  v-model="select"
                  placeholder="请选择频道"
                  style="width: 240px"
                  @change="changeChannel"
              >
                <el-option
                    v-for="(item, index) in options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <el-divider direction="horizontal" class="w-full" />
        <div style="height: calc(100% - 202px)" class="w-full flex overflow-y-auto">
          <div
              v-if="response.length"
              class="grid grid-cols-5 gap-2 w-full h-full"
          >
            <div
                v-for="(item, index) in response"
                :key="index"
                class="col-span-1 w-full h-auto flex"
            >
              <PaperItem
                  :paper-img="item.images"
                  :title="item.title"
                  :date="item.publishTime"
                  :desc="item.content[0].value"
                  :tag1="item.status === 9 ? item.reason : ''"
                  :tags2="item.status === 9 ? '' : item.reason"
                  @change-cover:index="handleChange"
                  class="mb-2"
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
      @confirm:sign="handleConfirm"
      title="更改封面"
  >
    <div class="w-full h-[200px] flex flex-col">
      <span class="text-danger">你确定要更改封面吗 ?</span>
      <el-upload
          class="avatar-uploader mx-auto"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
      >
        <img v-if="coverImage" :src="coverImage" class="avatar"  alt=""/>
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </div>
  </GenerateDialog>
</template>

<style scoped>
:deep(.el-card__body) {
  width: 100%;
  height: 100%;
  padding: 0;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
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
