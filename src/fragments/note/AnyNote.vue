<template>
  <quill-editor
    class="honeydew_note-editor"
    :toolbar="toolbars"
    theme="snow"
    content-type="delta"
    v-model:content="noteContent"
  ></quill-editor>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const noteContent = ref('');

const toolbars = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ align: [] }],

  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ list: 'bullet' }, { list: 'ordered' }],
  [{ script: 'sub' }, { script: 'super' }],

  [{ size: ['small', false, 'large', 'huge'] }],

  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  ['link', 'video', 'image'],
  ['clean'],
];
</script>

<style>
.honeydew_note-editor {
  max-height: 500px;
}
</style>
