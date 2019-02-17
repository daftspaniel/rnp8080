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
    this.activeNoteId = 0
  }

  setActiveNote(newActiveNote) {
    this.activeNote = newActiveNote
  }

  getNote = index => this.allNotes[index]

  addNote = note => this.allNotes.push(note)

  makeNoteActive(id) {
    this.activeNoteId = id - 1
    this.activeNote = this.allNotes[this.activeNoteId]
    this.storeValue('ActiveDocument', id.toString())
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
