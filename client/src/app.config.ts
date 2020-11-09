export default {
  pages: [
    'pages/schedule/index',
    'pages/index/index',
    'pages/other/index',
    'pages/number/index',
    'pages/addlist/index',

  ],
  tabBar: {
    color: '#008c8c',
    selectedColor: '#ccc',
    backgroundColor: 'white',
    list: [
      {
        pagePath: 'pages/schedule/index',
        iconPath: 'assets/images/schedule-active.png',
        selectedIconPath: 'assets/images/schedule.png',
        text: '日程'
      },
      {
        pagePath: 'pages/index/index',
        iconPath: 'assets/images/weather.png',
        selectedIconPath: 'assets/images/weather-active.png',
        text: '天气'
      },
      {
        pagePath: 'pages/other/index',
        iconPath: 'assets/images/other.png',
        selectedIconPath: 'assets/images/other-active.png',
        text: '其他'
      },
    ]
  },
  usingComponents: {},
  "permission": {
    "scope.userLocation": {
      "desc": "请打开位置开关"
    }
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '',
    navigationBarTextStyle: 'black'
  },
  cloud: true
}
