// 斐波拉契数列
// f(n) = f(n-1) + f(n-2)
var fib = function(n) {
  // const arr= [0,1]
  // for(let i = 2;i <= n; i++ ){
  //     arr.push(arr[i-1] + arr[i-2])
  // }
 
  // return arr[n]
  if(n<2)return n
  let res = 1
  let tmp = 0
  for(let i = 2;i <= n; i++ ){
    res = res + tmp
    tmp = res - tmp
  }
  
  return res
};

var rob = function(nums) {
 const dp = new Array(nums.length).fill(0)
 dp[0] = nums[0]
 dp[1] = Math.max(nums[0],nums[1])
 for(let i = 2;i < nums.length; i++ ){
   dp[i] = Math.max(dp[i-1],dp[i-2] + nums[i])
 }
 return dp[nums.length-1]
};






export {fib}