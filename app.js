const AV = require('./utils/av-weapp-min');
//appsecret(小程序秘钥)353b5fa696b74b9d14a210bdbb1798ab
AV.init({
  appId: 'SqgBMhUdxEdPcMAhTcl0wz4g-gzGzoHsz',
  appKey: 'lvEScfynu3FQvU3DlD0fi9dz',
});

AV.User.loginWithWeapp().then(user => {
  // this.globalData.user = user.toJSON();
}).catch(console.error);

// // 获得当前登录用户
const user = AV.User.current();

// 调用小程序 API，得到用户信息
wx.getUserInfo({
  success: ({userInfo}) => {
    // 更新当前用户的信息
    user.set(userInfo).save().then(user => {
      // 成功，此时可在控制台中看到更新后的用户信息
      // this.globalData.user = user.toJSON();
    }).catch(console.error);
  }
});
//app.js
App({

})





