<template>
    <div class="productImgPathArea">
        <h5 class="mt-2">상품이미지</h5>
        <img :src="productImgPath" id="productImgPath" class="productImgPath">
        <br>
        <input type="file" id="img" class="mt-2" name="img" accept=".jpg, .png" @change="uploadThumbNail">
        <br>
    </div>
    <div class="originArea">
        <span>원산지</span>
        <br>
        <input type="text" @input="setOrigin($event.target.value)" :value="origin">
    </div>
    <div class="nameArea">
        <span>상품이름</span>
        <br>
        <input type="text" @input="setName($event.target.value)" :value="name">
    </div>
    <div class="priceArea">
        <span>가격</span>
        <br>
        <input type="text" placeholder="단위문자는,입니다" @input="setPrice($event.target.value)" :value="price">
    </div>
    <Ck5Editor :idName="'productText'" ref="editor"></Ck5Editor>
    <div class="categoryArea" v-if="flag == false">
        <select name="pets" id="pet-select" v-model="category">
            <option :value="cate.id" v-for="(cate, index) in categorys" :key="index">
                {{ cate.name }}
            </option>
        </select>
    </div>
    <div class="categoryArea" v-else>
        <select name="pets" id="pet-select" v-model="category">
            <option value="name">이름</option>
            <option value="addr">주소</option>
        </select>
        <input type="text" v-model="keyword">
        <input type="button" value="검색" @click="search" />
    </div>
    <div id="eventArea">
        <h5>행사 여부</h5>
        <span v-if="eventFlag">
            진행함<input type="checkbox" value="1" id="eventCheck" class="eventCheck" @change="doEvent" checked>
            <button @click="plus">이벤트추가</button>

        </span>
        <span v-else>
            진행함<input type="checkbox" value="1" id="eventCheck" class="eventCheck" @change="doEvent">
        </span>
        <ProductEvent v-for="(n, index) in eventCount" :key="index" :index="index"></ProductEvent>
    </div>
    <button @click="save">상품등록</button>
</template>
<script>
import { requestUploadImg } from '@/api/Etc/EtcApi';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { checkNew, showStoreInfo } from '@/assets/js/Jslib';
import Ck5Editor from '../Ck5Editor.vue';
import ProductEvent from './ProductEvent.vue';

export default {
    props: ["flag"],
    computed: {
        ...mapGetters("ProductStore", {
            categorys: "getCategorys",
            productImgPath: "getProductImgPath",
            eventFlag: 'getEventFlag',
            eventCount: 'getEventCount',
            events: 'getEvents',
            name: 'getName',
            origin: 'getOrigin',
            price: 'getPrice',
            introduce: 'getIntroduce'
        }),
    },
    data() {
        return {
            category: null,
        }
    },
    mounted() {
        this.requestGetCategorys();
        showStoreInfo(this.$route.query.addr,this.$route.query.storeName, this.changeShowMarketInfo);
    },
    methods: {
        ...mapMutations("NavStore", {
            changeShowMarketInfo: "changeShowMarketInfo",
        }),
        ...mapActions("ProductStore", {
            requestGetCategorys: "requestGetCategorys"
        }),
        ...mapMutations("ProductStore", {
            setProductImgPath: "setProductImgPath",
            setEventFlag: 'setEventFlag',
            setEventCount: 'setEventCount',
            setEvents: 'setEvents',
            setEventCancleCount: 'setEventCancleCount',
            setOrigin: 'setOrigin',
            setName: 'setName',
            setPrice: 'setPrice'
        }),
        save() {
            let data = JSON.stringify({
                "category": this.category,
                "origin": this.origin,
                "introduce": this.$refs.editor.getText(),
                "productImgPath": this.productImgPath,
                "price": this.price,
                "name": this.name,
                "id": this.$route.query.storeid,
                "events": this.events
            });
            console.log(data);
            this.$store.dispatch('ProductStore/requestProductSave', data);
        },
        uploadThumbNail() {
            const frm = new FormData();
            frm.append("upload", document.getElementById("img").files[0]);
            requestUploadImg(frm).then(response => {
                let data = response.data;
                this.setProductImgPath(data.message[0]);
            }).catch(error => {
                let response = error.response;
                let data = response.data;
                if (checkNew(response.status, data.message)) {
                    requestUploadImg(frm).then(response => {
                        let data = response.data;
                        this.setProductImgPath(data.message[0]);
                    }).catch(error => {
                        this.catchUploadError(error);
                    });
                }
                else {
                    this.catchUploadError(error);
                }
            });
        },
        doEvent() {
            if (!this.eventFlag) {
                this.setEventFlag(true);
                if (this.eventCount == 0) {
                    this.setEventCount(1);
                }
            } else {
                this.setEventFlag(false);
                this.setEventCount(0);
                this.setEventCancleCount(0);
                this.setEvents([]);
            }
        },
        plus() {
            let count = this.eventCount + 1;
            this.setEventCount(count);
        }
    },
    components: { Ck5Editor, ProductEvent }
}
</script>

<style>
</style>