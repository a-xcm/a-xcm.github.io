<script setup>
import {ref, onMounted } from 'vue';
const canvas = ref(null)
var raf;
var ctx;
var ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 2,
  radius: 25,
  color: "blue",
  draw: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};
onMounted(() => {
  ctx = canvas.value.getContext('2d')
  ball.draw()
  canvas.value.addEventListener("mouseover", function (e) {
  raf = window.requestAnimationFrame(draw);
});

canvas.value.addEventListener("mouseout", function (e) {
  window.cancelAnimationFrame(raf);
});
})
const draw = () => {
  // ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;
  ball.vy *= 0.99;
  ball.vy += 0.25;
  if (ball.y + ball.vy > canvas.value.height || ball.y + ball.vy < 0) {
    ball.vy = -ball.vy;
  }
  if (ball.x + ball.vx > canvas.value.width || ball.x + ball.vx < 0) {
    ball.vx = -ball.vx;
  }
  raf = window.requestAnimationFrame(draw);
}
</script>

<template>
  <canvas ref="canvas" :width="500" :height="200"></canvas>
</template>
<style scoped>
canvas {
  border: 1px solid #000;
}
</style>