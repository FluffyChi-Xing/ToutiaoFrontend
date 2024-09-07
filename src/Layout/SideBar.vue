<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import { useRoute } from "vue-router";
import { Document, Location, Odometer, Setting} from "@element-plus/icons-vue";
// TODO: 将侧边栏改为递归组件


const route = useRoute()
/** ===== 菜单高亮-start ===== **/
const defaultActive = ref("1");
function checkHighLight(e: string) {
  switch (e) {
    case "1":
      defaultActive.value = "1";
      break;
  }
}
onMounted(() => {
  checkHighLight(route.fullPath)
})
watch(() => route.fullPath, (to: string) => {
  checkHighLight(to)
})
/** ===== 菜单高亮-end ===== **/
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo h-full"
    >
      <div class="w-full h-24" />
      <el-menu-item index="1">
        <el-icon><Odometer /></el-icon>
        <span>仪表盘</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><location /></el-icon>
        <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><document /></el-icon>
        <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>Navigator Four</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
:deep(.el-menu) {
  border-right: none;
}
</style>
