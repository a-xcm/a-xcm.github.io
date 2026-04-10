// 封装常用js 支持模块化与直接引入
/**
 * 常用工具函数封装
 * 支持 CommonJS / AMD / ES Module / 直接引入
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? module.exports = factory()
    : typeof define === 'function' && define.amd
      ? define(factory)
      : typeof window !== 'undefined'
        ? window.Utils = factory()
        : typeof global !== 'undefined'
          ? global.Utils = factory()
          : typeof self !== 'undefined'
            ? self.Utils = factory()
            : {};
}(this, function () {
  'use strict';

  /**
   * 深拷贝
   * @param {any} obj
   * @returns {any}
   */
  function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof Array) return obj.map(deepClone);
    const cloned = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }

  /**
   * 防抖
   * @param {Function} fn
   * @param {number} delay
   * @returns {Function}
   */
  function debounce(fn, delay = 300) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  /**
   * 节流
   * @param {Function} fn
   * @param {number} interval
   * @returns {Function}
   */
  function throttle(fn, interval = 300) {
    let last = 0;
    return function (...args) {
      const now = Date.now();
      if (now - last >= interval) {
        last = now;
        fn.apply(this, args);
      }
    };
  }

  /**
   * 判断空值（null/undefined/''/[]/{}/NaN）
   * @param {any} val
   * @returns {boolean}
   */
  function isEmpty(val) {
    return (
      val === null ||
      val === undefined ||
      val === '' ||
      (Array.isArray(val) && val.length === 0) ||
      (typeof val === 'object' && Object.keys(val).length === 0) ||
      Number.isNaN(val)
    );
  }

  /**
   * 获取 url 参数
   * @param {string} name
   * @returns {string|null}
   */
  function getQueryString(name) {
    // 检查是否在浏览器环境中
    if (typeof window !== 'undefined' && window.location) {
      const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      const r = window.location.search.slice(1).match(reg);
      return r ? decodeURIComponent(r[2]) : null;
    }
    // 服务端环境返回 null
    return null;
  }

  /**
   * 格式化日期
   * @param {Date|number|string} date
   * @param {string} fmt yyyy-MM-dd hh:mm:ss
   * @returns {string}
   */
  function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    date = new Date(date);
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds(),
    };
    const yearStr = date.getFullYear() + '';
    fmt = fmt.replace(/(y+)/g, function ($0) {
      return yearStr.slice(4 - $0.length);
    });
    for (const k in o) {
      fmt = fmt.replace(new RegExp('(' + k + ')', 'g'), function ($0) {
        return $0.length === 1 ? o[k] : ('00' + o[k]).slice(-$0.length);
      });
    }
    return fmt;
  }

  // 公共 API
  return {
    deepClone,
    debounce,
    throttle,
    isEmpty,
    getQueryString,
    formatDate,
  };
}));
