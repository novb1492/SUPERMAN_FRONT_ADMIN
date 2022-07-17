<template>
   <div class="he">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand "  href="/"><p class="pinkText">JangBoGo</p></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
         <!-- <a class="nav-link active" aria-current="page" href="javascript:void();" @click="test">배달시작</a>-->
        </li>
        <li class="nav-item">
          <a class="nav-link" href="javascript:void();">{{loginFlag}}</a>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="javascript:void();" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            User
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <div v-if="loginFlag">
                <li><a class="dropdown-item" href="javascript:void();" @click="logout">로그아웃</a></li>
              <div v-if="role==this.$ROLE_USER">
                <!--일반회원 목록-->
                <li><a class="dropdown-item" href="/userPage/0?page=1" >장바구니가기</a></li>
                <li><a class="dropdown-item" href="javascript:void();" @click="showHomeAddress()">받을 주소 불러오기</a></li>
                <li><a class="dropdown-item" href="javascript:void();" @click="showHomeAddress()">마이페이지</a></li>
                <li><a class="dropdown-item" href="javascript:void();" @click="goPaymnetListPage">주문내역 보기</a></li>
                <!--<li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="javascript:void();">Something else here</a></li>-->
              </div>
              <div v-else>
                <!--기업회원 목록-->
                <li><a class="dropdown-item" href="/companyPage/1?page=1&keyword=null">매장관리/등록</a></li>
                <li><a class="dropdown-item" href="/companyPage">주문조회/등록</a></li>
              </div>
            </div>
            <div v-else>
              <li><a class="dropdown-item" href="/loginPage" >로그인</a></li>
              <li><a class="dropdown-item" href="/beforeJoinPage" >회원가입</a></li>
            </div>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="javascript:void();" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <div v-if="searchflag">
      <span class="d-flex">
        <input class="form-control me-2" id="search" type="search" placeholder="00슈퍼,00마트등 검색" @keyup.enter="callFirstDoor" aria-label="Search">
        <button class="btn btn-outline-success" @click="callFirstDoor" type="button">Search</button>
      </span>
      </div>
    </div>
  </div>
</nav>
  </div>
</template>

<script>
export default {
  name: 'navBar',
  components: {
  }
}
</script>


