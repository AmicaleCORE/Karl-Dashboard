export function searchParser (text) {
  return text.toLowerCase()
    .replace(/[éèëê]/g, 'e')
    .replace(/[ïî]/g, 'i')
    .replace(/[öô]/g, 'o')
    .replace(/[- ]/g, '')
}

export function parseMoney (number) {
  return number.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
