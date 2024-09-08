<script setup lang="ts">
import {computed} from "vue";

const props = withDefaults(defineProps<{
  fill?: string,
  size?: string, // 图标尺寸，单位 px
  icon: string
}>(), {
  size: '',
  fill: ''
})
const style = computed( () => {
  if (props.size) {
    return 'font-size: ' + props.size + 'px'
  } else {
    return ''
  }
})
const iconName = computed(() => {
  return '#icon-' + props.icon
})
const svgClass = computed(() => {
  if (props.icon) {
    return 'svg-icon ' + props.icon
  } else {
    return 'svg-icon'
  }
})
</script>

<template>
  <svg
      aria-hidden="true"
      :class="svgClass"
      :style="style"
      v-bind="$attrs"
  >
    <use
        :xlink:href="iconName"
        :fill="props.fill"
    />
  </svg>
</template>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  display: inline-block;
  border: none;
}
</style>
