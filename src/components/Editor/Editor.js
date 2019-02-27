import React, { Component } from 'react'

import Minibus from '../../lib/Minibus'
import ThemeManager from '../../lib/ThemeManager'
import DocumentManager from '../../model/DocumentManager'

import './Editor.css'

const documents = DocumentManager.getInstance()
const theme = ThemeManager.getInstance()
const minibus = Minibus.getInstance()

class Editor extends Component {
  state = { value: '' }

  componentDidMount() {
    if(documents.activeNote)
    this.setState({ value: documents.activeNote.text })    
    minibus.subscribe('active-note-change', this.activeNoteChangeHandler)
    minibus.post('text-change', () => documents.activeNote)
  }

  render() {
    return (
      <div className="EditorContainer">
        <textarea
          className="Editor"
          onKeyUp={this.handleKeyPress}
          onChange={this.handleChange}
          value={this.state.value}
          autoFocus={true}
          style={theme.getDocumentStyles()}
        />
      </div>
    )
  }

  handleKeyPress = event => {
    // ALT T
    if (event.keyCode === 84 && event.altKey === true) {
      theme.switchTheme()
    }
    // ALT ,
    else if (event.keyCode === 188 && event.altKey === true) {
      documents.moveToPreviousTab()
    }
    else // ALT .
    if (event.keyCode === 190 && event.altKey === true) {
      documents.moveToNextTab()
    }
  }

  activeNoteChangeHandler = () => {
    this.setState({ value: documents.activeNote.text })
    minibus.post('text-change', () => documents.activeNote)
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
    documents.activeNote.updateAndSave(event.target.value)
    minibus.post('text-change', () => documents.activeNote)
  }
}

export default Editor
