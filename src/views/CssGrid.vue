<script setup>

</script>
<template>
  <div>Grid</div>
  <!-- <div class="wrapper">
    <div class="one">header</div>
    <div class="two">menu</div>
    <div class="three">main</div>
    <div class="four">right</div>
    <div class="five">footer</div>
  </div> -->
  <!-- <div class="wrapper2">
    <div class="item" v-for="i in 20"></div>
  </div> -->
  <div class="wrapper3"> 
    <div class="no1"></div>
    <div class="no2"></div>
    <div class="no3"></div>
    <div class="no4"></div>

  </div>
</template>
<style scoped>
 .wrapper{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 10px;
  background-color: #2196F3;
  text-align: center;
  padding: 10px;
}
.wrapper>div{
  background-color: rgba(255, 255, 255,0.8);
  text-align: center;
  padding: 20px 0;
}
.one{
  grid-column: 1/6;
  grid-row: 1;

}
.two{
  grid-column: 1;
  grid-row: 2/4;

}
.three{
  grid-column: 2/5;
  grid-row: 2;

}
.four{
  grid-column: 5;
  grid-row: 2;
}
.five{
  grid-column: 2/6;
  grid-row: 3;
}


.wrapper2{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 200px;
  grid-gap: 10px;
}

.wrapper2 .item{
  background-color: #2196F3;
}

.wrapper3{
  display: grid;
  grid-auto-columns: 100px;
  grid-auto-rows: minmax(100px, auto);
  grid-template-areas: 'a a d'
                     'b b d'
                     'c c d';
}

.no1{
  background-color: #2196F3;
  grid-area: a;
}
.no2{
  grid-area: b;
  background-color: bisque;
}
.no3{
  grid-area: c;
  background-color: rgb(8, 31, 31);
}
.no4{
  background-color: rgb(243, 160, 5);
  grid-area: d;
}
</style>