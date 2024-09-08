<script setup lang="ts">
import {computed} from "vue";
import SvgIcon from "@/components/SvgIcon.vue";

const props = withDefaults(defineProps<{
  bgColor?: string,
  iconColor?: string,
  icon?: string,
  number?: number,
  description?: string
}>(), {
  description: '描述',
  number: 0,
  icon: 'bg-quit',
  iconColor: '#31a7ff',
  bgColor: '#84bffc'
})

const IconColor = computed(() => {
  return props.iconColor ? `bg-[${props.iconColor}]` : 'bg-red-950'
})
const BgColor = computed(() => {
  return props.bgColor ? `bg-[${props.bgColor}]` : 'bg-red-950'
})
</script>

<template>
  <div
      class="w-60 h-auto grid grid-cols-4 gap-2 p-4 rounded-[10px]"
      :class="BgColor"
  >
    <div class="w-full h-auto flex col-span-1 flex-col justify-center items-center">
      <div
          class="w-[50px] h-[50px] flex rounded-[25px]"
          :class="IconColor"
      >
        <SvgIcon
            :icon="props.icon"
            size="30"
        />
      </div>
    </div>
    <div class="col-span-3 w-full h-[60px] flex flex-col">
      <div class="w-full h-1/2 flex whitespace-nowrap text-ellipsis overflow-hidden">
        <span
            class="text-xl font-bold"
            :class="`text-[${props.iconColor}]`"
        >
          {{ number }}
        </span>
      </div>
      <div class="w-full h-1/2 flex whitespace-nowrap text-ellipsis overflow-hidden">
        <span class="text-gray-600 text-[15px]">{{ description }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
