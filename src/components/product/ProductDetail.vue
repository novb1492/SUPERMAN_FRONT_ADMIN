<template>
    fdfd
</template>
{{categorys}}
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    props: ['flag'],
    computed: {
        ...mapGetters('ProductStore', {
            categorys: 'getCategorys'
        }),
    },
    mounted(){
        this.requestGetCategorys();
    },
    methods:{
         ...mapActions('ProductStore', {
            requestGetCategorys: 'requestGetCategorys',
        }),
    }
}
</script>

<style>
</style>