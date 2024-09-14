<script setup lang="ts">
// 预留接口
import {Delete, Star} from "@element-plus/icons-vue";
import {onMounted, ref, watch} from "vue";
import {computed} from "vue";
import GenerateDialog from "@/components/GenerateDialog.vue";

const props = withDefaults(defineProps<{
  id?: number,
  imgUrl?: string,
  isCollect?: boolean,
  sign?: boolean
}>(), {
  imgUrl: 'src/assets/img/error-img.png',
  id: 1
})


const emits = defineEmits(['collect', 'delete'])
const collect = computed(() => {
  return props.isCollect
})
/** ===== 收藏-start ===== **/
function handleCollect() {
  emits('collect', props.id)
}
/** ===== 收藏-end ===== **/

/** ===== 删除-start ===== **/
const dialogVisible = ref<boolean>(false)
function handleDelete() {
  emits('delete', props.id)
}
function deleteResource() {
  dialogVisible.value = true
}
watch(() => props.sign, () => {
  dialogVisible.value = false
})
/** ===== 删除-end ===== **/

/** ===== 图片-start ===== **/
const url = ref<string>()
function handleInit() {
  url.value = props.imgUrl
}
function handleError() {
  // let random = Math.random() * 10
  url.value = `src/assets/img/error-img.png`
}
onMounted(() => {
  handleInit()
})
/** ===== 图片-end ===== **/
</script>

<template>
  <div class="w-52 h-auto bg-pageBg block item-card rounded-[5px] overflow-hidden hover:shadow-md">
    <div class="w-full h-40 flex">
      <img :src="url" @error="handleError" loading="lazy" alt="" class="w-full h-full flex object-cover">
    </div>
    <div class="w-full h-auto flex flex-col justify-center mt-4 items-center">
      <div class="w-full h-8 flex justify-between">
        <div
            @click="handleCollect"
            class="w-auto h-full flex cursor-pointer hover:text-primary"
        >
          <el-icon>
            <Star
                :style="{color: collect ? '#409EFF' : ''}"
            />
          </el-icon>
          <span class="text-[10px] ml-1">收藏</span>
        </div>
        <div
            @click="deleteResource"
            class="w-auto h-full flex cursor-pointer hover:text-danger"
        >
          <el-icon><Delete /></el-icon>
          <span class="text-[10px] ml-1">删除</span>
        </div>
      </div>
    </div>
  </div>
  <GenerateDialog
      v-model:visible="dialogVisible"
      title="删除素材"
      @confirm:sign="handleDelete"
  >
    <div class="w-full h-auto">
      你确定要删除素材
      <span class="mx-1 text-danger">{{ id }}</span>
      吗 ?
    </div>
  </GenerateDialog>
</template>

<style scoped>
.item-card {
  transition: all ease 0.5s;
  padding: 16px;
  border: 1px solid transparent;
  img {
    border: 1px solid theme('colors.primary');
  }
}
.item-card:hover {
  border-color: theme('colors.primary');
}
</style>
