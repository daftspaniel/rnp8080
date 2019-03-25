import React, { Component } from 'react'

import Minibus from '../../lib/Minibus'
import ThemeManager from '../../lib/ThemeManager'
import DocumentManager from '../../model/DocumentManager'

import { welcomeText, markdownSampler } from '../Resources/Resources'
import { TodoTemplate, PMITemplate, SMARTTemplate, WeekPlanner, WebStarterHtml } from '../Resources/Template'

import './Editor.css'

const documents = DocumentManager.getInstance()
const theme = ThemeManager.getInstance()
const minibus = Minibus.getInstance()

class Editor extends Component {
  state = { value: '' }

  componentDidMount() {
    minibus.subscribe('active-note-change', this.activeNoteChangeHandler)
    this.setupMenuCommands()

    if (documents.activeNote)
      this.setState({ value: documents.activeNote.text })

    minibus.post('text-change', () => documents.activeNote)
  }

  setupMenuCommands() {
    minibus.subscribe('clear-text', () => this.setNote(''))
    minibus.subscribe('welcome-text', () => this.setNote(welcomeText))
    minibus.subscribe('markdown-text', () => this.setNote(markdownSampler))
    minibus.subscribe('todo-template-text', () => this.setNote(TodoTemplate))
    minibus.subscribe('pmi-template-text', () => this.setNote(PMITemplate))
    minibus.subscribe('smart-template-text', () => this.setNote(SMARTTemplate))
    minibus.subscribe('week-template-text', () => this.setNote(WeekPlanner))
    minibus.subscribe('html-template-text', () => this.setNote(WebStarterHtml))
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

  //activeNoteClear = event => this.update('')

  setNote = text => this.update(text)

  handleChange = event => this.update(event.target.value)

  update(text) {
    documents.activeNote.setText(text)
    this.activeNoteChangeHandler()
  }
}

export default Editor
