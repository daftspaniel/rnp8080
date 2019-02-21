import React, { Component } from 'react'

import Minibus from '../../lib/Minibus'
import ThemeManager from '../../lib/ThemeManager'
import DocumentManager from '../../model/DocumentManager'

import './Editor.css'

const documents = DocumentManager.getInstance()
const theme = ThemeManager.getInstance()
const minibus = Minibus.getInstance()

class Editor extends Component {
  state = { value: documents.activeNote.text }

  componentDidMount() {
    minibus.post('text-change', () => documents.activeNote)
  }

  render() {
    return (
      <div className="EditorContainer">
        <textarea
          className="Editor"
          onKeyUp={this.handleKeyPress}
          onChange={this.handleChange}
          defaultValue={this.state.value}
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
  }

  handleChange = event => {
    documents.activeNote.updateAndSave(event.target.value)
    minibus.post('text-change', () => documents.activeNote)
  }
}

export default Editor
