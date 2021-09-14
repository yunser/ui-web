# ui-web

构建 JSON，在浏览器渲染成图片（Canvas）。

Build JSON and render it as an image in the browser（Canvas）.

官网：https://json-ui.yunser.com/

兼容 [Std JSON](https://github.com/yunser/ui-std) 标准。

使用场景：

* 网页生成分享海报。

开发：

```shell
npm i
npm start
```

## 其他

注意事项：

* 图片地址使用 `image.url` 而不是 `image.href`。
* 图片不支持 base64。
* 图片存在跨域的问题。
* 不支持 `shadow.spread` 属性。
