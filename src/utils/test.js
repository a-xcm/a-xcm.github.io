const a = ''; const b = ' ';
// 请依次说出下面的输出结果：
// console.log(a.split('')) // [ ]
// console.log(a.split(' ')) // [ '' ]
// console.log(b.split('')) // [ ' ' ]
// console.log(b.split(' ')) // [ '', '' ]


/** 
 *1. 两数之和

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

你可以按任意顺序返回答案。 
 * 
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
export const twoSum = function(nums, target) {
    for(let i = 0; i < nums.length; i++){
        for(let j = i+1; j < nums.length; j++){
            if(nums[i] + nums[j] === target){
                return [i,j]
            }
        }
    }
};

/**
 * 小R正在计划一次从地点A到地点B的徒步旅行，总路程需要 N 天。为了在旅途中保持充足的能量，小R每天必须消耗1份食物。
 * 幸运的是，小R在路途中每天都会经过一个补给站，可以先购买完食物后再消耗今天的1份食物。
 * 然而，每个补给站的食物每份的价格可能不同，并且小R在购买完食物后最多只能同时携带 K 份食物。

现在，小R希望在保证每天食物消耗的前提下，以最小的花费完成这次徒步旅行。你能帮助小R计算出最低的花费是多少吗？
**输入 **

n 总路程需要的天数
k 小R最多能同时携带食物的份数
data[i] 第i天补给站每份食物的价格

返回完成这次徒步旅行的最小花费
输入：n = 5 ,k = 2 ,data = [1, 2, 3, 3, 2]
输出：9
 */

export function minCost(n, k, data) {
    // 初始化总花费和当前携带的食物数量
    let totalCost = 0;
    let currentFood = 0;

    // 遍历每一天
    for (let i = 0; i < n; i++) {
        // 如果当前携带的食物数量不足1份，则需要在当前补给站购买食物
        if (currentFood < 1) {
            // 找到下一个比当前价格更便宜的补给站
            let nextCheaperIndex = i;
            for (let j = i + 1; j < n && j <= i + k; j++) {
                if (data[j] < data[i]) {
                    nextCheaperIndex = j;
                    break;
                }
            }

            // 计算需要购买的食物数量
            let foodToBuy = Math.min(k, nextCheaperIndex - i);
            if (nextCheaperIndex === i) {
                foodToBuy = Math.min(k, n - i);
            }
            // 计算购买食物的花费
            totalCost += foodToBuy * data[i];

            // 更新当前携带的食物数量
            currentFood += foodToBuy;
        }

        // 每天结束时，消耗1份食物
        currentFood--;
    }

    return totalCost;
}


/**
 * 在一场经典的德州扑克游戏中，有一种牌型叫做“葫芦”。
 * “葫芦”由五张牌组成，其中包括三张相同牌面值的牌 a和另外两张相同牌面值的牌 b
    如果两个人同时拥有“葫芦”，我们会优先比较牌 a的大小，
    若牌 a 相同则再比较牌 b 的大小，
    牌面值的大小规则为：1 (A) > K > Q > J > 10 > 9 > ... > 2，
    其中 1 (A) 的牌面值为1，K 为13，依此类推。

在这个问题中，我们对“葫芦”增加了一个限制：组成“葫芦”的五张牌牌面值之和不能超过给定的最大值 max
 * @param {*} n 
 * @param {*} max 
 * @param {*} array 
 * @returns 
 */
