<template>
    <div class="signature-container">
      <canvas
        ref="canvasRef"
        :width="scaledWidth"
        :height="scaledHeight"
        :style="canvasStyle"
        @touchstart.prevent="handleStart"
        @touchmove.prevent="handleMove"
        @touchend="handleEnd"
        @mousedown="handleStart"
        @mousemove="handleMove"
        @mouseup="handleEnd"
        @mouseleave="handleEnd"
      ></canvas>
      <div class="button-group">
        <button @click="clear">清除</button>
        <button @click="confirm">确认</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  
  const props = defineProps({
    lineWidth: {
      type: Number,
      default: 2
    },
    lineColor: {
      type: String,
      default: '#000'
    },
    bgColor: {
      type: String,
      default: '#fff'
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 200
    },
    modelValue: String
  })
  
  const emit = defineEmits(['update:modelValue', 'confirm', 'clear'])
  
  const canvasRef = ref(null)
  const isDrawing = ref(false)
  const lastX = ref(0)
  const lastY = ref(0)
  const devicePixelRatio = window.devicePixelRatio || 1
  const ctx = ref(null)
  
  const scaledWidth = computed(() => props.width * devicePixelRatio)
  const scaledHeight = computed(() => props.height * devicePixelRatio)
  
  const canvasStyle = computed(() => ({
    width: `${props.width}px`,
    height: `${props.height}px`,
    backgroundColor: props.bgColor
  }))
  
  onMounted(() => {
    initCanvas()
  })
  
  function initCanvas() {
    ctx.value = canvasRef.value.getContext('2d')
    ctx.value.scale(devicePixelRatio, devicePixelRatio)
    ctx.value.lineWidth = props.lineWidth
    ctx.value.lineCap = 'round'
    ctx.value.lineJoin = 'round'
    ctx.value.strokeStyle = props.lineColor
    clear()
  }
  
  function getClientOffset(e) {
    const rect = canvasRef.value.getBoundingClientRect()
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * devicePixelRatio,
        y: (e.touches[0].clientY - rect.top) * devicePixelRatio
      }
    } else {
      return {
        x: (e.clientX - rect.left) * devicePixelRatio,
        y: (e.clientY - rect.top) * devicePixelRatio
      }
    }
  }
  
  function handleStart(e) {
    isDrawing.value = true
    const { x, y } = getClientOffset(e)
    lastX.value = x
    lastY.value = y
    ctx.value.beginPath()
  }
  
  function handleMove(e) {
    if (!isDrawing.value) return
    
    const { x, y } = getClientOffset(e)
    
    ctx.value.moveTo(lastX.value, lastY.value)
    ctx.value.lineTo(x, y)
    ctx.value.stroke()
    
    lastX.value = x
    lastY.value = y
  }
  
  function handleEnd() {
    isDrawing.value = false
  }
  
  function clear() {
    ctx.value.fillStyle = props.bgColor
    ctx.value.fillRect(0, 0, scaledWidth.value, scaledHeight.value)
    emit('clear')
  }
  
  function confirm() {
    const dataURL = canvasRef.value.toDataURL()
    emit('update:modelValue', dataURL)
    emit('confirm', dataURL)
  }
  
  watch(
    () => props.lineColor,
    (newVal) => {
      ctx.value.strokeStyle = newVal
    }
  )
  
  watch(
    () => props.lineWidth,
    (newVal) => {
      ctx.value.lineWidth = newVal
    }
  )
  </script>
  
  <style scoped>
  .signature-container {
    position: relative;
    user-select: none;
  }
  
  canvas {
    border: 1px solid #ddd;
    border-radius: 4px;
    touch-action: none;
  }
  
  .button-group {
    margin-top: 10px;
    display: flex;
    gap: 10px;
  }
  
  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background: #07c160;
    color: white;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  
  button:first-child {
    background: #f44;
  }
  
  button:active {
    opacity: 0.7;
  }
  </style>