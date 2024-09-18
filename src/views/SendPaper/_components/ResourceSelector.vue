<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import type {SendPaper} from "@/componsables/apis/SendPaper";
import Images from "@/views/SendPaper/_components/Images.vue";
const props = withDefaults(defineProps<{
  itemList?: SendPaper.itemList[];
  sign?: boolean;
}>(), {

})




/** ===== 素材选择器-start ===== **/
const localList = ref<SendPaper.itemList[]>()
const selected = ref<string[]>([])
const emits = defineEmits(['change'])

function initList() {
  localList.value = props.itemList
}
function destroyed() {
  selected.value = []
}

// 选中回调
function handleChange() {
  emits('change', selected.value)
}

onMounted(() => {
  initList()
})
// 处理卸载后仍然选中的问题
watch(() => props.sign, () => {
  if (!props.sign) destroyed()
})
/** ===== 素材选择器-end ===== **/
</script>

<template>
  <div class="w-full h-auto max-h-60 flex flex-col overflow-y-auto">
    <el-checkbox-group
        v-if="localList?.length"
        v-model="selected"
        @change="handleChange"
        max="3"
        class="w-full h-full grid grid-cols-4 gap-2"
    >
      <el-checkbox
          v-for="(item, index) in localList"
          :key="index"
          :value="String(item.id)"
          class="w-full h-full flex mb-2 relative overflow-hidden"
      >
        <template #default>
          <div class="w-full h-full flex bg-gray-300">
            <Images
                :img-url="item.url"
            />
          </div>
        </template>
      </el-checkbox>
    </el-checkbox-group>
    <div
        v-else
        class="w-full h-full flex flex-col justify-center items-center"
    >
      <el-empty
          description="暂无数据"
      />
    </div>
  </div>
</template>

<style scoped>
:deep(.el-checkbox__input) {
  position: absolute;
  top: 5px;
  right: 5px;
}
:deep(.el-form-item__content) {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
}
:deep(.el-checkbox) {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #ebeef5;
}
:deep(.el-checkbox:hover) {
  border-color: theme('colors.primary');
}
:deep(.el-checkbox__label) {
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
