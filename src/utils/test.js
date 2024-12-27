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

console.log(matchRace(14));