// map.js
const AV = require('../../utils/av-weapp-min');
Page({
  data: {
    longitude: '',
    latitude: '',
    controls: [{//控件
      id: 1,
      iconPath: '/img/myLocation.png',
      position: {
        left: 15,
        top: 545,
        width: 35,
        height: 35
      },
      clickable: true
    }, {
      id: 2,
      iconPath: '/img/center.png',
      position: {
        left: 170,
        top: 275,
        width: 35,
        height: 35
      }
    }],
    circles: [],
    markers: []
  },

  onLoad: function () {
    this.getMylocation()
  },
  getMylocation: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.requestUserLest(res)
        that.saveLocation(res)
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        var circleArr = []
        var circle = that.createCircles(res)
        circleArr.push(circle)
        that.setData({
          longitude: Number(longitude),
          latitude: Number(latitude),
          circles: circleArr
        })
      }
    })
  },
  saveLocation: function (e) {
    var currentUser = AV.User.current()
    var lquery = new AV.Query('location')
    var todoFolder = AV.Object.createWithoutData('_User', currentUser.id);
    lquery.equalTo('user', todoFolder);
    lquery.find().then(function (results) {
      if (results.length > 0) {
        var location = results[0];
        var classID = location.id;
      }
      var location = AV.Object.extend('location')
      var comment = new location()
      var latitude = e.latitude
      var longitude = e.longitude
      var point = new AV.GeoPoint(latitude, longitude)
      var targetTodoFolder = AV.Object.createWithoutData('_User', currentUser.id)
      // 第一个参数是 className，第二个参数是 objectId
      var todo = AV.Object.createWithoutData('location', classID);
      // 修改属性
      todo.set('user', targetTodoFolder)
      todo.set('whereCreated', point)
      // 保存到云端
      todo.save();
    });
  },
  requestUserLest: function (e) {
    var that = this
    var query = new AV.Query('location');
    var latitude = e.latitude
    var longitude = e.longitude
    var point = new AV.GeoPoint(latitude, longitude);
    query.withinKilometers('whereCreated', point, 10000.0);
    query.include('user');
    query.find().then(function (results) {
      var nearbyTodos = results;
      console.log(nearbyTodos)
      var dataArr = []
      for (var i = 0; i < nearbyTodos.length; i++) {
        var item = nearbyTodos[i];
        console.log(item)
        Math.random() * 21
        var num = Math.random() * 21;
        num = parseInt(num, 10);
        let yigedian = {
          id: i,
          latitude: item.get('whereCreated').latitude,
          longitude: item.get('whereCreated').longitude,
          iconPath: '/img/icecream-' + num + '.png',
          width: 30,
          height: 30
        };
        dataArr.push(yigedian)
      }

      that.setData({
        markers: dataArr
      })
      console.log(markers)
    }, function (error) {
      console.log(error)
    });
  },
  createCircles(e) {
    let circle1 = {
      latitude: Number(e.latitude),
      longitude: Number(e.longitude),
      color: "#eeeeeeAA",
      fillColor: "#7cb5ec88",
      radius: 2000,
      strokeWidth: 1
    };
    return circle1;
  },
  controltap(e) {
    console.log(e)
    if (e.controlId == 1) {
this.getMylocation()
    }

  },
  marktap(e) {
    console.log(e)
  }
})