export function getHulu(n,max,array) {
    // array 排序
    array.sort((a,b) => a - b);
    //array数组中每个数字出现的次数
    let map = new Map();
    for(let i = 0;i < array.length;i++){
        if(map.has(array[i])){
            map.set(array[i],map.get(array[i]) + 1);
        }else{
            map.set(array[i],1);
        }
    }
    // 生成所有可能的组合
    let three = [];
    let two = []

    for(let [key,value] of map){
        if(value >= 3){
           three.push(key)
        }
        if(value >= 2){
            two.push(key)
        }
    }
    if(three.length==0 || two.length==0){
        return [0,0];
    }
    let group = [];
    for(let i = 0;i<three.length;i++){
        for(let j = 0;j<two.length;j++){
            if(three[i] !== two[j]){
                group.push([three[i],two[j]])
            }
        }
    }
    // 筛选符合条件的组合
    let res = [];
    for(let i = 0;i<group.length;i++){
       let count = group[i][0]*3+group[i][1]*2;
       if(count<=max){
           res.push(group[i]);
       }
    }
    if(res.length==0)return [0,0]
    //比较大小
   let max1 = Math.max(...res.map(i=>i[0]))
   if(res.map(i=>i[0]).includes(1)){
    max1 = 1
   }
   let res2 = res.filter(i=>i[0]===max1);
   if(res2.length==1){
    return res2[0]
   }else{
    let max2 = Math.max(...res2.map(i=>i[1]));
    if(res2.map(i=>i[1]).includes(1)){
        max2 = 1
    }
    return res2.filter(i=>i[1]===max2)[0]
   }
}

export function matchTemplate(n, template_, titles) {
    // Please write your code here
    let str = template_.toString().replace(/{.*?}/g, ".*?")
    let reg = new RegExp('^'+str+'$')
    let flagArr = []
    for (let i = 0; i < n; i++) {
      let flagStr = reg.test(titles[i]).toString()
        //首字母大写
        flagStr = flagStr.charAt(0).toUpperCase() + flagStr.slice(1)

      flagArr.push(flagStr)
    }
    let returnStr = flagArr.join(',')
    return returnStr;
  }


  /**
   * 输入：n = 3
   * 输出：[3, 2, 1, 3, 2, 3]
   * @param {*} n 
   */
export function specificArray(n){
    let arr = [];
    for(let i = 0; i < n; i++){
        for(let j = 0; j < n-i; j++){
            arr.push(n-j)
        }
    }
    return arr;
}

export function matchRace(n){
    let total = 0
   while(n > 1 ){
      if(n % 2 === 0){
          total += n / 2
          n = n / 2
      }else{
        total += (n-1)/2
        n = (n - 1) / 2 + 1;
      }
   }
   return total
}

//b数字插入到a数字的数  取最大
function getaMax(a, b) {
    // PLEASE DO NOT MODIFY THE FUNCTION SIGNATURE
    // write code here
    let numList = []
    let astr = a.toString()
    
   
    // 枚举法
    for(let i = 0; i < astr.length; i++){
        // 拆分字符串
       let newNum = Number(astr.slice(0,i)+b+astr.slice(i))
        numList.push(newNum)
    }
    numList.push(Number(a.toString()+b))


    return Math.max(...numList);
}


//
// getCombination(['a',23,45])


// 满足一下算法
// [1,23,45] => [124,125,134,135,]
// [12,34,5] => [135,145,235,245]
// [12,34] => [13,14,23,24]
//  [1,2,3]=> [123]
// [1,2,3,4]=> [1234]
// [123,456]=> [14,15,16,24,25,26,34,35,36,45,46,56]

export function generateCombinations(arr) {
    // 辅助函数：从单个字符串中获取字符数组
    function getChars(str) {
        return str.toString().split('');
    }

    // 递归函数：生成基于已有组合和新元素的所有可能组合
    function combine(prevCombos, newElement) {
        let result = [];
        for (let combo of prevCombos) {
            for (let char of getChars(newElement)) {
                result.push(combo + char);
            }
        }
        return result;
    }

    // 如果数组为空，返回空数组
    if (arr.length === 0) return [];

    // 初始化组合为第一个元素的字符数组
    let combinations = getChars(arr[0]);

    // 对于数组中的每个后续元素，更新组合列表
    for (let i = 1; i < arr.length; i++) {
        combinations = combine(combinations, arr[i]);
    }
    //筛选出符合条件的组合 每个位数加上为偶数
    combinations = combinations.filter(item=>{
        let sum = 0;
        for(let i = 0; i < item.length; i++){
            sum += Number(item[i])
        }
        return sum % 2 === 0
    })


    return combinations.length;
}
// 将 'a' 变成 'bc'
// 将 'b' 变成 'ca'
// 将 'c' 变成 'ab'
export function translocate(s,k) {
  
    let map = new Map()
    map.set('a','bc')
    map.set('b','ca')
    map.set('c','ab')
    let str = s
   while(k > 0){
        let newStr = ''
        for(let i = 0; i < str.length; i++){
            newStr += map.get(str[i])
        }
        str = newStr
        k--
    }
    return str;
}

