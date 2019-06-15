import React from 'react'

import BaseComponent from '../BaseComponent'
import DocumentManager from '../../model/DocumentManager'
import StringProcess from '../../lib/StringProcess'
import { Double_Space_Lines, PrePost_Text, Replace_Text, Text_Change, Active_Note_Change, Reverse, Randomise_Lines, Sort_Lines } from '../../Events'
import { Clear_Text, Welcome_Text, Markdown_Text, Todo_Template_Text, PMI_Template_Text, Smart_Template_Text, Week_Template_Text, HTML_Template_Text, Number_Lines, Change_Tabs_To_Spaces } from '../../Events'
import { welcomeText, markdownSampler } from '../Resources/Resources'
import { TodoTemplate, PMITemplate, SMARTTemplate, WeekPlanner, WebStarterHtml } from '../Resources/Template'


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
    this.minibus.subscribe(PrePost_Text, this.prePostTextHandler)
    this.minibus.subscribe(Number_Lines, this.numberHandler)
    this.minibus.subscribe(Change_Tabs_To_Spaces, this.tabsToSpacesHandler)
    this.minibus.subscribe(Double_Space_Lines, this.doubleSpaceLinesHandler)
    this.minibus.subscribe(Reverse, this.reverseHandler)
    this.minibus.subscribe(Randomise_Lines, this.randomHandler)
    this.minibus.subscribe(Sort_Lines, this.sortHandler)
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
    // Tab
    if (event.keyCode === 9) this.tabHandler()
    // ALT T
    else if (event.keyCode === 84 && event.altKey)
      this.theme.switchTheme()
    // ALT ,
    else if (event.keyCode === 188 && event.altKey)
      documents.moveToPreviousTab()
    // ALT .
    else if (event.keyCode === 190 && event.altKey)
      documents.moveToNextTab()
  }

  tabHandler = () => {
    return false
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
    this.update(updatedText)
  }

  prePostTextHandler = (prepost) => {
    let data = prepost()
    let updatedText = textProcessor.prefixLines(documents.activeNote.text, data.pre)
    updatedText = textProcessor.postfixLines(updatedText, data.post)
    this.update(updatedText)
  }

  numberHandler = () => this.update(textProcessor.addNumbering(documents.activeNote.text))

  tabsToSpacesHandler = () => this.update(textProcessor.convertTabsToSpace(documents.activeNote.text))

  doubleSpaceLinesHandler = () => this.update(textProcessor.doubleSpaceLines(documents.activeNote.text))

  reverseHandler = () => this.update(textProcessor.reverse(documents.activeNote.text))

  randomHandler = () => this.update(textProcessor.randomise(documents.activeNote.text))

  sortHandler = () => this.update(textProcessor.sort(documents.activeNote.text))
}

export default Editor
