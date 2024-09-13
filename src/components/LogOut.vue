<script setup lang="ts">
import { ref } from 'vue'
import {$message} from "@/componsables/element-plus";
import SvgIcon from "@/components/SvgIcon.vue";
import { useRouter } from "vue-router";
import GenerateDialog from "@/components/GenerateDialog.vue";


withDefaults(defineProps<{
  shape?: string
}>(), {
  shape: 'circle'
})


const router = useRouter()
/** ===== 退出登录-start ===== **/
// 用户头像
const defaultAvatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
const userAvatar = ref<string>(defaultAvatar)
const defaultName = ref<string>('admin')
const dialogVisible = ref<boolean>(false)

function handleOut() {
  dialogVisible.value = true
}
function handleConfirm(index: boolean) {
  dialogVisible.value = false
  if (index) {
    $message({
      message: '退出成功',
      type: 'success'
    })
    router.push('/login')
  } else {
    $message({
      message: '取消',
      type: 'info'
    })
  }
}
/** ===== 退出登录-end ===== **/
</script>

<template>
  <div class="w-full h-1/2 flex justify-center">
    <div class="w-1/2 h-full grid grid-cols-2 gap-1 justify-center">
      <el-avatar
          :src="userAvatar"
          :shape="shape"
          class="w-full h-full"
      />
      <div class="w-full h-full flex flex-col items-center">
        <div class="whitespace-nowrap w-full h-auto my-auto overflow-hidden text-ellipsis text-center">{{ defaultName }}</div>
      </div>
    </div>
    <el-divider direction="vertical" style="height: 100%" />
    <div class="w-1/2 h-full flex flex-col items-center justify-center">
      <el-tooltip
          content="退出登录"
          placement="bottom"
          effect="dark"
      >
        <SvgIcon
            @click="handleOut"
            icon="bg-quit"
            size="24"
            class="outline-none cursor-pointer"
        />
      </el-tooltip>
    </div>
    <generate-dialog
        v-model:visible="dialogVisible"
        @confirm:sign="handleConfirm"
    >
      <span class="text-danger">{{ defaultName }}</span>
      您真的要退出吗 ?
    </generate-dialog>
  </div>
</template>

<style scoped>
:deep(.el-button) {
  background-color: transparent;
  border: none;
}
</style>
