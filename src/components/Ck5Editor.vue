<template>
  <div :id="idName"></div>
</template>
<script>
import MyUploadAdapter from "@/assets/js/MyUploadAdapter.js";
import { markRaw } from 'vue';
import { checkParam } from '@/assets/js/Jslib';

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}
export default {
  props: ['idName','text'],
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
        this.editor = markRaw(newEditor);
      })
      .catch(error => {
        console.log(error);
        alert('에디터생성에 실패했습니다');
      })
  },
  methods:{
    getText(){
      return this.editor.getData();
    },
    setText(text){
      if(checkParam(text)){
        text='';
      }
      this.editor.setData(text);
    }
  }
}
</script>
