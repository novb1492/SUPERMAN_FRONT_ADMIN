<template>
    <div :id="idName"></div>
</template>
<script>
import MyUploadAdapter   from "@/assets/js/MyUploadAdapter.js";
export default {
   props:['idName'],
  name: 'Ck5Editor',
  data() {
    return {
        editor:'',
    }
  },
  mounted() {
      window.ClassicEditor
        .create( document.querySelector('#'+this.idName), {
                extraPlugins: [this.MyCustomUploadAdapterPlugin],
            } )
          .then( newEditor  => {
                console.log( 'Editor was initialized', newEditor  );
                this.editor = newEditor ;
            } )
          .catch( error => {
            console.log(error);
        } )    
  },
  methods: {
    MyCustomUploadAdapterPlugin( editor) {
      alert('a');
      editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        // Configure the URL to the upload script in your back-end here!
        return new MyUploadAdapter( loader );
      };
    },
  },
}
</script>
