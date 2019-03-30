import React, { Component } from 'react'

import Minibus from '../../lib/Minibus'
import ThemeManager from '../../lib/ThemeManager'
import DocumentManager from '../../model/DocumentManager'

import { Clear_Text, Welcome_Text, Markdown_Text, Todo_Template_Text, PMI_Template_Text, Smart_Template_Text, Week_Template_Text, HTML_Template_Text } from '../../Events'
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
    minibus.subscribe(Clear_Text, () => this.setNote(''))
    minibus.subscribe(Welcome_Text, () => this.setNote(welcomeText))
    minibus.subscribe(Markdown_Text, () => this.setNote(markdownSampler))
    minibus.subscribe(Todo_Template_Text, () => this.setNote(TodoTemplate))
    minibus.subscribe(PMI_Template_Text, () => this.setNote(PMITemplate))
    minibus.subscribe(Smart_Template_Text, () => this.setNote(SMARTTemplate))
    minibus.subscribe(Week_Template_Text, () => this.setNote(WeekPlanner))
    minibus.subscribe(HTML_Template_Text, () => this.setNote(WebStarterHtml))
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

  setNote = text => this.update(text)

  handleChange = event => this.update(event.target.value)

  update(text) {
    documents.activeNote.setText(text)
    this.activeNoteChangeHandler()
  }
}

export default Editor
