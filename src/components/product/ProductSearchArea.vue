<template lang="">
    <select name="pets" id="pet-select" v-model="category">
        <option :value="cate.id" v-for="(cate, index) in categorys" :key="index">
          {{ cate.name }}
        </option>
      </select>
      <input type="text" v-model="keyword">
      <input type="button" value="검색" @click="search" />
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    props: ['clazzs','url'],
    computed: {
        ...mapGetters("ProductStore", {
            categorys: "getCategorys"
        })
    },
    data() {
        return {
            category: null,
            keyword: null
        };
    },
    methods:{
        search(){
            let changeUrl =`${this.url}page=1&keyword=${this.keyword}&category=${this.category}`;
            this.$router.push(changeUrl);
        }
    }
}
</script>
<style lang="">
    
</style>