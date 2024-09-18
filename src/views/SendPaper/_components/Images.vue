<script setup lang="ts">
import { ref } from 'vue'


const props = withDefaults(defineProps<{
  imgUrl?: string;
}>(), {
  imgUrl: 'src/assets/img/error-img.png'
})
const imageUrl = ref<string>(props.imgUrl)
function handleError() {
  imageUrl.value = 'src/assets/img/error-img.png'
}
</script>

<template>
  <img
      :src="imageUrl"
      alt=""
      @error="handleError"
      loading="lazy"
      class="w-[100px] h-[100px] flex object-cover"
  >
</template>

<style scoped>

</style>
