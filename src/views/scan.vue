<template>
    <div class="scanner-container">
        <video ref="video" class="scanner-video" autoplay playsinline></video>
        <div class="qr-scanner">
            <div class="box">
                <div class="line"> </div>
            </div>
        </div>
        <button @click="startScanner">启动扫码</button>
    </div>
</template>

<script>
import { ref,onMounted } from 'vue';
import { BrowserMultiFormatReader } from '@zxing/library';

export default {
    setup() {
        const video = ref(null);
        onMounted(() => {
            startScanner()
        });
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
                    rearCamera.deviceId || devices[0].deviceId,
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
    height: 100%;
    position: relative;
}

.scanner-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    z-index: 12;
}

.qr-scanner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    background-image:
        linear-gradient(0deg, transparent 24%, rgba(32, 255, 77, 0.1) 25%, rgba(32, 255, 77, 0.1) 26%, transparent 27%, transparent 74%, rgba(32, 255, 77, 0.1) 75%, rgba(32, 255, 77, 0.1) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, rgba(32, 255, 77, 0.1) 25%, rgba(32, 255, 77, 0.1) 26%, transparent 27%, transparent 74%, rgba(32, 255, 77, 0.1) 75%, rgba(32, 255, 77, 0.1) 76%, transparent 77%, transparent);
    background-size: 3rem 3rem;
    background-position: -1rem -1rem;
    width: 100%;
    height: 100%;
    background-color: #111;
}

.qr-scanner .box {
    width: 75vw;
    height: 75vw;
    max-height: 75vh;
    max-width: 75vh;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    border: .1rem solid rgba(0, 255, 51, .2);
}

.qr-scanner .line {
    height: calc(100% - 2px);
    width: 100%;
    background: linear-gradient(180deg, rgba(0, 255, 51, .0) 40%, #00ff33);
    border-bottom: 2px solid #00ff33;
    transform: translateY(-100%);
    animation: radar-beam 3s infinite;
    /* animation: radar-beam 2s infinite cubic-bezier(.53, .43, .99); */
}

@keyframes radar-beam {
    from {
        transform: translateY(-100%);
    }

    to {
        transform: translateY(120%);
    }
}
</style>