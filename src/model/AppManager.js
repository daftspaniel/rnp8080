import DocumentManager from './DocumentManager'
import { loadValue } from '../lib/Storage'

//import Minibus from '../lib/Minibus'
import TextDocument from './TextDocument'

const documents = DocumentManager.getInstance()

class AppManager {
  constructor() {
    console.log('AppManager')
    this.init()
    this.notes = []
  }

  init() {
    this.notes = loadValue('notelist', [1, 2, 3, 4, 5, 6])
    this.activeNoteIndex = loadValue('activeNote', 1)
    this.notes.forEach(noteId => {
      documents.addNote(new TextDocument(noteId))
    })
    documents.makeNoteActive(this.activeNoteIndex)
  }
}

export default AppManager
