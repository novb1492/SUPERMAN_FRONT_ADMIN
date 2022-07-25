<template>
   <div style="margin-top: 70px;">
    <div class="row">
        <div class="col">
           <h5 class="mt-2">매장을 대표하는 사진을 업로드해주세요</h5>
        <img  :src="thumbnail"  id="thumbnail" class="storeThumbnail">
        <br>
        <input type="file" id="img" class="mt-2" name="img" accept=".gif, .jpg, .png" @change="uploadThumbNail">
        <!--<br>
        <input type="button" class="mt-2"  value="업로드"  @click="uploadThumbNail">-->
        <br>
         <span class="mt-2" >상호</span>
        <input
          type="text"
          class="ml135 mt-2"
          id="storeName"
          placeholder="상호"   
        />
        <br>
        <span>사업자번호(숫자만)</span>
        <input type="text"
          class="ml45 mt-2"
          id="num"
          placeholder="상호"   
        />
        <br>
        <span>오픈시간</span>
        <input type="time"
          class="ml135 mt-2"
          id="openTime"
          placeholder="오픈시간"
        />
        <br>
        <span>마감시간</span>
        <input type="time"
          class="ml135 mt-2 mb-2"
          id="closeTime"
          placeholder="마감시간"
        />
        <br>
        <span >간단한 가게 설명을 적어주세요</span>
        <editor class="mt-2" :text="null" :placeHolder="'간단한 가게 설명을 적어주세요'" ref="ck_editor"/>
        </div>
        <div class="col">
                <vue-daum-postcode
              id="kpost"
              @complete="onComplete"
              style="overflow: scroll; width: 400px; height: 500px;"
            />
              <span>우편번호</span>
              <input
              type="text"
              class="ml105 mt-2"
              id="postcode"
              placeholder="우편번호"
              disabled
            />
            <br>
            <span>주소</span><input
              type="text"
              class="ml135 mt-2"
              id="address"
              placeholder="주소"
              disabled
            />
            <br>
            <span>도로명주소</span><input
              type="text"
              class="ml135 mt-2"
              id="address2"
              placeholder="도로명주소"
              disabled
            />
            <br>
            <span>상세주소</span><input
              type="text"
              class="ml105 mt-2"
              id="detailAddress"
              placeholder="상세주소"
            />
            <br>
            <span>최소배달금액(원)</span>
            <input type="number"
              class="ml105 mt-2"
              id="minPrice"
              placeholder="최소배달금액"
            />
            <br>
            <span>최대배달반경(km)</span>
            <input type="number"
              class="ml80 mt-2"
              id="deliverRadius"
              placeholder="최대배달반경"
              @keyup="showCircle"
            />
            <br>
        </div>
        <div class="col">
          <k-map :width="400" :height="500" :zoomLevel=5 ref="k_map"/>
          <span >휴대폰번호</span>
          <input type="text" class="ml80" id="phone">
          <br>
          <span>매장전화번호</span>
          <input type="text" class="ml80 mt-2" id="tel">
          <br>
          <input type="button" @click="showAuthPage('phone')" id="check_phone_button" class="mt-2" value="전화인증" />
          <input type="button" value="가맹점 등록" @click="tryInsertStore" >
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { checkLogin } from "@/assets/js/Jslib";
export default {
  name:"RegiStorePage",
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters('NavStore',{
      loginFlag: 'getLoginFlag',
    })
  },
  mounted(){
    checkLogin('/login');
  },
  methods: {
    uploadThumbNail(){
      alert('a');
    }
  },
}
</script>

<style>

</style>