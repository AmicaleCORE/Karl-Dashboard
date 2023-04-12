export function searchParser (text) {
  return text.toLowerCase()
    .replaceAll(/[éèëê]/g, 'e')
    .replaceAll(/[ïî]/g, 'i')
    .replaceAll(/[öô]/g, 'o')
    .replaceAll(/[- ]/g, '')
}
