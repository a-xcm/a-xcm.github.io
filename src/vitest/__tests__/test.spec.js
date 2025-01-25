import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { fib} from '../test'

describe('fib', () => {
  it('should return 0 for n = 0', () => {
    expect(fib(0)).toBe(0)
  })

  it('should return 1 for n = 1', () => {
    expect(fib(1)).toBe(1)
  })

  it('should return 1 for n = 2', () => {
    expect(fib(2)).toBe(1)
  })
  it('should return 2 for n = 3', () => {
    expect(fib(3)).toBe(2)
  })
  it('should return 3 for n = 4', () => {
    expect(fib(4)).toBe(3)
  })
})