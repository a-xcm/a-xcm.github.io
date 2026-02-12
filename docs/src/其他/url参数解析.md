# URL参数解析

## 使用window.location.search解析 

### URLSearchParams是一个浏览器内置的对象，用于解析URL的查询参数。它提供了方便的方法来获取、设置和删除查询参数。

```javascript
function getQueryParam(param) {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(param);
}
```
## 参考资源
- [MDN - URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)