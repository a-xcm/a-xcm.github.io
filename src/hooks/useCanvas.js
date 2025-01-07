export default function useCanvas() {
    /**
     * 验证并返回有效的 Canvas 上下文
     * @param {*} ctx 
     */
    const validateContext = (ctx) => {
        if (!ctx || !ctx.canvas) {
            throw new Error('Invalid canvas context');
        }

        return ctx;
    }

    /**
     * 绘制线段
     * @param {*} ctx 
     * @param {*} obj 
     */
    const drawLine = (ctx, { x1 = 0, y1 = 0, x2 = 0, y2 = 0, color = 'black', lineWidth = 1 } = {}) => {
        ctx = validateContext(ctx);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        
        return ctx;
    }

    /**
     * 绘制圆
     * @param {*} ctx 
     * @param {*} obj 
     */
    const drawCircle = (ctx, { x = 0, y = 0, r = 0, color = 'black' } = {}) => {
        ctx = validateContext(ctx);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
        
        return ctx;
    }
    /**
     * 绘制圆路径
     * @param {*} ctx 
     * @param {*} param1 
     */
    const drawCircle2 = (ctx, { x = 0, y = 0, r = 0, color = 'black',lineWidth = 1 } = {}) => {
        ctx = validateContext(ctx);
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx.strokeStyle = color;
        ctx.stroke();
        
        return ctx;
    }
    /**
     * 绘制矩形
     * @param {*} ctx 
     * @param {*} obj 
     */
    const drawRect = (ctx, { x = 0, y = 0, w = 0, h = 0, color = 'black' } = {}) => {
        ctx = validateContext(ctx);
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fillStyle = color;
        ctx.fill();
        
        return ctx;
    }

    /**
     * 绘制文字
     * @param {*} ctx 
     * @param {*} obj 
     */
    const drawText = (ctx, { text = '', x = 0, y = 0, color = 'black', fontSize = 16, fontFamily = 'Arial' } = {}) => {
        ctx = validateContext(ctx);
        if (typeof fontSize !== 'number' || typeof fontFamily !== 'string') {
            throw new Error('Invalid font size or family');
        }
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
        
        return ctx;
    }
    /**
     * 绘制文本路径
     * @param {*} ctx 
     * @param {*} obj 
     */
    const drawText2 = (ctx, { text = '', x = 0, y = 0, color = 'black', fontSize = 16, fontFamily = 'Arial' } = {}) => {
        ctx = validateContext(ctx);
        if (typeof fontSize !== 'number' || typeof fontFamily !== 'string') {
            throw new Error('Invalid font size or family');
        }
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.strokeStyle = color;
        ctx.strokeText(text, x, y);

    }
    /**
     * 绘制图片
     * @param {*} ctx 
     * @param {*} obj 
     */
    const drawImage = (ctx, { img, x = 0, y = 0, w = 0, h = 0 } = {}) => {
        ctx = validateContext(ctx);
        if (!(img instanceof HTMLImageElement) || !img.complete) {
            throw new Error('Invalid or incomplete image');
        }
        ctx.drawImage(img, x, y, w, h);
        
        return ctx;
    }

    /**
     * 绘制背景
     * @param {*} ctx 
     * @param {*} obj 
     */
    const drawBackground = (ctx, { color = 'white' } = {}) => {
        ctx = validateContext(ctx);
        ctx.beginPath();
        ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = color;
        ctx.fill();
        
        return ctx;
    }

    /**
     * 清除画布
     * @param {*} ctx 
     */
    const clearCanvas = (ctx) => {
        ctx = validateContext(ctx);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        return ctx;
    }

    return { drawLine, drawCircle,drawCircle2, drawRect, drawText,drawText2, drawImage, drawBackground, clearCanvas };
}