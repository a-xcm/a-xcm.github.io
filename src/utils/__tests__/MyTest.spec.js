import { describe, it, expect,test } from 'vitest'

import { 
  twoSum,
  minCost,
  getHulu, 
  matchTemplate
} from '../test'

describe('all test', () => {
// twoSum 测试用例
describe('twoSum', () => {
  it('should return [0, 1] when nums = [2, 7, 11, 15] and target = 9', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1])
  })

  it('should return [1, 2] when nums = [3, 2, 4] and target = 6', () => {
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2])
  })
  it('should return [0, 1] when nums = [3, 3] and target = 6', () => {
    expect(twoSum([3, 3], 6)).toEqual([0, 1])
  })
})
//minCost 测试用例
describe('minCost', () => {
  it('should return 9 when  n = 5  k=2  data = [1, 2, 3,3,2]', () => {
    expect(minCost(5,2, [1, 2, 3,3,2])).toEqual(9)
  })
  it('should return 9 when  n = 6 k=3  data = [4, 1, 5, 2, 1, 3]', () => {
    expect(minCost(6,3, [4, 1, 5, 2, 1, 3])).toEqual(9)
  })
  it('should return 9 when  n = 5 k=2  data = [1,2,3,3,2]', () => {
    expect(minCost(5,2, [1,2,3,3,2])).toEqual(9)
  })
})

// gethulu测试用例
describe('getHulu', () => {
  it('should return [8,5] when  n = 9  max=34  array=[6, 6, 6, 8, 8, 8, 5, 5, 1]', () => {
    expect(getHulu(9,34,[6, 6, 6, 8, 8, 8, 5, 5, 1])).toEqual([8,5])
  })
  it('should return [6,9] when  n = 9  max=37  array= [9, 9, 9, 9, 6, 6, 6, 6, 13]', () => {
    expect(getHulu(9,37, [9, 9, 9, 9, 6, 6, 6, 6, 13])).toEqual([6,9])
  })
  it('should return [0,0] when  n = 9  max=40  array=[1, 11, 13, 12, 7, 8, 11, 5, 6]', () => {
    expect(getHulu(9,40,[1, 11, 13, 12, 7, 8, 11, 5, 6])).toEqual([0,0])
  })
  it('should return [1,13] when n = 6, max = 50, array = [13, 13, 13, 1, 1, 1]',()=>{
    expect(getHulu(6,50,[13, 13, 13, 1, 1, 1])).toEqual([1,13])
  })
})


//matchTemplate 测试用例
describe('matchTemplate', () => {
  it('test1', () => {
    const testTitles1 = ["adcdcefdfeffe", "adcdcefdfeff", "dcdcefdfeffe", "adcdcfe"];
    expect(matchTemplate(4, "ad{xyz}cdc{y}f{x}e", testTitles1)).toBe("True,False,False,True")
  })
  it('test2', () => {
    const testTitles2 = ["adcdcefdfeffe", "adcdcefdfeff", "dcdcefdfeffe", "adcdcfe"];
    expect(matchTemplate(4, "ad{xyz}cdc{y}f{x}e", testTitles2)).toBe("True,False,False,True")
  })
  it('test3', () => {
    const testTitles3 = ["adcdcefdfeffe", "adcdcefdfeff", "dcdcefdfeffe", "adcdcfe"];
    expect(matchTemplate(4, "ad{xyz}cdc{y}f{x}e", testTitles3)).toBe("True,False,False,True")
  })
})
})