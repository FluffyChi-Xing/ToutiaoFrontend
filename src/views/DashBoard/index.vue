<script setup lang="ts">

</script>

<template>
  <div class="w-full h-full flex flex-col">
    <el-card class="global-card">
      <div class="w-full h-full flex flex-col p-4">
        <div class="w-ful h-full bg-red-950" />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/mixin";
:deep(.el-card__body) {
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
