import { storeValue, loadValue } from '../lib/Storage'
import Minibus from '../lib/Minibus'

const minibus = Minibus.getInstance()

class DocumentManager {
  static theInstance = null

  /**
   * @returns {DocumentManager}
   */
  static getInstance() {
    if (DocumentManager.theInstance == null) {
      DocumentManager.theInstance = new DocumentManager()
    }

    return this.theInstance
  }

  constructor() {
    this.allNotes = []
    this.activeNote = undefined
  }

  activate() {
    this.activeNoteId = parseInt(loadValue('ActiveDocument', '0'))
    this.makeNoteActive(this.activeNoteId)
  }

  setActiveNote = newActiveNote => (this.activeNote = newActiveNote)

  getNote = index => this.allNotes[index]

  addNote = note => this.allNotes.push(note)

  makeNoteActive(id) {
    console.log('Set active', id)
    this.activeNoteId = id - 1
    this.activeNote = this.allNotes[this.activeNoteId]
    storeValue('ActiveDocument', id.toString())
    minibus.post('active-note-change', () => this.activeNoteId)
  }

  moveToNextTab() {
    this.activeNoteId++
    if (this.activeNoteId > 5) this.activeNoteId = 0
    this.makeNoteActive(this.activeNoteId + 1)
  }

  moveToPreviousTab() {
    this.activeNoteId--
    if (this.activeNoteId < 0) this.activeNoteId = 5
    this.makeNoteActive(this.activeNoteId + 1)
  }
}
export default DocumentManager
