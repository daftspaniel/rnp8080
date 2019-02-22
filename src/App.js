import React, { Component } from 'react'

import Editor from './components/Editor/Editor'
import StatusPanel from './components/StatusPanel/StatusPanel'
import EditableLabel from './components/EditableLabel/EditableLabel'
import ThemeManager from './lib/ThemeManager'
import DocumentManager from './model/DocumentManager'
import Minibus from './lib/Minibus'
import TextDocument from './model/TextDocument'

import './App.css'

const theme = ThemeManager.getInstance()
const minibus = Minibus.getInstance()
const documents = DocumentManager.getInstance()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { index: 1 }
    minibus.subscribe('theme-change', this.update)
    let note1 = new TextDocument(1)
    documents.addNote(note1)
    documents.makeNoteActive(1)
    console.log(documents.activeNote)
  }

  update = () => this.setState({ index: this.state.index + 1 })

  render() {
    return (
      <div className="App" style={theme.getColorStyles()}>
        <div>
          <EditableLabel text={documents.activeNote.downloadName} />
        </div>
        <Editor />
        <StatusPanel />
      </div>
    )
  }
}

export default App
