// pages/login/login.js
var app = getApp();
var wechatUtil = require('../../utils/wechatRequest.js');
var apiUtil = require('../../utils/apiRequest.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 用户点击登录按钮
   */
  bindGetUserInfo: function (e) {
    wx.showLoading({
      title: '登录信息获取中',
    })

    // 获取登录信息
    var self = this;
    console.log(e.detail);

    wx.login({
      success(res) {
        if (res.code) {
          var code = res.code;
          // 发起网络请求
          apiUtil.getReq("/wx/user/login/",{code:code},function(res) {
            console.log(res);
          })
      }
    }
    })

    wx.getUserInfo({
      success(res) {
        const userInfo = res.userInfo
        const nickName = userInfo.nickName
        const avatarUrl = userInfo.avatarUrl
        const gender = userInfo.gender // 性别 0：未知、1：男、2：女
        const province = userInfo.province
        const city = userInfo.city
        const country = userInfo.country
        console.log("userInfo=" + userInfo)
        console.log("nickName=" + nickName)
        console.log("avatarUrl=" + avatarUrl)
        console.log("gender=" + gender)
        console.log("province=" + province)
        console.log("city=" + city)
        console.log("country=" + country)
      }
    })

  },

  /**
   * 后台登录注册
   */
  login: function (ret) {
    var that = this;
    // console.log("==================ret.headImg=" + ret.headImg);
    var unionId = ret.unionid;
    var openId = ret.openid;
    var nick = ret.userName;
    var headImg = ret.avatarUrl;


    wechatUtil.req("/member/login", {
      "unionId": unionId,
      "openId": openId,
      "nick": nick,
      "headImg": headImg
    }, function (res) {
      if (res.resultCode == 200) {
        console.log("登录注册成功");
        console.log(res);

        //修改member的直播权限
        var member = res.resultContent;
        // member.allowLive = allowLive;
        app.globalData.member = member;
        // console.log(app.globalData.userInfo);
      } else {
        alert("登录注册失败，请退出重新登录");
        console.log("登录注册失败");
        console.log(res);
      }
    });
    //   }else{
    //     console.log("平台登录注册失败");
    //   }
    // })

  }
})