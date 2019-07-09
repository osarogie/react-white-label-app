export function pluralise(word = '') {
  if (word.endsWith('ry')) return `${word.substr(0, word.length - 1)}ies`
  if (word.endsWith('s') || word.endsWith('th')) return `${word}es`
  return `${word}s`
}
