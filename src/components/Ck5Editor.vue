<template>
  <div :id="idName"></div>
</template>
<script>
import MyUploadAdapter from "@/assets/js/MyUploadAdapter.js";
function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}
export default {
  props: ['idName'],
  name: 'Ck5Editor',
  data() {
    return {
      editor: '',
    }
  },
  mounted() {
    window.ClassicEditor
      .create(document.querySelector('#' + this.idName), {
        extraPlugins: [MyCustomUploadAdapterPlugin],
      })
      .then(newEditor => {
        console.log('Editor was initialized', newEditor);
        this.editor = newEditor;
      })
      .catch(error => {
        console.log(error);
      })
  },
}
</script>
