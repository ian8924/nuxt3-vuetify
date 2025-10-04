export const useFormatTime = () => {
  const formatDate = (dateString: string) => {
    if (!dateString)
      return ''
    return new Date(dateString).toLocaleDateString('zh-TW')
  }

  return { formatDate }
}
