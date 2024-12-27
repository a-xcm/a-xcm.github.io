function solution(n, template_, titles) {
    // Please write your code here
    let str = template_.toString().replace(/{.*?}/g, ".*?")
    let reg = new RegExp(str)
    console.log(reg)
    let flagArr = []
    for (let i = 0; i < n; i++) {
      let flagStr = reg.test(titles[i]).toString()
      flagArr.push(flagStr)
    }
    console.log(flagArr)
    return flagArr;
  }

  const testTitles1 = ["adcdcefdfeffe", "adcdcefdfeff", "dcdcefdfeffe", "adcdcfe"];
  const testTitles2 = ["CLSomGhcQNvFuzENTAMLCqxBdj", "CLSomNvFuXTASzENTAMLCqxBdj", "CLSomFuXTASzExBdj", "CLSoQNvFuMLCqxBdj", "SovFuXTASzENTAMLCq", "mGhcQNvFuXTASzENTAMLCqx"];
  const testTitles3 = ["abcdefg", "abefg", "efg"];

  console.log(solution(4, "ad{xyz}cdc{y}f{x}e", testTitles1) === "True,False,False,True");
  console.log(solution(6, "{xxx}h{cQ}N{vF}u{XTA}S{NTA}MLCq{yyy}", testTitles2) === "False,False,False,False,False,True");
  console.log(solution(3, "a{bdc}efg", testTitles3) === "True,True,False");