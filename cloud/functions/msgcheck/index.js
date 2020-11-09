// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.security.msgSecCheck({
      content: event.data
    })
    if (result.errCode === 0) {
      return true
    } else {
      return false
    }
  } catch (e) {
    return '内容不合法'
  }
}