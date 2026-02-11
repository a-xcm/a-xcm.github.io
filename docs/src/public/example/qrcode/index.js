(function (global) {
    /**
     * 二维码工具套件
     * @namespace QRCodeKit
     */
    const QRCodeKit = {
        /**
         * 版本信息
         */
        version: '1.0.0',
        
        /**
         * 创建二维码生成器
         * @param {HTMLElement} container 二维码容器
         * @param {Object} options 配置选项
         * @param {number} options.width 二维码宽度
         * @param {number} options.height 二维码高度
         * @param {string} options.text 初始二维码内容
         * @param {string} options.colorDark 前景色
         * @param {string} options.colorLight 背景色
         * @param {string} options.correctLevel 纠错级别 (L, M, Q, H)
         * @returns {Object} 二维码操作对象
         */
        create: function (container, options = {}) {
            if (!global.QRCode) {
                throw new Error('QRCode is not defined');
            }
            
            if (!container || !(container instanceof HTMLElement)) {
                throw new Error('container is not a valid HTMLElement');
            }
            
            const {
                width = 128,
                height = 128,
                text = '',
                colorDark = '#000000',
                colorLight = '#ffffff',
                correctLevel = QRCode.CorrectLevel.L
            } = options;
            
            const qrcode = new QRCode(container, {
                text: text,
                width: width,
                height: height,
                colorDark: colorDark,
                colorLight: colorLight,
                correctLevel: correctLevel
            });
            
            /**
             * 清除二维码
             */
            function clear() {
                qrcode.clear();
            }
            
            /**
             * 生成二维码
             * @param {string} text 二维码内容
             */
            function makeCode(text) {
                qrcode.makeCode(text);
            }
            
            /**
             * 获取二维码DataURL
             * @returns {string} DataURL
             */
            function toDataURL() {
                const canvas = container.querySelector('canvas');
                if (canvas) {
                    return canvas.toDataURL('image/png');
                }
                return null;
            }
            
            return {
                clear,
                makeCode,
                toDataURL
            };
        },
        
        /**
         * 创建二维码扫描器
         * @returns {Object} 扫描器操作对象
         */
        scanner: function () {
            let stream = null;
            let video = null;
            let canvas = null;
            let ctx = null;
            let scanAnimationId = null;
            let videoContainer = null;
            let lastScanTime = 0;
            let scanInterval = 300; // 扫描间隔（毫秒）
            
            if (!global.jsQR) {
                throw new Error('jsQR is not defined');
            }
            
            /**
             * 开始扫描
             * @param {Function} callback 扫描成功回调
             * @param {HTMLElement} container 视频预览容器
             * @param {Object} options 配置选项
             * @param {string} options.facingMode 摄像头方向
             * @param {number} options.width 视频宽度
             * @param {number} options.height 视频高度
             * @param {string} options.videoWidth 视频显示宽度
             * @param {string} options.videoHeight 视频显示高度
             * @param {number} options.scanInterval 扫描间隔（毫秒）
             * @returns {Promise} 启动结果
             */
            function start(callback, container = null, options = {}) {
                if (scanAnimationId) {
                    return Promise.resolve();
                }
                
                if (!global.isSecureContext) {
                    return Promise.reject(new Error('请在 HTTPS 环境下使用'));
                }
                
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    return Promise.reject(new Error('浏览器不支持摄像头'));
                }
                
                scanInterval = options.scanInterval || 300;
                
                return navigator.mediaDevices.getUserMedia({ 
                    video: { 
                        facingMode: options.facingMode || 'environment',
                        width: options.width || 640,
                        height: options.height || 480
                    } 
                }).then(mediaStream => {
                    stream = mediaStream;
                    video = document.createElement('video');
                    video.srcObject = stream;
                    video.setAttribute('playsinline', true);
                    video.style.width = options.videoWidth || '300px';
                    video.style.height = options.videoHeight || '300px';
                    
                    if (container && container instanceof HTMLElement) {
                        videoContainer = container;
                        container.appendChild(video);
                    } else {
                        videoContainer = document.createElement('div');
                        videoContainer.style.position = 'fixed';
                        videoContainer.style.top = '0';
                        videoContainer.style.left = '0';
                        videoContainer.style.zIndex = '9999';
                        videoContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                        videoContainer.style.display = 'flex';
                        videoContainer.style.alignItems = 'center';
                        videoContainer.style.justifyContent = 'center';
                        videoContainer.style.width = '100vw';
                        videoContainer.style.height = '100vh';
                        
                        const closeBtn = document.createElement('button');
                        closeBtn.style.position = 'absolute';
                        closeBtn.style.top = '20px';
                        closeBtn.style.right = '20px';
                        closeBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                        closeBtn.style.border = 'none';
                        closeBtn.style.borderRadius = '50%';
                        closeBtn.style.width = '40px';
                        closeBtn.style.height = '40px';
                        closeBtn.style.color = 'white';
                        closeBtn.style.fontSize = '20px';
                        closeBtn.style.cursor = 'pointer';
                        closeBtn.textContent = '×';
                        closeBtn.onclick = stop;
                        videoContainer.appendChild(closeBtn);
                        
                        document.body.appendChild(videoContainer);
                        videoContainer.appendChild(video);
                    }
                    
                    canvas = document.createElement('canvas');
                    ctx = canvas.getContext('2d');
                    
                    return new Promise((resolve) => {
                        video.onloadedmetadata = () => {
                            video.play().then(() => {
                                scanAnimationId = requestAnimationFrame(() => scanQRCode(callback));
                                resolve();
                            }).catch(err => {
                                stop();
                                throw new Error('视频播放失败: ' + err.message);
                            });
                        };
                    });
                });
            }
            
            /**
             * 停止扫描
             */
            function stop() {
                if (scanAnimationId) {
                    cancelAnimationFrame(scanAnimationId);
                    scanAnimationId = null;
                }
                
                if (video) {
                    video.pause();
                    video.srcObject = null;
                    if (videoContainer && videoContainer.contains(video)) {
                        videoContainer.removeChild(video);
                    }
                    video = null;
                }
                
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                    stream = null;
                }
                
                if (videoContainer) {
                    if (document.body.contains(videoContainer)) {
                        document.body.removeChild(videoContainer);
                    }
                    videoContainer = null;
                }
                
                canvas = null;
                ctx = null;
                lastScanTime = 0;
            }
            
            /**
             * 扫描二维码
             * @param {Function} callback 扫描成功回调
             */
            function scanQRCode(callback) {
                if (!video || !ctx || !canvas) {
                    return;
                }
                
                const now = Date.now();
                if (now - lastScanTime < scanInterval) {
                    if (scanAnimationId) {
                        scanAnimationId = requestAnimationFrame(() => scanQRCode(callback));
                    }
                    return;
                }
                
                if (video.readyState === video.HAVE_ENOUGH_DATA) {
                    try {
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                        
                        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        const code = jsQR(imageData.data, canvas.width, canvas.height, {
                            inversionAttempts: 'dontInvert'
                        });
                        
                        if (code) {
                            lastScanTime = now;
                            callback(code.data);
                            stop();
                            return;
                        }
                    } catch (error) {
                        console.error('扫描错误:', error);
                    }
                }
                
                if (scanAnimationId) {
                    scanAnimationId = requestAnimationFrame(() => scanQRCode(callback));
                }
            }
            
            /**
             * 获取摄像头状态
             * @returns {boolean} 是否正在扫描
             */
            function isScanning() {
                return !!scanAnimationId;
            }
            
            return {
                start,
                stop,
                isScanning
            };
        },
        
        /**
         * 工具方法
         */
        util: {
            /**
             * 从图片解析二维码
             * @param {File|string|Blob} imageSource 图片源
             * @param {Object} options 配置选项
             * @param {number} options.maxSize 最大处理尺寸
             * @returns {Promise<string>} 解析结果
             */
            async parseFromImage(imageSource, options = {}) {
                if (!global.jsQR) {
                    throw new Error('jsQR is not defined');
                }
                
                if (!imageSource) {
                    throw new Error('imageSource is required');
                }
                
                const { maxSize = 1024 } = options;
                
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    
                    img.onload = function() {
                        try {
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');
                            
                            if (!ctx) {
                                reject(new Error('Failed to get canvas context'));
                                return;
                            }
                            
                            // 处理大图片
                            let width = img.width;
                            let height = img.height;
                            
                            if (width > maxSize || height > maxSize) {
                                const ratio = Math.min(maxSize / width, maxSize / height);
                                width = Math.floor(width * ratio);
                                height = Math.floor(height * ratio);
                            }
                            
                            canvas.width = width;
                            canvas.height = height;
                            ctx.drawImage(img, 0, 0, width, height);
                            
                            const imageData = ctx.getImageData(0, 0, width, height);
                            const code = jsQR(imageData.data, width, height, {
                                inversionAttempts: 'dontInvert'
                            });
                            
                            if (code) {
                                resolve(code.data);
                            } else {
                                reject(new Error('未检测到二维码'));
                            }
                        } catch (error) {
                            reject(new Error('解析失败: ' + error.message));
                        }
                    };
                    
                    img.onerror = function() {
                        reject(new Error('图片加载失败'));
                    };
                    
                    if (imageSource instanceof File || imageSource instanceof Blob) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            img.src = e.target.result;
                        };
                        reader.onerror = function() {
                            reject(new Error('文件读取失败'));
                        };
                        reader.readAsDataURL(imageSource);
                    } else if (typeof imageSource === 'string') {
                        // 添加时间戳防止缓存
                        const url = imageSource + (imageSource.includes('?') ? '&' : '?') + 't=' + Date.now();
                        img.src = url;
                    } else {
                        reject(new Error('不支持的图片源类型'));
                    }
                });
            },
            
            /**
             * 从Canvas解析二维码
             * @param {HTMLCanvasElement} canvas Canvas元素
             * @returns {Promise<string>} 解析结果
             */
            async parseFromCanvas(canvas) {
                if (!global.jsQR) {
                    throw new Error('jsQR is not defined');
                }
                
                if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
                    throw new Error('canvas is not a valid HTMLCanvasElement');
                }
                
                return new Promise((resolve, reject) => {
                    try {
                        const ctx = canvas.getContext('2d');
                        if (!ctx) {
                            reject(new Error('Failed to get canvas context'));
                            return;
                        }
                        
                        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        const code = jsQR(imageData.data, canvas.width, canvas.height, {
                            inversionAttempts: 'dontInvert'
                        });
                        
                        if (code) {
                            resolve(code.data);
                        } else {
                            reject(new Error('未检测到二维码'));
                        }
                    } catch (error) {
                        reject(new Error('解析失败: ' + error.message));
                    }
                });
            },
            
            /**
             * 检测浏览器兼容性
             * @returns {Object} 兼容性信息
             */
            checkCompatibility() {
                return {
                    hasQRCode: !!global.QRCode,
                    hasJsQR: !!global.jsQR,
                    hasGetUserMedia: !!navigator.mediaDevices?.getUserMedia,
                    isSecureContext: !!global.isSecureContext,
                    hasCanvas: !!document.createElement('canvas').getContext
                };
            },
            
            /**
             * 生成随机ID
             * @returns {string} 随机ID
             */
            generateId() {
                return 'qrcode_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            }
        }
    };
    
    // 暴露到全局
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = QRCodeKit;
    } else if (typeof define === 'function' && define.amd) {
        define(function() { return QRCodeKit; });
    } else {
        global.QRCodeKit = QRCodeKit;
    }
})(typeof window !== 'undefined' ? window : global);
