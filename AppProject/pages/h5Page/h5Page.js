Page({
  onLoad: function(options) {
      // 可以在这里进行一些初始化操作，比如根据参数动态设置WebView的src
  },
  onWebViewLoad: function(e) {
      console.log('WebView加载完成', e);
  },
  onWebViewError: function(e) {
      console.error('WebView加载失败', e);
  }
});