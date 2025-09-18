Page({
  data: {},

  // 跳转到登录页
  goToLogin() {
    // 方式1：保留当前页面，跳转后可返回（适合临时跳转）
    wx.navigateTo({
      url: '/pages/login/login'  // 目标页面路径（绝对路径，以/开头）
    });
  },

  // 跳转到个人中心
  goToMine() {
    // 方式2：关闭当前页面，跳转后不可返回（适合流程性跳转）
    wx.redirectTo({
      url: '/pages/mine/mine'
    });
  },

  // 跳转到详情页（示例）
  goToDetail() {
    // 带参数跳转（如传递ID）
    wx.navigateTo({
      url: '/pages/detail/detail?id=123&name=示例'  // 参数用?拼接，&分隔
    });
  }
});