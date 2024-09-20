<script setup lang="ts">
import {onMounted, ref} from 'vue';
const props = withDefaults(defineProps<{
  id?: number,
  isLoading?: boolean,
  paperImg?: string,
  title?: string,
  desc?: string,
  date?: string,
  tag1?: string,
  tags2?: string
}>(), {
  paperImg: 'src/assets/img/error-img.png',
  title: '暂无标题',
  desc: '文章描述，文章描述，文章描述......',
  tag1: '已发布',
  id: 0,
})

const imgUrl = ref<string>('')
const isShow = ref<boolean>(false)
const emits = defineEmits(['changeCover:index'])


function handleInit() {
  imgUrl.value = props.paperImg
}
function handleError() {
  imgUrl.value = 'src/assets/img/error-img.png'
}
function handleEnter() {
  isShow.value = true
}
function handleLeave() {
  isShow.value = false
}
function handleChange() {
  emits('changeCover:index', props.id)
}
function dateFormat(item: any) {
  let index: number = item.indexOf('T')
  return item.substring(index, -1);
}
onMounted(() => {
  handleInit()
})
</script>

<template>
  <div
      @mouseenter="handleEnter"
      @mouseleave="handleLeave"
      class="w-52 h-60 hover:shadow-md item-card flex relative flex-col rounded-lg overflow-hidden"
  >
    <el-skeleton
        :loading="isLoading"
        :rows="5"
        animated
    >
      <!-- 上传图片悬浮按钮 -->
      <el-button
          v-show="isShow"
          @click="handleChange"
          class="primary-success-btn absolute top-[10px] right-[10px]"
      >
        更改封面
      </el-button>
      <img
          :src="imgUrl"
          alt=""
          loading="lazy"
          style="width: 100%; height: 50%"
          class="object-cover"
          @error="handleError"
      >
      <div class="w-full h-1/2 flex flex-col">
        <div class="w-full h-5 flex px-1 whitespace-pre-line text-ellipsis overflow-hidden">
          <span class="font-bold">{{ title }}</span>
        </div>
        <div
            class="w-full h-14 flex bg-gradient-to-b from-[#FFFFFF00] to-[#4D4D4D99]"
        >
          <span
              v-html="desc"
              class="whitespace-pre-line p-1 select-none text-gray-500 text-ellipsis overflow-hidden w-full h-full text-[10px]"
          />
        </div>
        <div class="w-full h-5 grid mt-1 grid-cols-2 gap-1 px-1">
          <!-- time -->
          <div class="w-full h-full text-[10px] text-gray-500 align-middle">{{ dateFormat(props.date) }}</div>
          <!-- tag-1 -->
          <div class="w-full h-full flex overflow-hidden justify-end">
            <el-tag
                v-if="tag1"
                size="small"
                class="primary_success_tag"
            >
              {{ tag1 }}
            </el-tag>
            <!-- tag-2 -->
            <el-tag
                v-if="tags2"
                size="small"
                class="primary_danger_tag w-full"
            >
              {{ tags2 }}
            </el-tag>
          </div>
        </div>
      </div>
    </el-skeleton>
  </div>
</template>

<style scoped>
@import "@/assets/css/element-edit.scss";
.item-card {
  border: 1px solid #ebeef5;
}
.item-card:hover {
  border-color: theme('colors.primary');
}
</style>
