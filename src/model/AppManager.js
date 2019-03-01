import DocumentManager from './DocumentManager'
import { loadValue } from '../lib/Storage'
import TextDocument from './TextDocument'

const documents = DocumentManager.getInstance()

class AppManager {
  constructor() {
    this.init()
    this.notes = []
  }

  init() {
    this.notes = loadValue('notelist', [1, 2, 3, 4, 5, 6])
    this.notes.forEach(noteId => {
      documents.addNote(new TextDocument(noteId))
    })
    documents.activate()
  }
}

export default AppManager
