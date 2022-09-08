<template lang="">
    <div>
        <button @click="change(1)" :class="clazzs" :disabled="last">다음</button>
        <button @click="change(-1)" :class="clazzs"  :disabled="first">이전</button>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    props: ['clazzs','url'],
    computed: {
        ...mapGetters("basicStore", {
            last: "getLast",
            first: "getFirst"
        }),
    },
    methods:{
        change(num){
            let page = (this.$route.query.page * 1) + num;
            let keyword = this.$route.query.keyword;
            let category = this.$route.query.category;
            let changeUrl =this.url+"page=" + page + "&keyword=" + keyword + "&category=" + category;
            this.$router.push(changeUrl);
        }
    }   
}
</script>
<style lang="">
    
</style>