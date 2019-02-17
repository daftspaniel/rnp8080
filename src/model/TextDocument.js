import { loadValue, storeValue } from '../lib/Storage'

import { welcomeText } from '../components/Resources/Resources'
//const defaultDownloadName = 'np8080.txt'
const defaultFilename = 'np8080'
const defaultFileExtension = 'txt'

class TextDocument {
  constructor(id) {
    this.undoText = []
    this.id = id
    this.text = ''
    this.downloadName = ''
    this.lastModified = Date.now()

    this.initText()
    this.initLastModifiedDate()
    this.initDownloadName()
  }

  isEmpty = () => this.text.length === 0

  getStoredText = () => loadValue(`text${this.id}`, welcomeText)

  setDownloadName(value) {
    this.downloadName = value
    this.save()
  }

  setText(value) {
    this.text = value
    this.save()
  }

  initText() {
    this.text = this.getStoredText()
    if (this.text == null) this.text = this.welcomeText
  }

  initDownloadName() {
    this.downloadName = loadValue(`dn${this.id}`, null)
    if (this.downloadName == null) this.generateDownloadName()
  }

  generateDownloadName() {
    this.downloadName = `${defaultFilename}-${this.id}.${defaultFileExtension}`
  }

  reset() {
    this.generateDownloadName()
    this.updateModifiedDate()
  }

  initLastModifiedDate() {
    var lms = loadValue('lm$_id', null)

    if (lms != null) {
      this.lastModified = Date.parse(lms)
    }
  }

  updateModifiedDate = () => (this.lastModified = Date.now())

  updateAndSave(newText) {
    this.text = newText
    this.save()
  }

  appendAndSave(additionalText) {
    this.text += additionalText
    this.save()
  }

  save() {
    if (this.text !== this.storedText) {
      this.updateUndoBuffer()
    }
    this.performSave()
  }

  updateUndoBuffer() {
    if (
      this.undoText.length === 0 ||
      (this.undoText.length > 0 &&
        this.undoText[this.undoText.length - 1] !== this.storedText)
    ) {
      this.undoText.push(this.storedText)
    }
  }

  performSave() {
    this.updateModifiedDate()
    storeValue(`text${this.id}`, this.text)
    storeValue(`dn${this.id}`, this.downloadName)
    storeValue(`lm${this.id}`, this.lastModified)
  }

  undo() {
    this.text = this.undoText.removeLast()
    this.performSave()
  }
}
export default TextDocument
