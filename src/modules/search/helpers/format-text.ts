export const formatText = (text: string | null) => {
  if (text === null) {
    return 'Нет описания'
  }
  const maxLength = 400
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  } else {
    return text
  }
}