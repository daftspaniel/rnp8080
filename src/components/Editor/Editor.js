import React from 'react'

import BaseComponent from '../BaseComponent'
import { Replace_Text, Text_Change, Active_Note_Change } from '../../Events'
import DocumentManager from '../../model/DocumentManager'
import { Clear_Text, Welcome_Text, Markdown_Text, Todo_Template_Text, PMI_Template_Text, Smart_Template_Text, Week_Template_Text, HTML_Template_Text } from '../../Events'
import { welcomeText, markdownSampler } from '../Resources/Resources'
import { TodoTemplate, PMITemplate, SMARTTemplate, WeekPlanner, WebStarterHtml } from '../Resources/Template'
import StringProcess from '../../lib/StringProcess'

import './Editor.css'

const documents = DocumentManager.getInstance()
const textProcessor = new StringProcess()

class Editor extends BaseComponent {

  componentDidMount() {
    this.minibus.subscribe(Active_Note_Change, this.activeNoteChangeHandler)
    this.setupMenuCommands()

    if (documents.activeNote)
      this.setState({ value: documents.activeNote.text })

    this.minibus.post(Text_Change, () => documents.activeNote)
  }

  setupMenuCommands() {
    this.minibus.subscribe(Clear_Text, () => this.setNote(''))
    this.minibus.subscribe(Welcome_Text, () => this.setNote(welcomeText))
    this.minibus.subscribe(Markdown_Text, () => this.setNote(markdownSampler))
    this.minibus.subscribe(Todo_Template_Text, () => this.setNote(TodoTemplate))
    this.minibus.subscribe(PMI_Template_Text, () => this.setNote(PMITemplate))
    this.minibus.subscribe(Smart_Template_Text, () => this.setNote(SMARTTemplate))
    this.minibus.subscribe(Week_Template_Text, () => this.setNote(WeekPlanner))
    this.minibus.subscribe(HTML_Template_Text, () => this.setNote(WebStarterHtml))

    this.minibus.subscribe(Replace_Text, this.replaceTextHandler)
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
          style={this.theme.getDocumentStyles()}
        />
      </div>
    )
  }

  handleKeyPress = event => {
    // ALT T
    if (event.keyCode === 84 && event.altKey === true) {
      this.theme.switchTheme()
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
    this.minibus.post(Text_Change, () => documents.activeNote)
  }

  setNote = text => this.update(text)

  handleChange = event => this.update(event.target.value)

  update(text) {
    documents.activeNote.setText(text)
    this.activeNoteChangeHandler()
  }

  replaceTextHandler = (replacement) => {
    let data = replacement()
    let updatedText = textProcessor.replaceAll(documents.activeNote.text, data.target, data.replacement)
    //updatedText = textProcessor.denumber(documents.activeNote.text)
    console.log(data, updatedText)
    this.update(updatedText)
  }
}

export default Editor
