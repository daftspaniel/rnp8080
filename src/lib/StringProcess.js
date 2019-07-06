const DefaultLineEnding = '\n'

class StringProcess {
  constructor(alineEnding = DefaultLineEnding) {
    this.lineEnding = alineEnding
  }

  getSegments = text => text.split(this.lineEnding)

  trim = text => text.trim()

  getWordCount(text) {
    let workingText = text
    workingText = this.replaceAll(workingText, this.lineEnding, ' ')
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

  ///Replace of all occurances of a string with a substitute.
  replaceAll = (text, target, replacement) => text.split(target).join(replacement)

  ///Add a string to the start of each line in a string.
  prefixLines(text, prefix) {
    let segments = this.getSegments(text)
    let out = ''
    for (let i = 0; i < segments.length; i++) {
      out += prefix + segments[i]
      if (i < (segments.length - 1)) {
        out += this.lineEnding
      }
    }
    return out
  }

  ///Add a string to the end of each line in a string.
  postfixLines(text, postfix) {
    let segments = this.getSegments(text)
    let out = ''
    for (let i = 0; i < segments.length; i++) {
      out += segments[i] + postfix
      if (i < (segments.length - 1)) {
        out += '\n'
      }
    }
    return out
  }

  /// Number lines of the text.
  addNumbering(text) {
    if (text.length === 0) return ''

    const segments = this.getSegments(text)
    let out = ''
    let numberingIndex = 1;
    for (let i = 0; i < segments.length; i++) {
      if (segments[i].length > 0) {
        out += `${numberingIndex}. ` + segments[i] + '\n'
        numberingIndex++
      } else if (i + 1 !== segments.length) {
        out += segments[i] + '\n'
      }
    }
    return out
  }

  /// Replace tabs with spaces.
  convertTabsToSpace(text, numberOfSpaces = 4) {
    let spaces = ' '.repeat(numberOfSpaces)
    return this.replaceAll(text, '\t', spaces)
  }

  /// Double the line spacing in the text.
  doubleSpaceLines(text) {
    return this.replaceAll(text, this.lineEnding, this.lineEnding + this.lineEnding)
  }

  /// Reverse the text in a string.
  reverseString(text) {
    return text
      .split('')
      .reverse()
      .join('')
  }

  /// Reverse text after determining 1 line or multi.
  reverse(text) {
    const delimiter = text.includes(this.lineEnding) ? this.lineEnding : ' '
    return this.reverseDelimiter(text, delimiter)
  }

  /// Reverse text with specified delimiter.
  reverseDelimiter(text, delimiter) {
    const segments = this.getSegments(text)
    let out = ''
    if (!text.includes(this.lineEnding))
      out = this.reverseString(text)
    else
      segments.forEach((line) => {
        out = line + delimiter + out
      })

    return out.trim()
  }

  // Split
  randomise(text) {
    let out = ''
    const segments = this.getSegments(text).sort((a, b) => {
      let r = Math.random()
      if (r === 0.5) return 0
      return r > 0.5 ? 1 : -1
    })
    for (let i = 0; i < segments.length; i++) {
      if (segments[i].length > 0) out += segments[i]
      if (i < (segments.length - 1))
        out += this.lineEnding
    }
    return out
  }

  /// Sort in alphabetical after determining 1 line or multi.
  sort(text) {
    let delimiter = text.includes(this.lineEnding) ? this.lineEnding : ' '
    return this.sortDelimiter(text, delimiter)
  }

  /// Sort in alphabetical order.
  sortDelimiter(text, delimiter) {
    let out = ''
    const segments = text.split(delimiter)
    segments.sort()
    segments.forEach((line) => {
      out += line + delimiter
    })
    return out.trim()
  }

  /// Sort by line length.
  sortByLength(text) {
    let out = ''
    const segments = this.getSegments(text)
    segments.sort((a, b) => a.length - b.length)

    for (let i = 0; i < segments.length; i++)
      out += segments[i] + this.lineEnding
    return out + this.lineEnding
  }
}

export default StringProcess
