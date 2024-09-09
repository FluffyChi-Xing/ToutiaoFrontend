<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import { useRoute, useRouter } from "vue-router";
import {Document, Edit, FolderOpened, Odometer, User} from "@element-plus/icons-vue";
import LogOut from "@/components/LogOut.vue";


const route = useRoute()
const router = useRouter()
/** ===== 菜单高亮-start ===== **/
const defaultActive = ref("1");
function checkHighLight(e: string) {
  // 解决仪表盘子页面刷新后高亮问题
  if (e.includes('/dashboard')) {
    defaultActive.value = "1";
  }
  if (e.includes('/contentList')) {
    defaultActive.value = "3";
  }
  switch (e) {
    case "/dashboard/home":
      defaultActive.value = "1";
      break;
    case "/sendPaper":
      defaultActive.value = "2";
      break;
    case "/contentList":
      defaultActive.value = "3";
      break;
    case "/resource":
      defaultActive.value = "4";
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

/** ===== 菜单跳转-start ===== **/
function handleSelect(index: string) {
  switch (index) {
    case "1" :
      router.push('/dashboard/home')
          break;
    case "2" :
      router.push('/sendPaper')
          break;
    case '3':
      router.push('/contentList')
          break;
    case '4':
      router.push('/resource')
          break;
  }
}
/** ===== 菜单跳转-end ===== **/
</script>

<template>
  <div class="w-full h-full menu-bg flex flex-col">
    <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo h-full relative"
        active-text-color="#ffffff"
        style="background-color: transparent"
        @select="handleSelect"
    >
      <div class="w-full h-24 flex flex-col justify-center items-center">
        <div class="w-1/2 h-1/2 flex menu-header" />
      </div>
      <el-menu-item index="1">
        <el-icon><Odometer /></el-icon>
        <span>仪表盘</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><Edit /></el-icon>
        <span>发布文章</span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><FolderOpened /></el-icon>
        <span>内容列表</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><Document /></el-icon>
        <span>素材管理</span>
      </el-menu-item>
      <el-menu-item index="5">
        <el-icon><User /></el-icon>
        <span>粉丝管理</span>
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
.menu-bg {
  background-image: url("@/assets/img/dot.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
