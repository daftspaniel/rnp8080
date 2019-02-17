import React, { Component } from 'react'

import Minibus from '../../lib/Minibus'
import ThemeManager from '../../lib/ThemeManager'
import DocumentManager from '../../model/DocumentManager'
import TextDocument from '../../model/TextDocument'

import './Editor.css'

const documents = DocumentManager.getInstance()
const theme = ThemeManager.getInstance()
const minibus = Minibus.getInstance()

class Editor extends Component {
  constructor(props) {
    super(props)
    let note1 = new TextDocument(1)
    this.state = { value: note1.text }

    documents.addNote(note1)
    documents.setActiveNote(note1)
  }

  componentDidMount() {
    minibus.post('text-change', () => this.state.value)
  }

  render() {
    return (
      <div className="EditorContainer">
        <textarea
          className="Editor"
          onKeyUp={this.handleChange}
          onChange={this.handleChange}
          defaultValue={this.state.value}
          autoFocus={true}
          style={theme.getDocumentStyles()}
        />
      </div>
    )
  }

  handleChange = event => {
    documents.activeNote.updateAndSave(event.target.value)
    minibus.post('text-change', () => event.target.value)
  }
}

export default Editor
