<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import TextEditor from "@/views/SendPaper/_components/TextEditor.vue";
import type {ContentListTypes} from "@/componsables/apis/ContentListTypes";
import {$stores} from "@/componsables/stores";
import type {FrontendDtos} from "@/componsables/apis/FrontendDtos";
import {$api} from "@/componsables/api";
import GenerateDialog from "@/components/GenerateDialog.vue";
import ResourceSelector from "@/views/SendPaper/_components/ResourceSelector.vue";
import type {SendPaper} from "@/componsables/apis/SendPaper";
import {$message} from "@/componsables/element-plus";



const pageStore = $stores.pageStore()
/** ===== 富文本编辑器-start ===== **/
const title = ref<string>('')
/** ===== 富文本编辑器-end ===== **/

/** ===== 封面设置-start ===== **/
const tags = ref<string>('')
const channels = ref<string>('')
const imgUrl = ref<string[]>([])
const options = ref<ContentListTypes.ContentOptions[]>([])
const cover = ref<string>('2')
const defaultCover = [
  {
    label: '单图',
    value: '0'
  },
  {
    label: '三图',
    value: '1'
  },
  {
    label: '无图',
    value: '2'
  }
]

const coverNum = computed(() => {
  switch (cover.value) {
    case '0': // 单图
      return 1
    case '1': // 三图
      return 3
    case '2': // 无图
      return 0
    default: // 默认无图
      return 0
  }
})

// 检查封面设置
function checkCover() {
  if (selectedImg.value?.length) {
    switch (selectedImg.value.length) {
      case 1:
        imgUrl.value = selectedImg.value
          cover.value = '0'
        break;
      case 3:
        imgUrl.value = selectedImg.value
          cover.value = '1'
        break;
      case 2:
        imgUrl.value = selectedImg.value
          cover.value = '1'
        break;
      default:
        imgUrl.value = []
          cover.value = '2'
        break;
    }
  }
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

async function initOptions() {
  if (pageStore.channelList?.length) {
    pageStore.channelList?.forEach((item: FrontendDtos.channelDto) => {
      options.value.push({
        label: item.name,
        value: String(item.id)
      })
    })
  } else {
    await gteChannels()
  }
}
// 图片加载失败时，替换为默认图片
function handleError(index: number) {
  imgUrl.value[index] = 'src/assets/img/error-img.png'
}

onMounted(async () => {
  await initOptions()
  checkCover()
})
/** ===== 封面设置-end ===== **/

/** ===== 选择图片-start ===== **/
const dialogVisible = ref<boolean>(false)
const fakeList = [
  {
    id: 1,
    url: 'https://picsum.photos/200/300?1'
  },
  {
    id: 2,
    url: 'https://picsum.photos/200/300?2'
  },
  {
    id: 3,
    url: 'https://picsum.photos/200/300?3'
  },
  {
    id: 4,
    url: 'https://picsum.photos/200/300?4'
  },
  {
    id: 5,
    url: 'https://picsum.photos/200/300?5'
  }
]
const itemList = ref<SendPaper.itemList[]>(fakeList)
const selectedImg = ref<string[]>([]) // 选中图片的下标

function handleSelect() {
  dialogVisible.value = true
}

// 将选中的图片下标转换为图片地址
function index2url(item: string) {
  if (item) {
    const foundItem = fakeList.find((value: SendPaper.itemList) => value.id === Number(item));
    return foundItem ? foundItem.url : 'src/assets/img/error-img.png';
  } else {
    return 'src/assets/img/error-img.png';
  }
}

function handleClose(index: boolean) {
  if (index) {
    dialogVisible.value =false
    checkCover()
    $message({
      message: `已选择了 ${selectedImg.value?.length} 张图片`,
      type: 'success'
    })
  } else {
    dialogVisible.value = false
  }
}

function handleChange(item: string[]) {
  selectedImg.value = item
}
/** ===== 选择图片-end ===== **/
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <el-card class="w-full h-full flex">
      <div class="w-full h-full grid grid-rows-2 gap-2 p-4">
        <!-- 富文本编辑器 -->
        <div class="w-full h-full flex flex-col">
          <!-- 标题设置 -->
          <div class="w-full h-10 flex justify-center items-center">
            <el-form-item
                label="标题"
                class="w-full h-10"
            >
              <el-input
                  v-model="title"
                  clearable
                  placeholder="请输入标题"
                  maxlength="40"
                  show-word-limit
                  class="w-full"
                  prefix-icon="Edit"
              />
            </el-form-item>
          </div>
          <!-- banner pane -->
          <div class="w-full h-10 flex justify-end">
            <el-tooltip
                effect="dark"
                content="选择封面"
                placement="bottom"
            >
              <el-button
                  icon="Picture"
                  class="w-10 h-10 outline-none primary-success-btn"
                  @click="handleSelect"
              />
            </el-tooltip>
          </div>
          <!-- 文本编辑器 -->
          <div
              style="height: calc(100% - 80px)"
              class="w-full flex flex-col"
          >
            <TextEditor />
          </div>
        </div>
        <!-- 封面设置 -->
        <div class="w-full h-full flex flex-col ">
          <div class="w-full h-auto flex flex-col">
            <el-form
                label-width="auto"
                inline
            >
              <el-form-item label="标签">
                <el-input
                    v-model="tags"
                    placeholder="请输入标签"
                    clearable
                    style="width: 240px"
                    maxlength="20"
                    show-word-limit
                />
              </el-form-item>
              <el-form-item label="频道">
                <el-select
                    v-model="channels"
                    placeholder="请选择频道"
                    style="width: 240px"
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
            <el-form-item
                label="封图"
                class="mt-2"
            >
              <el-radio-group
                  v-model="cover"
                  style="width: 240px"
              >
                <el-radio-button
                    v-for="(item, index) in defaultCover"
                    :key="index"
                    :value="item.value"
                >
                  {{ item.label }}
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </div>
          <div style="height: calc(100% - 72px)" class="w-full flex flex-col">
            <div class="w-full h-[200px] flex justify-center p-4">
              <div
                  v-for="item in coverNum"
                  :key="item"
                  class="w-[200px] h-full flex mr-2 flex-col"
              >
                <img
                    :src="index2url(imgUrl[item - 1])"
                    alt=""
                    loading="lazy"
                    @error="handleError(item)"
                    class="img-bg w-full h-full object-cover"
                >
              </div>
            </div>
            <div class="w-full h-10 flex justify-end mt-auto">
              <div class="w-auto h-full flex">
                <el-button icon="Select" class="primary-success-btn mr-2">提交</el-button>
                <el-button icon="Document" class="primary-danger-btn">存入草稿</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <GenerateDialog
        v-model:visible="dialogVisible"
        title="选择图片"
        @confirm:sign="handleClose"
    >
      <ResourceSelector
          :sign="dialogVisible"
          :item-list="itemList"
          @change="handleChange"
      />
    </GenerateDialog>
  </div>
</template>

<style scoped>
@import "@/assets/css/element-edit.scss";
:deep(.el-card__body) {
  padding: 0;
  width: 100%;
  height: 100%;
}
:deep(.el-form-item) {
  margin-bottom: 0;
}
.img-bg {
  border: 1px solid #ccc;
}
</style>
