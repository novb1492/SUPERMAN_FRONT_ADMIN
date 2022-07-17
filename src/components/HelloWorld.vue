<template>
<swiper
    :slides-per-view="3.3"
    :space-between="1"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  > 
<swiper-slide v-for="(item,index) in arr " :key="item" style="height: 100px;">
   <p @mouseover="moveXy(item,index)">{{item.place_name}}<br/>{{item.address_name}}<br/>{{index}}index</p>
</swiper-slide>
  </swiper>
  <kakao-map ref="kmap" :height="kmapHeight" :width="kmapWidth" :resizeWidth="resizeWidth" :resizeHeight="resizeHeight"></kakao-map>
</template>

<script>
import KakaoMap from './KakaoMap.vue';
import { mapGetters } from 'vuex';
import { Swiper, SwiperSlide } from 'swiper/vue';

export default {
  components: {Swiper,SwiperSlide, KakaoMap  },
  name: 'HelloWorld',
  data() {
    return {
      kmapWidth:window.innerWidth,
      kmapHeight:window.innerHeight-500,
      resizeWidth:'full',
      resizeHeight:'full',
      arr:[],
      nameAndAddressArr:[],
      onMouseIndex:[],
      options2 : {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
      },
    }
  },
  setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      return {
        onSwiper,
        onSlideChange
      };
  },
  computed: {
    ...mapGetters({
      map: 'getMap',
      superAndMarketMarkerArr:'getSuperAndMarketMarkerArr',
      ps:'getPs',
      geocoder:'getGeocoder',
    })
  },
  mounted(){
    window.kakao.maps.event.addListener(this.map, 'dragend',() =>{//중심점 변경시(드래그)인근 마트들 검색
      this.xyToAddress();
    });
    this.watchPosition();
  },
  methods:{
    watchPosition(){
      if('geolocation' in navigator) {
      navigator.geolocation.watchPosition(this.success,this.error,this.options2);
      } else {
        alert('위치정보를 사용할 수 없습니다');
      }
    },
    success(position){
      this.$refs.kmap.showOwnPos(position.coords.latitude, position.coords.longitude);
    },
    error(err) {
      console.log(err);
      alert('위치정보를 사용할 수 없습니다');
    },
    xyToAddress(){
        //좌표를 주소로 변환
        var latlng=this.map.getCenter();
        this.geocoder.coord2Address(latlng.La, latlng.Ma,this.searchMarket);
    },
    moveXy(item,index){
      this.$refs.kmap.changeFocus(item);
      var content = '<div style="padding:5px;z-index:1;">' + item.place_name + '</div>';
      this.$refs.kmap.showInfoWindow(content, this.superAndMarketMarkerArr[index]);
      if(this.onMouseIndex.indexOf(index)==-1){
        this.onMouseIndex[this.onMouseIndex.length]=index;
      }
    },
    searchMarket(result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        //키워드로 검색 ex) 서울 동작구 마트
        var address=result[0].address;
        var text=address.region_1depth_name+' '+address.region_2depth_name+' '+address.region_3depth_name;
        var keywords=[text+' 마트',text+' 슈퍼',text+' 슈퍼마켓',text+' 상회'];
        this.arr=[];//이전 마켓정보들 초기화
        this.nameAndAddressArr=[];//이전 마켓정보들 초기화
        this.$store.dispatch('clearSuperAndMarketMarkerArr',{arr:this.superAndMarketMarkerArr,not:this.onMouseIndex});//이전 마커들 지우기 + 초기화
        this.onMouseIndex=[];//지워줘야 한다 설명은 생략
        this.search(keywords);
        return;
      }   
    },
    search(keywords){
      for(var i in keywords){
        this.ps.keywordSearch(keywords[i], this.setAllData); 
      }
    },
    setAllData(data, status, pagination){
        if (status === window.kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        this.displayPlaces(data);
        // 페이지 번호를 표출합니다
        this.displayPagination(pagination);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          alert('검색 결과가 존재하지 않습니다.');
          return;
      } else if (status === window.kakao.maps.services.Status.ERROR) {
          alert('검색 결과 중 오류가 발생했습니다.');
          return;
      }

    },
    displayPagination(pagination) {
      if(pagination.hasNextPage){
        pagination.nextPage();
      }
    },
    displayPlaces(data){ 
        for(var i in data){
            // 마커가 지도 위에 표시되도록 설정합니다
            var pn=data[i].place_name;
            var an=data[i].address_name;
            var checkText=pn+","+an;
            if(!this.nameAndAddressArr.includes(checkText)){
              this.nameAndAddressArr[this.nameAndAddressArr.length]=checkText;
              this.arr[this.arr.length]=data[i];
              var marker = this.$refs.kmap.setMarker(data[i]);
              marker.setMap(this.map);
              this.superAndMarketMarkerArr[this.superAndMarketMarkerArr.length]=marker;
            }
        }
    },
  }
}
</script>

