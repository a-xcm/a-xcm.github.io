<template>
    <div class="scanner-container">
      <video ref="video" class="scanner-video" autoplay playsinline></video>
      <button @click="startScanner">启动扫码</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { BrowserMultiFormatReader } from '@zxing/library';
  
  export default {
    setup() {
      const video = ref(null);
  
      const startScanner = async () => {
        try {
          const codeReader = new BrowserMultiFormatReader();
          const devices = await codeReader.listVideoInputDevices();
          const rearCamera = devices.find(device => device.label.toLowerCase().includes('back'));
          if (devices.length === 0) {
            alert('未找到摄像头设备');
            return;
          }
          if (!rearCamera) {
            alert('未找到后置摄像头');
            return;
          }
        //   const stream = await navigator.mediaDevices.getUserMedia({
        //     video: { facingMode: 'environment' }
        //   });
  
        //   video.value.srcObject = stream;
        //   await video.value.play();
  
          codeReader.decodeFromVideoDevice(
            rearCamera.deviceId ||  devices[0].deviceId,
            video.value,
            (result, error) => {
              if (result) alert('扫码结果: ' + result.text);
              if (error) console.error('ZXing 错误:', error);
            }
          );
        } catch (error) {
          console.error('全局错误:', error);
          if (error.name === 'NotAllowedError') {
            alert('摄像头权限被拒绝！');
          }
        }
      };
  
      return { video, startScanner };
    }
  };
  </script>
  
  <style>
  .scanner-container {
    width: 100%;
    height: 300px;
    position: relative;
  }
  
  .scanner-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  </style>