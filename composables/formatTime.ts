export const useFormatTime = () => {
  const formatDate = (dateString: string) => {
    if (!dateString)
      return ''
    return new Date(dateString).toLocaleDateString('zh-TW')
  }

  const formatDateTime = (datetime: string) => {
    if (!datetime)
      return '未知時間'
    const date = new Date(datetime)
    return date.toLocaleString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      // 取得 周期幾
      weekday: 'short',
      timeZone: 'Asia/Taipei'
    })
  }

  return { formatDate, formatDateTime }
}
