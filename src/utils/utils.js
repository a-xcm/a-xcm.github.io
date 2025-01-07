const arr = [2,10,1,8,100,20,34,23]

/**
 * 冒泡排序
 * @param {*} arr 
 * @returns 
 */
function bubbleSort(arr){
    for(let i = 0; i < arr.length-1; i++){
        for(let j = 0;j<arr.length-1-i;j++){
            console.log(arr[j],arr[j+1],);
            if(arr[j]>arr[j+1]){
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
            }
        }
    }
    return arr
}
/**
 * 选择排序
 * @param {*} arr 
 * @returns 
 */
function selectionSort(arr){
    for(let i = 0; i < arr.length-1; i++){
        let indexMin = i
        for(let j = i+1;j<arr.length;j++){
            if(arr[j]<arr[indexMin]){
                indexMin = j
                if(indexMin !==i ){
                    [arr[i],arr[indexMin]] = [arr[indexMin],arr[i]]
                }
            }
        }
    }
    return arr
}
/**
 * 插入排序
 * @param {*} arr   
 * @returns 
 */
function insertionSort(arr){
    for(let i = 1;i<arr.length;i++){
        const current = arr[i]
        let j = i
        while(j>0){
            if(arr[j-1]>current){
                arr[j] = arr[j-1]
            }else{
                break
            }
            j--;
        }
        arr[j] = current
    }

    return arr
}

/**
 * 归并排序
 * @param {*} arr 
 * @returns 
 */
function mergeSort(arr){
    const rec = (arr)=>{
        if(arr.length === 1){
            return arr
        }
        const mid = arr.length >> 1
        const left = arr.slice(0,mid)
        const right = arr.slice(mid)
        
        const orderLeft = rec(left)
        const orderRight = rec(right)

        const res = []
        while(orderLeft.length || orderRight.length){
           if(orderLeft.length && orderRight.length){
            res.push(orderLeft[0] < orderRight[0] ? orderLeft.shift(): orderRight.shift())
           }else if(orderLeft.length){
            res.push(orderLeft.shift())
           }else if(orderRight.length){
            res.push(orderRight.shift())
           }
        }
        return res
    }
    const res = rec(arr)
    res.array.forEach((n,i) => {
        arr[i] = n
    });
    return arr
}
/**
 * 快速排序
 * @param {*} arr 
 * @returns 
 */
function quickSort(arr){
    const rec = (arr)=>{
        if(arr.length <= 1){
            return arr
        }
        const mid = arr[0]
        const left = []
        const right = []
        for(let i = 1;i<arr.length;i++){
            if(arr[i] < mid){
                left.push(arr[i])
            }else{
                right.push(arr[i])
            }
        }
        return [...rec(left),mid,...rec(right)]
    }
    const res = rec(arr)
    res.array.forEach((n,i) => {
        arr[i] = n
    });
    return arr
}




/**
 * 防抖 高频率触发的事件只执行一次
 * @param {*} fn 
 * @param {*} delay 
 * @returns 
 */
function debounce(fn, delay) {
    let timer = null
    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}
/**
 * 节流 高频率触发的事件 在指定单位时间内，只执行第一次
 * @param {*} fn 
 * @param {*} delay 
 * @returns 
 */
function throttle(fn, delay) {
    let timer = null
    return function (...args) {
        if (timer) return
        timer = setTimeout(() => {
            fn.apply(this, args)
            timer = null
        }, delay)
    }
}

/**
 * 图片压缩
 * @param {*} img 
 * @param {*} maxWidth 
 * @returns 
 */
function compressImage(img, maxWidth,) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let type = ''
    img.onload = function (e) {
        canvas.width = maxWidth;
        canvas.height = img.height * (maxWidth / img.width);
    };
    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error('Failed to compress image'));
            }
        }, 'image/png', 0.9);
    });
}
/**
 * 深拷贝
 */
function cloneDeep(source){
    const isArray = Array.isArray(source);
    const isObject = typeof source === 'object' && source !== null;
    
}


export { 
    bubbleSort, 
    selectionSort, 
    insertionSort, 
    mergeSort, 
    quickSort,
    debounce, 
    throttle,
    compressImage 
}