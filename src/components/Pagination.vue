<script setup lang="ts">
const props = withDefaults(defineProps<{
  background?: boolean,
  total?: number,
  currentPage?: number,
  hide?: boolean,
}>(), {
  background: false,
  total: 50,
  currentPage: 1,
  hide: true,
})
const emits = defineEmits(['change:currentPage'])

function handleChange(index: number) {
  emits('change:currentPage', index)
}
</script>

<template>
  <div class="w-60 h-full flex">
    <el-pagination
        layout="prev, pager, next"
        :page-count="total"
        :current-page="currentPage"
        :background="background"
        :hide-on-single-page="hide"
        @update:current-page="handleChange"
    />
  </div>
</template>

<style scoped>

</style>
