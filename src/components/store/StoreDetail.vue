<template>
    <div class="row">
        <div class="col">
            <h5 class="mt-2">매장을 대표하는 사진을 업로드해주세요</h5>
            <img :src="thumbnail" id="thumbnail" class="storeThumbnail">
            <br>
            <input type="file" id="img" class="mt-2" name="img" accept=".jpg, .png" @change="uploadThumbNail">
            <br>
            <span class="mt-2">상호</span>
            <input type="text" class="ml135 mt-2" id="storeName" placeholder="상호" @input="setName($event.target.value)"
                :value="name" :disabled="flag" />
            <button id="storeNameTry" @click="activate('storeName')" v-if="flag">수정</button>
            <button id="storeNameConfrim" hidden>확인</button>
            <button id="storeNameCancle" hidden @click="activateCancle('storeName')">취소</button>
            <br>
            <span>오픈시간</span>
            <input type="time" class="ml135 mt-2" id="openTime" placeholder="오픈시간"
                @input="setOpentime($event.target.value)" :value="opentime" :disabled="flag" />
            <button id="openTimeTry" @click="activate('openTime')" v-if="flag">수정</button>
            <button id="openTimeConfrim" hidden>확인</button>
            <button id="openTimeCancle" @click="activateCancle('openTime')" hidden>취소</button>
            <br>
            <span>마감시간</span>
            <input type="time" class="ml135 mt-2 mb-2" id="closeTime" placeholder="마감시간"
                @input="setClosetime($event.target.value)" :value="closetime" :disabled="flag" />
            <button id="closeTimeTry" @click="activate('closeTime')" v-if="flag">수정</button>
            <button id="closeTimeConfrim" hidden>확인</button>
            <button id="closeTimeCancle" @click="activateCancle('closeTime')" hidden>취소</button>
            <br>
            <span>간단한 가게 설명을 적어주세요</span>
            <ck-5-editor :idName="'editor'" ref="editor">
            </ck-5-editor>
        </div>
        <div class="col">
            <kakao-post-code :width="400" :height="300" ref="kpostCode" v-on:resultPost="resultPost"></kakao-post-code>
            <span>우편번호</span>
            <input type="text" class="ml105 mt-2" id="postcode" placeholder="우편번호" v-model="postcode" disabled />
            <br>
            <span>주소</span><input type="text" class="ml135 mt-2" id="address" placeholder="주소" v-model="addr"
                disabled />
            <br>
            <span>상세주소</span><input type="text" class="ml105 mt-2" id="detailAddress" placeholder="상세주소"
                @input="setDetailAddr($event.target.value)" :value="detailAddr" :disabled="flag" />
            <button id="detailAddressTry" @click="activate('detailAddress')" v-if="flag">수정</button>
            <button id="detailAddressConfrim" hidden>확인</button>
            <button id="detailAddressCancle" @click="activateCancle('detailAddress')" hidden>취소</button>
            <br>
            <span>최소배달금액(원)</span>
            <input type="text" class="ml105 mt-2" id="minPrice" placeholder="최소배달금액"
                @input="setMinPrice($event.target.value)" :value="minPrice" :disabled="flag" />
            <button id="minPriceTry" @click="activate('minPrice')" v-if="flag">수정</button>
            <button id="minPriceConfrim" hidden>확인</button>
            <button id="minPriceCancle" @click="activateCancle('minPrice')" hidden>취소</button>
            <br>
            <span>최대배달반경(km)</span>
            <input type="text" class="ml80 mt-2" id="deliverRadius" placeholder="최대배달반경" @keyup="showCircle"
                @input="setRadius($event.target.value)" :value="radius" :disabled="flag" />
            <button id="deliverRadiusTry" @click="activate('deliverRadius')" v-if="flag">수정</button>
            <button id="deliverRadiusConfrim" hidden>확인</button>
            <button id="deliverRadiusCancle" @click="activateCancle('deliverRadius')" hidden>취소</button>
            <br>
        </div>
        <div class="col">
            <kakao-map :width="300" :height="300" ref="kmap"></kakao-map>
            <span>매장전화번호</span>
            <input type="text" class="ml80 mt-2" id="tel" @input="setTel($event.target.value)" :value="tel"
                :disabled="flag">
            <button id="telTry" @click="activate('tel')" v-if="flag">수정</button>
            <button id="telConfrim" hidden>확인</button>
            <button id="telCancle" @click="activateCancle('tel')" hidden>취소</button>
            <br>
            <span>사업자번호</span>
            <input type="text" class="ml80 mt-2" id="companynum" @input="setCompanynum($event.target.value)"
                :value="companynum" :disabled="flag">
            <button id="companynumTry" @click="activate('companynum')" v-if="flag">수정</button>
            <button id="companynumConfrim" hidden>확인</button>
            <button id="companynumCancle" @click="activateCancle('companynum')" hidden>취소</button>
            <input type="button" value="가맹점 등록" @click="regiStore" v-if="flag == false">
        </div>
    </div>
