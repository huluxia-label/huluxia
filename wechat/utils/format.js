// 文本格式化
let timeText = e => {
  let a = new Date(),
      b = new Date(parseInt(e)),
      c = a - b, // 拿到毫秒值
      d = Math.floor(c / 1000 / 60)
  return `${d}分钟前`
}

module.exports = {
  time: timeText
}