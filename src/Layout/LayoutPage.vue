<script setup lang="ts">
import SideBar from "@/Layout/SideBar.vue";
</script>

<template>
  <div
      class="w-screen h-screen overflow-hidden"
      style="background-color: #F2F3F5"
  >
    <el-container class="w-full h-full">
      <el-aside width="240px" class="h-full">
        <SideBar />
      </el-aside>
      <el-main>
        <div class="w-full h-full flex flex-col p-4">
          <RouterView />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
:deep(.el-main) {
  padding: 0;
}
</style>
