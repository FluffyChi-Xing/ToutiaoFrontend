<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import { useRoute } from "vue-router";
import { Document, Location, Odometer, Setting} from "@element-plus/icons-vue";
import LogOut from "@/components/LogOut.vue";
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
        class="el-menu-vertical-demo h-full relative"
        active-text-color="#ffffff"
        style="background-color: transparent"
    >
      <div class="w-full h-24 flex flex-col justify-center items-center">
        <div class="w-1/2 h-1/2 flex menu-header" />
      </div>
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
      <div class="w-full h-24 p-4 absolute bottom-0">
        <div class="w-full h-full flex flex-col items-center justify-center">
          <LogOut />
        </div>
      </div>
    </el-menu>
  </div>
</template>

<style scoped>
:deep(.el-menu) {
  border-right: none;
}
.el-menu {
  .el-menu-item {
    border-radius: 15px;
    overflow: hidden;
    margin-bottom: 10px;
    &:hover {
      background-color: rgba(148, 143, 139, 0.8);
      transition: all ease-in-out 0.5s;
    }
    &.is-active {
      background-color: rgba(148, 143, 139, 0.8);
    }
  }
}
.menu-header {
  background-image: url("@/assets/img/logo_heima_admin@2x.efa65eb.png");
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
