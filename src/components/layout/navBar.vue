<template>
  <nav class="navigation">
    <ul>
      <li class="list active">
        <a href="#">
          <span class="icon">
            <ion-icon name="home-outline"></ion-icon>
          </span>
          <span class="text">home</span>
        </a>
      </li>
       <li class="list">
        <a href="#">
          <span class="icon">
            <ion-icon name="cart-outline"></ion-icon>
          </span>
          <span class="text">cart</span>
        </a>
      </li>
       <li class="list">
        <a href="#">
          <span class="icon">
            <ion-icon name="reorder-three-outline"></ion-icon>
          </span>
          <span class="text">order</span>
        </a>
      </li>
       <li class="list">
        <a href="#">
          <span class="icon">
            <ion-icon name="person-outline"></ion-icon>
          </span>
          <span class="text">profile</span>
        </a>
      </li>
       <li class="list">
        <a href="#">
          <span class="icon">
            <ion-icon name="flame-outline"></ion-icon>
          </span>
          <span class="text">event</span>
        </a>
      </li>
       <div class="indicator"></div>
    </ul>
  </nav>
</template>
<style scoped>
 .navigation{
  width: 400px;
  position: relative;
  height: 70px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
 }
 .navigation ul{
  display: flex;
  width: 350px;
 }
 .navigation ul li{
  position: relative;
  list-style: none;
  width: 70px;
  height: 70px;
  z-index: 1;
 }
.navigation ul li a{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
  font-weight: 500;
}
.navigation ul li a .icon{
  position: relative;
  display: block;
  line-height: 75px;
  font-size: 1.5em;
  text-align: center;
  transition: 0.5s;
}
.navigation ul li:hover a .icon{
  transform: translateY(-50px);
}
.navigation ul li a .text{
  position: absolute;
  font-weight: 400;
  font-size: 0.75em;
  letter-spacing: 0.00;
  transition: 0.5s;
}
.navigation ul li:hover a .text{
  opacity: 1;
  transform: translateY(10px);
}
.indicator{
  position: absolute;
  top: -50%;
  width: 70px;
  height: 70px;
  background-color: #29fd53;
  border-radius: 50%;
  border: 6px solid ;
  transition: 0.5s;
}
</style>
<script>
export default {
  name: 'navBar',
  components: {
  }
}
</script>


