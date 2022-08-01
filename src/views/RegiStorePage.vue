<template>
  <div style="margin-top: 70px;">
    <div class="row">
      <div class="col">
        <h5 class="mt-2">매장을 대표하는 사진을 업로드해주세요</h5>
        <img :src="thumbnail" id="thumbnail" class="storeThumbnail">
        <br>
        <input type="file" id="img" class="mt-2" name="img" accept=".jpg, .png" @change="uploadThumbNail">
        <br>
        <span class="mt-2">상호</span>
        <input type="text" class="ml135 mt-2" id="storeName" placeholder="상호" v-model="name" />
        <br>
        <span>오픈시간</span>
        <input type="time" class="ml135 mt-2" id="openTime" placeholder="오픈시간" v-model="opentime" />
        <br>
        <span>마감시간</span>
        <input type="time" class="ml135 mt-2 mb-2" id="closeTime" placeholder="마감시간" v-model="closetime" />
        <br>
        <span>간단한 가게 설명을 적어주세요</span>
        <ck-5-editor :idName="'editor'" ref="editor"></ck-5-editor>
      </div>
      <div class="col">
        <kakao-post-code :width="400" :height="300" ref="kpostCode" v-on:resultPost="resultPost"></kakao-post-code>
        <span>우편번호</span>
        <input type="text" class="ml105 mt-2" id="postcode" placeholder="우편번호" v-model="postcode" disabled />
        <br>
        <span>주소</span><input type="text" class="ml135 mt-2" id="address" placeholder="주소" v-model="addr" disabled />
        <br>
        <span>상세주소</span><input type="text" class="ml105 mt-2" id="detailAddress" placeholder="상세주소"
          v-model="detailAddr" />
        <br>
        <span>최소배달금액(원)</span>
        <input type="text" class="ml105 mt-2" id="minPrice" placeholder="최소배달금액" v-model="minPrice" />
        <br>
        <span>최대배달반경(km)</span>
        <input type="text" class="ml80 mt-2" id="deliverRadius" placeholder="최대배달반경" @keyup="showCircle"
          v-model="radius" />
        <br>
      </div>
      <div class="col">
        <kakao-map :width="300" :height="300" ref="kmap"></kakao-map>
        <span>매장전화번호</span>
        <input type="text" class="ml80 mt-2" id="tel" v-model="tel">
        <br>
        <input type="button" value="가맹점 등록" @click="regiStore">
      </div>
    </div>
  </div>
</template>

<script>
import { requestStoreInsert } from "@/api/market/MarketApi";
import { requestUploadImg } from "@/api/Etc/EtcApi";
import KakaoPostCode from '@/components/KakaoPostCode.vue';
import Ck5Editor from '@/components/Ck5Editor.vue';
import KakaoMap from '@/components/KakaoMap.vue';
import { mapGetters } from "vuex";
export default {
  components: { KakaoPostCode, Ck5Editor, KakaoMap },
  name: "RegiStorePage",
  data() {
    return {
      thumbnail: null,
      addr: '',
      detailAddr: '',
      postcode: '',
      marker: null,
      radius: null,
      circle: null,
      result: null,
      companynum: null,
      opentime: null,
      closetime: null,
      tel: null,
      minPrice: null,
      text: null,
      name: null
    }
  },
  computed: {
    ...mapGetters('kmapStore', {
      geocoder: 'getGeocoder',
      map: 'getMap'
    })
  },
  methods: {
    resultPost(data) {
      this.addr = data.addr;
      this.postcode = data.postcode;
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
        this.thumbnail = data.message[0];
      }).catch(error => {
        let response = error.response;
        let data = response.data;
        if (response.status == 403 && data.message == '새토큰이 발급되었습니다') {
          requestUploadImg(frm).then(response => {
            let data = response.data;
            this.thumbnail = data.message[0];
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
        "name": this.name
      });
      requestStoreInsert(data).then(response => {
        console.log(response);
      }).catch(error => {
        let response = error.response;
        let data = response.data;
        if (response.status == 403 && data.message == '새토큰이 발급되었습니다') {
          requestUploadImg(data).then(response => {
              console.log(response);
          }).catch(error => {
            this.catchUploadError(error);
          });
        }
      });
    }
  },
}
</script>

<style>
</style>