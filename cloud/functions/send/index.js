
const cloud = require('wx-server-sdk');


exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database();
  const d = new Date()
  let year = d.getFullYear()
  let month = d.getMonth() + 1;
  let date = d.getDate();
  let hour = d.getHours();
  let min = d.getMinutes();
  const totalDay = new Date(year, month, 0).getDate()
  hour = hour + 8
  if (hour >= 24) {
    hour = hour % 24;
    date = date + 1
    if (date + 1 > totalDay) {
      date = 1
      month = month + 1
      if (month > 13) {
        month = 1;
        year = year + 1
      }
    }
  }

  min = min > 9 ? min : '0' + min;
  month = month > 9 ? month : '0' + month;
  date = date > 9 ? date : '0' + date;
  hour = hour > 9 ? hour : '0' + hour;
  const nowTime = year + '-' + month + '-' + date + ' ' + hour + ':' + min;
  try {
    // 从云开发数据库中查询等待发送的消息列表
    const messages = await db
      .collection('messages')
      // 查询条件这里做了简化，只查找了状态为未发送的消息
      // 在真正的生产环境，可以根据开课日期等条件筛选应该发送哪些消息
      .where({
        done: false,
        data: {
          time6: {
            value: nowTime
          }
        }
      })
      .get();
    const sendPromises = messages.data.map(async message => {
      try {
        // 发送订阅消息
        await cloud.openapi.subscribeMessage.send({
          touser: message.touser,
          page: message.page,
          data: message.data,
          templateId: message.templateId,
        });
        return db
          .collection('messages')
          .doc(message._id)
          .update({
            data: {
              done: true,
            },
          });
      } catch (e) {
        return e;
      }


    });

    return Promise.all(sendPromises);
  } catch (err) {
    console.log(err);
    return err;
  }
};