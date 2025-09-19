// pages/userList/userList.js
Page({
  data: {
    userList: [] // 存储从后端获取的用户数据
  },
  onLoad: function() {
    this.getUsers(); // 页面加载时请求数据
  },
  getUsers: function() {
    wx.request({
      // 后端接口地址（需与 SpringBoot 启动端口一致）
      url: 'http://127.0.0.1:8288/app/list',
      method: 'GET',
      success: (res) => {
        console.log('请求成功，返回数据：', res.data);
        this.setData({
          userList: res.data // 将后端数据存入 data，触发页面渲染
        });
      },
      fail: (err) => {
        console.error('请求失败：', err);
        wx.showToast({
          title: '获取数据失败',
          icon: 'none'
        });
      }
    });
  }
})