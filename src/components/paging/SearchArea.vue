<template lang="">
    <div>
        <div class="pagingbox">
            <select name="pets" id="pet-select" v-model="category" v-if="flag">
                <option  v-for="(valueAndText, index) in valueAndTexts" :key="index" :value="valueAndText.value">{{valueAndText.text}}</option>
            </select>
            <input type="text" v-model="keyword">
            <input type="button" value="검색" @click="search" />
        </div>
    </div>
</template>
<script>
export default {
    props: ['clazzs','url','flag','valueAndTexts'],
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