<template>
  <div class="comapnyNumArea">
      <span>사업자번호</span>
      <input type="text" v-model="companynum" :disabled="dFlag">
    </div>
    <div>
      <span>대표자명</span>
      <input type="text" v-model="name" :disabled="dFlag">
    </div>
    <div>
      <span>개업일</span>
      <input type="date" name="" id="" v-model="date" :disabled="dFlag">
    </div>
    <button :hidden="flag||!dFlag" @click="changeDisabled" >수정</button>
</template>

<script>
export default {
    props: ['companyinfo','flag'],
    data() {
    return {
      companynum: this.companyinfo.num,
      name: this.companyinfo.name,
      date: this.companyinfo.openDate,
      dFlag:true
    }
  },
  methods:{
    changeDisabled(){
        this.dFlag=false;
    }
  }
}
</script>

<style>

</style>