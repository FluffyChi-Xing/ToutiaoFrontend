<script setup lang="ts">
import { ref } from 'vue';
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
  paperImg: 'https://picsum.photos/200/300?1',
  title: '暂无标题',
  desc: '文章描述，文章描述，文章描述......',
  date: '2023-09-19',
  tag1: '已发布',
  id: 0,
})


const isShow = ref<boolean>(false)
const emits = defineEmits(['changeCover:index'])
function handleEnter() {
  isShow.value = true
}
function handleLeave() {
  isShow.value = false
}
function handleChange() {
  emits('changeCover:index', props.id)
}
</script>

<template>
  <div
      @mouseenter="handleEnter"
      @mouseleave="handleLeave"
      class="w-52 h-60 hover:shadow-md flex relative flex-col rounded-lg overflow-hidden"
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
          :src="paperImg"
          alt=""
          loading="lazy"
          style="width: 100%; height: 50%; object-fit: cover"
      >
      <div class="w-full h-1/2 flex flex-col">
        <div class="w-full h-5 flex px-1 whitespace-pre-line text-ellipsis overflow-hidden">
          <span class="font-bold">{{ title }}</span>
        </div>
        <div
            class="w-full h-16 flex bg-gradient-to-b from-[#FFFFFF00] to-[#4D4D4D99]"
        >
          <span class="whitespace-pre-line select-none text-elli p-1 overflow-hidden w-full h-full text-[10px]">{{ desc }}</span>
        </div>
        <div class="w-full h-5 grid mt-1 grid-cols-3 gap-1 p-1">
          <!-- time -->
          <div class="w-full h-full text-[10px] text-gray-500 align-middle">{{ date }}</div>
          <!-- tag-1 -->
          <div class="w-full h-full flex">
            <el-tag
                v-if="tag1"
                size="small"
                class="primary_success_tag"
            >
              {{ tag1 }}
            </el-tag>
          </div>
          <!-- tag-2 -->
          <div class="w-full h-full flex">
            <el-tag
                v-if="tags2"
                size="small"
                class="primary_danger_tag"
            >
              {{ tag1 }}
            </el-tag>
          </div>
        </div>
      </div>
    </el-skeleton>
  </div>
</template>

<style scoped>
@import "@/assets/css/element-edit.scss";
</style>
