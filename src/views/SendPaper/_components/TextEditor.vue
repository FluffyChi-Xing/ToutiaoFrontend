<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import {onBeforeUnmount, ref, shallowRef, onMounted, watch} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

/** ===== 富文本编辑器-start ===== **/
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const mode = 'default'
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
// 内容 HTML
const valueHtml = ref<string>('')

// 防抖函数，向父组件传递内容
const emits = defineEmits(['change'])
let timer: any = null
function debounce() {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    emits('change', valueHtml.value)
  }, 500)
  if (editorRef.value === null) return;
}

watch(() => valueHtml.value, () => {
  debounce()
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  // console.log('editor', valueHtml.value)
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
/** ===== 富文本编辑器-end ===== **/
</script>

<template>
  <div class="w-full h-full flex">
    <div
        style="border: 1px solid #ccc"
        class="w-full h-full flex flex-col"
    >
      <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
      />
      <Editor
          style="height: 500px; overflow-y: hidden;"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
