# PDF.js 使用教程

## 概述

PDF.js 是 Mozilla 开发的开源 JavaScript 库，用于在 Web 浏览器中渲染 PDF 文档。它不需要任何本地插件支持，纯前端实现 PDF 解析和渲染。

**特点：**
- 纯 JavaScript 实现，无需额外插件
- 支持现代浏览器（Chrome、Firefox、Safari、Edge）
- 基于 Promise 异步操作
- 支持多种 PDF 特性（文本提取、注释、表单等）

---

## 快速开始

### 1. 引入 PDF.js

有两种方式引入 PDF.js：

#### CDN 方式
```html
<!-- 引入核心库 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.js"></script>
```

#### 本地安装
```bash
npm install pdfjs-dist
```

```javascript
import * as pdfjsLib from 'pdfjs-dist';
```

### 2. 基础用法

```html
<!-- HTML -->
<canvas id="pdf-canvas"></canvas>

<script>
// 获取 canvas 元素
const canvas = document.getElementById('pdf-canvas');
const ctx = canvas.getContext('2d');

// 加载 PDF 文档
const loadingTask = pdfjsLib.getDocument('example.pdf');

loadingTask.promise.then(pdf => {
    console.log('PDF 加载成功，共', pdf.numPages, '页');
    
    // 获取第一页
    return pdf.getPage(1);
}).then(page => {
    // 设置缩放比例
    const scale = 1.5;
    const viewport = page.getViewport({ scale });
    
    // 设置 canvas 尺寸
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    // 渲染页面
    const renderContext = {
        canvasContext: ctx,
        viewport: viewport
    };
    
    return page.render(renderContext);
}).catch(error => {
    console.error('PDF 加载失败:', error);
});
</script>
```

---

## 核心 API

### 1. PDFDocumentLoadingTask

通过 `pdfjsLib.getDocument()` 创建，用于加载 PDF 文档。

```javascript
const loadingTask = pdfjsLib.getDocument({
    url: 'document.pdf',           // PDF 文件路径
    cMapUrl: '/path/to/cmaps/',    // 字符映射表路径（处理中文等非ASCII字符）
    cMapPacked: true               // 是否使用打包的 cmap
});
```

**返回 Promise**，resolve 后得到 `PDFDocumentProxy` 对象。

### 2. PDFDocumentProxy

代表加载的 PDF 文档，提供以下方法：

| 方法 | 说明 |
|------|------|
| `pdf.numPages` | 获取总页数 |
| `pdf.getPage(pageNumber)` | 获取指定页面（返回 Promise） |
| `pdf.destroy()` | 销毁文档，释放内存 |

### 3. PDFPageProxy

代表 PDF 的一页，提供页面渲染和信息获取功能。

```javascript
page.getViewport({
    scale: 1.0,           // 缩放比例
    rotation: 0,          // 旋转角度（0, 90, 180, 270）
    dontFlip: false       // 是否禁止翻转
});
```

---

## 完整示例

### 示例 1：基本渲染

```html
<!DOCTYPE html>
<html>
<head>
    <title>PDF.js 基础示例</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.js"></script>
    <style>
        #pdf-container {
            width: 800px;
            margin: 0 auto;
        }
        canvas {
            border: 1px solid #ccc;
        }
    </style>
</head>
<body>
    <div id="pdf-container">
        <canvas id="pdf-canvas"></canvas>
    </div>

    <script>
        const canvas = document.getElementById('pdf-canvas');
        const ctx = canvas.getContext('2d');

        // 配置 worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js';

        // 加载 PDF
        const loadingTask = pdfjsLib.getDocument('sample.pdf');
        
        loadingTask.promise.then(pdf => {
            console.log('总页数:', pdf.numPages);
            return pdf.getPage(1);
        }).then(page => {
            // 设置高 DPI 支持
            const scale = 2.0;
            const viewport = page.getViewport({ scale });
            const outputScale = window.devicePixelRatio || 1;

            canvas.width = Math.floor(viewport.width * outputScale);
            canvas.height = Math.floor(viewport.height * outputScale);
            canvas.style.width = Math.floor(viewport.width) + 'px';
            canvas.style.height = Math.floor(viewport.height) + 'px';

            const transform = outputScale !== 1 
                ? [outputScale, 0, 0, outputScale, 0, 0] 
                : null;

            const renderContext = {
                canvasContext: ctx,
                transform: transform,
                viewport: viewport
            };

            return page.render(renderContext);
        }).catch(err => {
            console.error('加载失败:', err);
        });
    </script>
</body>
</html>
```

