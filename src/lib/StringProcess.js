const DefaultLineEnding = '\n'

class StringProcess {
  constructor(lineEnding) {
    if (!lineEnding) {
      lineEnding = DefaultLineEnding
    }
    this.lineend = lineEnding
  }

  reverse(text) {
    return text
      .split('')
      .reverse()
      .join('')
  }

  trim = text => text.trim()

  getWordCount(text) {
    let workingText = text
    workingText = this.replaceAll(workingText, '\n', ' ')
    workingText = this.replaceAll(workingText, '.', ' ')
    workingText = this.replaceAll(workingText, ',', ' ')
    workingText = this.replaceAll(workingText, ':', ' ')
    workingText = this.replaceAll(workingText, ';', ' ')
    workingText = this.replaceAll(workingText, '?', ' ')
    let words = workingText.split(' ')
    words = words.filter(word => word.length > 0 && word !== ' ')
    return words.length
  }

  getLineCount(text) {
    if (text.length === 0) return 0
    return (text.match(/\n/g) || []).length
  }

  getSentenceCount(text) {
    if (text.length === 0) return 0
    let workingText = this.denumber(text)
    workingText = this.replaceAll(workingText, '!', '.')
    workingText = this.replaceAll(workingText, '?', '.')
    workingText = this.replaceAll(workingText, '...', '.')
    let sentences = workingText.split('.')
    let sentenceCount = 0
    for (var i = 0; i < sentences.length; i++) {
      if (sentences[i].trim().length > 1) sentenceCount++
    }
    return sentenceCount
  }

  ///Returns a string with input having 0123456789 removed.
  denumber = text => text.replace(/[0-9]/g, '')

  replaceAll = (text, target, replacement) => {
    return text.replace(new RegExp('/' + target + '/', 'g'), replacement)
  }
}

export default StringProcess
