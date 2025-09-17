Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: '', // 账号输入值
    password: '', // 密码输入值
    tips: '', // 提示信息（错误/成功）
    isLoading: false // 登录按钮加载状态
  },

  // 1. 监听账号输入
  handleUsernameInput(e) {
    this.setData({
      username: e.detail.value.trim() // 去空格
    });
  },

  // 2. 监听密码输入
  handlePasswordInput(e) {
    this.setData({
      password: e.detail.value.trim()
    });
  },

  // 3. 登录按钮点击事件
  handleLogin() {
    const { username, password } = this.data;

    // 3.1 前端基础验证（非空）
    if (!username) {
      this.setData({ tips: '请输入账号' });
      return;
    }
    if (!password) {
      this.setData({ tips: '请输入密码' });
      return;
    }

    // 3.2 显示加载状态，清空之前的提示
    this.setData({
      isLoading: true,
      tips: ''
    });

    // 3.3 调用后端登录接口（替换为你的HTTPS接口地址）
    wx.request({
      url: 'https://abc123.ngrok.io/api/login', // 后端HTTPS地址
      method: 'POST', // 必须用POST（避免密码暴露在URL中）
      data: { username, password }, // 传账号密码（JSON格式）
      header: {
        'Content-Type': 'application/json' // 告诉后端请求体是JSON
      },
      // 3.4 接口成功回调
      success: (res) => {
        const { code, msg, data } = res.data;
        if (code === 0) {
          // 登录成功：存储登录态（token）+ 跳转首页
          wx.setStorageSync('token', data.token); // 本地存储token
          wx.setStorageSync('userInfo', data.userInfo); // 存储用户信息
          wx.showToast({ title: '登录成功' }); // 提示
          // 跳转首页（关闭当前登录页，避免返回）
          wx.redirectTo({ url: '/pages/index/index' });
        } else {
          // 登录失败：显示错误提示
          this.setData({ tips: msg });
        }
      },
      // 3.5 接口失败回调（如网络错误）
      fail: (err) => {
        console.error('登录请求失败：', err);
        this.setData({ tips: '网络错误，请稍后重试' });
      },
      // 3.6 无论成功失败，都关闭加载状态
      complete: () => {
        this.setData({ isLoading: false });
      }
    });
  }
});