### 示例 2：多页导航

```html
<!DOCTYPE html>
<html>
<head>
    <title>PDF 多页浏览</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.js"></script>
    <style>
        .controls {
            margin: 20px 0;
            text-align: center;
        }
        button {
            padding: 8px 16px;
            margin: 0 10px;
            cursor: pointer;
        }
        canvas {
            display: block;
            margin: 0 auto;
            border: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <div class="controls">
        <button id="prev-btn">上一页</button>
        <span id="page-info">第 1 页 / 共 0 页</span>
        <button id="next-btn">下一页</button>
    </div>
    <canvas id="pdf-canvas"></canvas>

    <script>
        const canvas = document.getElementById('pdf-canvas');
        const ctx = canvas.getContext('2d');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const pageInfo = document.getElementById('page-info');

        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js';

        let pdf = null;
        let currentPage = 1;

        // 加载 PDF
        pdfjsLib.getDocument('document.pdf').promise.then(doc => {
            pdf = doc;
            pageInfo.textContent = `第 ${currentPage} 页 / 共 ${pdf.numPages} 页`;
            renderPage(currentPage);
        });

        // 渲染指定页面
        function renderPage(pageNum) {
            pdf.getPage(pageNum).then(page => {
                const scale = 1.5;
                const viewport = page.getViewport({ scale });

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                page.render({
                    canvasContext: ctx,
                    viewport: viewport
                });
            });
        }

        // 上一页
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                pageInfo.textContent = `第 ${currentPage} 页 / 共 ${pdf.numPages} 页`;
                renderPage(currentPage);
            }
        });

        // 下一页
        nextBtn.addEventListener('click', () => {
            if (currentPage < pdf.numPages) {
                currentPage++;
                pageInfo.textContent = `第 ${currentPage} 页 / 共 ${pdf.numPages} 页`;
                renderPage(currentPage);
            }
        });
    </script>
</body>
</html>
```

### 示例 3：Base64 编码的 PDF

```javascript
// Base64 编码的 PDF 数据
const base64Data = 'JVBERi0xLjMKJcfsj6IKNSAwIG9iago8PC9MZW5ndGggNiAwIFIvRmlsdGVyIC9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nE2NuwoCQQxF...';

// 转换为 Uint8Array
const pdfData = new Uint8Array(atob(base64Data).split('').map(char => char.charCodeAt(0)));

// 加载 PDF
const loadingTask = pdfjsLib.getDocument({ data: pdfData });

loadingTask.promise.then(pdf => {
    console.log('Base64 PDF 加载成功');
    // 后续处理...
});
```

---

## 高级功能

### 1. 文本提取

```javascript
pdf.getPage(1).then(page => {
    return page.getTextContent();
}).then(textContent => {
    // 遍历文本块
    let text = '';
    textContent.items.forEach(item => {
        text += item.str + ' ';
    });
    console.log('页面文本:', text);
});
```

### 2. 缩放控制

```javascript
// 根据期望宽度计算缩放比例
const desiredWidth = 600;
const viewport = page.getViewport({ scale: 1 });
const scale = desiredWidth / viewport.width;
const scaledViewport = page.getViewport({ scale });
```

### 3. 错误处理

```javascript
const loadingTask = pdfjsLib.getDocument('missing.pdf');

loadingTask.promise.then(pdf => {
    // 成功处理
}).catch(error => {
    console.error('PDF 加载失败:', error);
    alert('无法加载 PDF 文件，请检查文件路径是否正确');
});
```

### 4. 配置 Worker

```javascript
// 设置 worker 路径
pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';

// 或在加载时指定
const loadingTask = pdfjsLib.getDocument({
    url: 'document.pdf',
    workerSrc: 'pdf.worker.min.js'
});
```

---

## 注意事项

1. **跨域问题**：PDF 文件需要与页面同域，或配置 CORS
2. **性能优化**：大文件建议使用流式加载
3. **内存管理**：使用完 PDF 后调用 `pdf.destroy()` 释放资源
4. **字体支持**：非 ASCII 字符需配置 cMap 文件

---

## 参考资源

- [官方文档](https://mozilla.github.io/pdf.js/)
- [API 文档](https://mozilla.github.io/pdf.js/api/draft/)
- [示例代码](https://mozilla.github.io/pdf.js/examples/)
- [GitHub 仓库](https://github.com/mozilla/pdf.js)