// 如果分数中有三个或以上不同的分数，返回其中第三大的分数。
// 如果不同的分数只有两个或更少，那么小M将选择最大的分数作为他的目标。
function getThird(n, nums) {
    // PLEASE DO NOT MODIFY THE FUNCTION SIGNATURE
    // write code here
    const map = new Map()
    //最大的
    let max = Math.max(...nums)
    nums.forEach(num => {
        if (map.has(num)) {
            map.set(num, map.get(num) + 1)
        } else {
            map.set(num, 1)
        }
    });
    let num_M = max
    if (map.size >= 3) {

        let secondNums = nums.filter(i => i !== max);
        let second = Math.max(...secondNums)

        let thirdNums = secondNums.filter(i => i !== second)
        let third = Math.max(...thirdNums)
        num_M = third
    }

    return num_M;
}

// console.log(solution(3, [3, 2, 1]) === 1);
// console.log(solution(2, [1, 2]) === 2);
// console.log(solution(4, [2, 2, 3, 1]) === 1);

// 获取数组交集 返回结果排序 大到小
export function getIntersection(arr1, arr2) {
    return arr1.filter(item => arr2.includes(item)).sort((a, b) => b - a);
}

//    合并区间
//例 [[1,3],[6,8],[2,7]] =>[[1,8]]
// [[2,3],[5,9]] =>[[2,3],[5,9]]
// [[1,4],[2,3]] =>[[1,4]]
function getInterval(arr){
  // 处理边界条件
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
}

// 按照区间的起始位置排序
let sortedArr = arr.sort((a, b) => a[0] - b[0]);

let result = [];
for (let i = 0; i < sortedArr.length; i++) {
    let currentInterval = sortedArr[i];

    // 如果结果数组为空或者当前区间不与最后一个结果区间重叠
    if (result.length === 0 || result[result.length - 1][1] < currentInterval[0]) {
        result.push(currentInterval);
    } else {
        // 合并区间
        result[result.length - 1][1] = Math.max(result[result.length - 1][1], currentInterval[1]);
    }
}

return result;
  
}

// console.log(getInterval([[1,3],[6,8],[2,7],[1,7]]))
// console.log(getInterval([[1,3],[4,8]]))

// 将显示的数字乘以2；
// 将显示的数字减去1。
// 现在，计算器上显示的数字是 x，小M希望通过最少的操作次数，将数字变为 y。

// 请你帮忙计算一下，最少需要多少次操作才能将数字从 x 变为 y。
function getNumber(x,y){
    let num = 0
   while(y>x){
    if(y%2===0){
        y = y/2
        num +=1
    }else{
        y = (y+1)
        num += 1
    }
   }
   if(y<=x){
    num += Math.abs(y-x)
    }
return num
}


// 使用正则从字符串中获取数字
function getNumber1(str) {
    // 使用正则表达式匹配数字
    const regex = /\d+/g;
    const matches = str.match(regex);
    if (!matches) {
        return 0;
    }
   
    // 将匹配到的数字转换为整数数组
    const numbers = matches.map(Number);
    //数组去重
    const uniqueNumbers = [...new Set(numbers)];

   

    return uniqueNumbers.length;
}



/**
 * 斐波拉契数列
 * @param {*} n 
 * @returns 
 */
function fib(n) {
    let dp = [0, 1, 1];
    for (let i = 3; i <= n; i++) {

        // 当前值等于前两个值之和
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}


/**
 * @param {number[]} piles
 * @return {number}
 */
var maxCoins = function(piles) {
    const sort= piles.sort((a,b)=>a-b)
    console.log(sort)
    let n = piles.length / 3;
    let sum = 0
    for(let i=n;i<sort.length;i=i+2){
        sum = sum + sort[i]
    }
    return sum
};
const piles=  [9,5,6,8,10,1,4,10,7]
console.log(maxCoins(piles))