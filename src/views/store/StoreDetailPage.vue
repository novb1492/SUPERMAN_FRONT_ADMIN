<template>
    <div style="margin-top: 70px;">
        fdfd
    </div>
</template>

<script>
import { requestStoreInfo } from '@/api/market/MarketApi'
import { checkNew } from '@/assets/js/Jslib';
export default {
    mounted() {
        let id = this.$route.query.id;
        requestStoreInfo(id).then(response => {
            this.doneGetInfo(response);
        }).catch(error => {
            let response = error.response;
            let data = response.data;
            if (checkNew(response.status, data.message)) {
                requestStoreInfo(id).then(response => {
                    this.doneGetInfo(response)
                }).catch(error => {
                    this.errorGet(error);
                })
            } else {
                this.errorGet(error);

            }
        });
    },
    methods:{
        doneGetInfo(response){
            console.log(response);
        },
        errorGet(error){
            console.log(error);
        }
    }
}
</script>

<style>
</style>