</template>

<script>
import { requestStoreInsert } from "@/api/market/MarketApi";
import { requestUploadImg } from "@/api/Etc/EtcApi";
import KakaoPostCode from '@/components/KakaoPostCode.vue';
import Ck5Editor from '@/components/Ck5Editor.vue';
import KakaoMap from '@/components/KakaoMap.vue';
import { mapActions, mapGetters } from "vuex";
import { checkNew } from "@/assets/js/Jslib";
export default {
    props: ['flag', 'storeInfo'],
    components: { KakaoPostCode, Ck5Editor, KakaoMap },
    name: "RegiStorePage",
    watch: {
        'randDone'() {
            //에디터에 값이 미리 있어야 하므로 
            //watch를 이용해 값 변환감지를 한뒤 부여해준다
            //이렇게하는 이유는 에디터 호출이 값이 들어가기 전에 끝난다
            this.$refs.editor.setText(this.text);
            let data = new Object;
            data.addr = this.addr;
            data.postcode = this.postcode;
            this.resultPost(data);
        }
    },
    data() {
        return {
            marker: null,
            circle: null,
            result: null,
            originVal: null
        }
    },
    computed: {
        ...mapGetters('kmapStore', {
            geocoder: 'getGeocoder',
            map: 'getMap'
        }),
        ...mapGetters('MarketStore', {
            thumbnail: 'getThumbnail',
            addr: 'getAddr',
            detailAddr: 'getDetailAddr',
            postcode: 'getPostcode',
            companynum: 'getCompanynum',
            opentime: 'getOpentime',
            closetime: 'getClosetime',
            tel: 'getTel',
            minPrice: 'getMinPrice',
            text: 'getText',
            name: 'getName',
            storeId: 'getStoreId',
            radius: 'getRadius',
            randDone: 'getRandDone'
        }),
        ...mapGetters('NavStore', {
            role: 'getRole'
        })

    },
    methods: {
        activate(kind) {
            if (kind === 'storeName') {
                this.originVal = this.name;
            } else if (kind === 'openTime') {
                this.originVal = this.opentime;
            } else if (kind === 'closeTime') {
                this.originVal = this.closetime;
            } else if (kind === 'detailAddress') {
                this.originVal = this.detailAddr;
            } else if (kind === 'minPrice') {
                this.originVal = this.minPrice;
            } else if (kind === 'deliverRadius') {
                this.originVal = this.radius;
            } else if (kind === 'tel') {
                this.originVal = this.tel;
            } else if (kind === 'companynum') {
                this.originVal = this.companynum;
            }
            /**
             * 변수 많이 만들기 싫어서 dom접근 했습니다
             * **/
            document.getElementById(kind + 'Try').hidden = true;
            document.getElementById(kind + 'Confrim').hidden = false;
            document.getElementById(kind + 'Cancle').hidden = false;
            document.getElementById(kind).disabled = false;


        },
        activateCancle(kind) {
            if (kind == 'storeName') {
                this.setName(this.originVal);
            } else if (kind === 'openTime') {
                this.setOpentime(this.originVal);
            } else if (kind === 'closeTime') {
                this.setClosetime(this.originVal);
            } else if (kind === 'detailAddress') {
                this.setDetailAddr(this.originVal);
            } else if (kind === 'minPrice') {
                this.setMinPrice(this.originVal);
            } else if (kind === 'deliverRadius') {
                this.setRadius(this.originVal);
            } else if (kind === 'tel') {
                this.setTel(this.originVal);
            } else if (kind === 'companynum') {
                this.setCompanynum(this.originVal);
            }
            /**
            * 변수 많이 만들기 싫어서 dom접근 했습니다
            * **/
            document.getElementById(kind + 'Try').hidden = false;
            document.getElementById(kind + 'Confrim').hidden = true;
            document.getElementById(kind + 'Cancle').hidden = true;
            document.getElementById(kind).disabled = true;


        },
        ...mapActions('MarketStore', {
            setThumbnail: 'setThumbnail',
            setAddr: 'setAddr',
            setDetailAddr: 'setDetailAddr',
            setPostcode: 'setPostcode',
            setCompanynum: 'setCompanynum',
            setOpentime: 'setOpentime',
            setClosetime: 'setClosetime',
            setTel: 'setTel',
            setMinPrice: 'setMinPrice',
            setText: 'setText',
            setName: 'setName',
            setStoreId: 'setStoreId',
            setRadius: 'setRadius'
        }),
        resultPost(data) {
            this.setAddr(data.addr);
            this.setPostcode(data.postcode);
            this.geocoder.addressSearch(data.addr, (results, status) => {
                if (status == window.daum.maps.services.Status.OK) {
                    if (this.marker != null) {
                        this.marker.setMap(null);
                    }
                    this.result = results[0];
                    this.marker = this.$refs.kmap.setMarker(this.result);
                    this.marker.setMap(this.map);
                    this.map.relayout();
                    this.map.setCenter(new window.kakao.maps.LatLng(this.result.y, this.result.x));
                    if (this.radius != null) {
                        this.showCircle();
                    }
                }
            });
        },
        uploadThumbNail() {
            const frm = new FormData();
            frm.append("upload", document.getElementById('img').files[0]);
            requestUploadImg(frm).then(response => {
                let data = response.data;
                this.setThumbnail(data.message[0]);
            }).catch(error => {
                let response = error.response;
                let data = response.data;
                if (checkNew(response.status, data.message)) {
                    requestUploadImg(frm).then(response => {
                        let data = response.data;
                        this.setThumbnail(data.message[0]);
                    }).catch(error => {
                        this.catchUploadError(error);
                    });
                } else {
                    this.catchUploadError(error);
                }
            });
        },
        catchUploadError(error) {
            let response = error.response;
            let state = response.status;
            let data = response.data;
            if (state == 403) {
                alert('재로그인 후 시도해주세요');
            } else if (state == 400) {
                alert(data.message);
            }
        },
        showCircle() {
            if (isNaN(this.radius)) {
                alert('배달거리는 숫자만 입력해주세요');
                return;
            }
            if (this.circle != null) {
                this.circle.setMap(null);
            }
            this.circle = new window.kakao.maps.Circle({
                center: new window.kakao.maps.LatLng(this.result.y, this.result.x),  // 원의 중심좌표 입니다 
                radius: this.radius * 1000, // 미터 단위의 원의 반지름입니다 
                strokeWeight: 5, // 선의 두께입니다 
                strokeColor: '#75B8FA', // 선의 색깔입니다
                strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle: 'dashed', // 선의 스타일 입니다
                fillColor: '#CFE7FF', // 채우기 색깔입니다
                fillOpacity: 0.7  // 채우기 불투명도 입니다   
            });
            console.log(this.circle);
            this.circle.setMap(this.map);
        },
        regiStore() {
            let data = JSON.stringify({
                "thumbnail": this.thumbnail,
                "openTime": this.opentime,
                "closeTime": this.closetime,
                "postcode": this.postcode,
                "address": this.addr,
                "detailAddress": this.detailAddr,
                "minPrice": this.minPrice,
                "radius": this.radius,
                "tel": this.tel,
                "text": this.$refs.editor.getText(),
                "name": this.name,
                "companyNum": this.companynum
            });
            console.log(data);
            requestStoreInsert(data).then(() => {
                this.doneInsert();
            }).catch(error => {
                let response = error.response;
                let responseData = response.data;
                if (checkNew(response.status, responseData.message)) {
                    requestStoreInsert(data).then(() => {
                        this.doneInsert();
                    }).catch(error => {
                        this.catchReigError(error);
                    });
                } else {
                    this.catchReigError(error);
                }
            });
        },
        catchReigError(error) {
            let errors = error.response.data.errors;
            let data = error.response.data;
            console.log(errors);
            console.log(data.message);
            if (errors == null || errors == undefined) {
                alert(data.message);
            } else {
                for (var i in errors) {
                    alert(errors[i].defaultMessage);
                }
            }

        },
        doneInsert() {
            alert('매장등록이 완료 되었습니다');
            location.href = '/store-list?page=1';
        }
    },
}
</script>

<style>
</style>