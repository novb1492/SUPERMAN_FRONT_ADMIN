<template>
  <div style="margin-top: 70px;">
    <div class="comapnyNumArea">
      <span>사업자번호</span>
      <input type="text" v-model="companynum">
    </div>
    <div>
      <span>대표자명</span>
      <input type="text" v-model="name">
    </div>
    <div>
      <span>개업일</span>
      <input type="date" name="" id="" v-model="date">
    </div>
    <button @click="tryInsert">등록</button>

  </div>
</template>

<script>
import { requestCompanyNumInsert } from "@/api/market/MarketApi";
import { checkNew, errorHandle } from "@/assets/js/Jslib";
export default {
  name: 'RegiCompany',
  data() {
    return {
      companynum: null,
      name: null,
      date: null
    }
  },
  mounted(){
    this.$store.dispatch('NavStore/changeSituation', 0);
  },
  methods: {
    tryInsert() {
      let requestdata = JSON.stringify({
        "companyNum": this.companynum,
        "name": this.name,
        "date": this.date
      });
      requestCompanyNumInsert(requestdata).then(response => {
        this.doneInsert(response.data);
      }).catch(error => {
        let response = error.response;
        let data = response.data;
        if (checkNew(response.status, data.message)) {
          requestCompanyNumInsert(requestdata).then(response => {
            this.doneInsert(response.data)
          }).catch(error => {
            errorHandle(error);
          })
        } else {
          errorHandle(error);
        }
      });
    },
    doneInsert(data) {
      alert(data.message);
      location.href = '/comapny-list?page=1';
    }
  }
}
</script>
