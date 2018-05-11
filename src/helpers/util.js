export function clearlyDate(dateStr) {
  let dateObj = typeof dateStr === 'object' ? dateStr : new Date(dateStr)
  let time = dateObj.getTime()
  let now = Date.now()
  let difference = now - time
  let str = ''

  switch (true) {
    case difference < 1000 * 60:
      str = '刚刚'
      break;
    case difference < 1000 * 60 * 60:
      str = Math.floor(difference / (1000 * 60)) + '分钟前'
      break;
    case difference < 1000 * 60 * 60 * 24:
      str = Math.floor(difference / (1000 * 60 * 60)) + '小时前'
      break;
    default:
      str = Math.floor(difference / (1000 * 60 * 60 *24)) + '天前'
      break;
  }

  return str
}
