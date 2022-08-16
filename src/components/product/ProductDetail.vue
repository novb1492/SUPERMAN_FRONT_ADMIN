<template>
    fdfd
    {{categorys}}

</template>
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