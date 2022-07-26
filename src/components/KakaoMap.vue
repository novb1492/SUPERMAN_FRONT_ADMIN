<template>
  <div ref="placeName"></div>
  <div id="map" ref="map"></div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'KakaoMap',
  props: ['width', 'height', 'resizeWidth', 'resizeHeight'],
  data() {
    return {
      ownMarker: null,
    }
  },
  computed: {
    ...mapGetters('kmapStore', {
      map: 'getMap',
      ownMarkerFlag: 'getOwnMarkerFlag'
    })
  },
  mounted() {
    var values = new Object;
    values.container = this.$refs.map; //지도를 담을 영역의 DOM 레퍼런스
    values.options = { //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };
    this.$store.dispatch('kmapStore/init', values); //지도 생성
    this.setDomSize(this.width, this.height);//돔 사이즈 지정
    window.addEventListener('resize', this.setDomResize);// 리사이즈 이벤트 지정
  },
  methods: {
    setDomSize(width, height) {
      var domMap = this.$refs.map;
      domMap.style.width = width + 'px';
      domMap.style.height = height + 'px';
      this.map.relayout();
    },
    setDomResize() {
      var width = 0;
      var height = 0;
      if (this.resizeWidth == 'full') {
        width = window.innerWidth;
      } else {
        width = this.resizeWidth;
      }
      if (this.resizeHeight == 'full') {
        height = window.innerHeight;
      } else {
        height = this.resizeHeight;
      }
      this.setDomSize(width, height);
    },
    setMarker(latLng) {
      return new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(latLng.y, latLng.x)
      });
    },
    changeFocus(item) {
      var x = item.x;
      var y = item.y;
      this.map.panTo(new window.kakao.maps.LatLng(y, x));

    },
    showInfoWindow(content, marker) {
      var infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
      infowindow.setContent(content);
      infowindow.open(this.map, marker);
      return infowindow;
    },
    showOwnPos(lat, lon) {
      let latLon = new Object;
      latLon.y = lat;
      latLon.x = lon;
      this.ownMarker = this.setMarker(latLon);
      if (this.ownMarkerFlag) {
        this.ownMarker.setMap(null);
      }
      this.$store.dispatch('setOwnMarker', true);
      this.ownMarker.setMap(this.map);
    }
  }
}
</script>


