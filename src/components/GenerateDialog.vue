<script setup lang="ts">
import {computed, ref} from "vue";
import {$message} from "@/componsables/element-plus";

const props = withDefaults(defineProps<{
  visible: boolean,
  isDefault?: boolean,
  title?: string,
  isShowClose?: boolean,
  width?: string
}>(), {
  visible: false,
  isDefault: true,
  title: '提示',
  isShowClose: true,
  width: '500'
})
const isConfirm = ref<boolean>(false)
const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emits('update:visible', val)
})
function handleCancel() {
  dialogVisible.value = false
  $message({
    message: '取消',
    type: 'info'
  })
}
const emits = defineEmits(['confirm:sign', 'update:visible'])
function handleConfirm() {
  isConfirm.value = true
  emits('confirm:sign', isConfirm.value)
}
</script>

<template>
  <div class="w-auto h-auto flex">
    <el-dialog
        v-model="dialogVisible"
        :title="props.title"
        :show-close="props.isShowClose"
        :width="props.width"
    >
      <template #title>
        <div class="text-xl font-bold">{{ title }}</div>
      </template>
      <slot />
      <template #footer>
        <div class="w-full h-auto flex justify-end">
          <el-button class="primary-danger-btn" icon="CircleClose" @click="handleCancel">取消</el-button>
          <el-button class="primary-success-btn" icon="Select" @click="handleConfirm">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/element-edit";
</style>
