import React from 'react'

import BaseComponent from '../BaseComponent'
import DocumentManager from '../../model/DocumentManager'
import StringProcess from '../../lib/StringProcess'
import { EditorEvents } from '../../Events'
import { welcomeText, markdownSampler, loremIpsum } from '../Resources/Resources'
import { TodoTemplate, PMITemplate, SMARTTemplate, WeekPlanner, WebStarterHtml } from '../Resources/Template'


import './Editor.css'

const documents = DocumentManager.getInstance()
const textProcessor = new StringProcess()

class Editor extends BaseComponent {

  constructor(props) {
    super(props)
    this.editorRef = React.createRef()
  }

  componentDidMount() {
    this.minibus.subscribe(EditorEvents.Active_Note_Change, this.activeNoteChangeHandler)
    this.setupMenuCommands()

    if (documents.activeNote)
      this.setState({ value: documents.activeNote.text })

    this.minibus.post(EditorEvents.Text_Change, () => documents.activeNote)
  }

  setupMenuCommands() {
    this.minibus.subscribe(EditorEvents.Clear_Text, () => this.setNote(''))
    this.minibus.subscribe(EditorEvents.Welcome_Text, () => this.setNote(welcomeText))
    this.minibus.subscribe(EditorEvents.Markdown_Text, () => this.setNote(markdownSampler))
    this.minibus.subscribe(EditorEvents.Todo_Template_Text, () => this.setNote(TodoTemplate))
    this.minibus.subscribe(EditorEvents.PMI_Template_Text, () => this.setNote(PMITemplate))
    this.minibus.subscribe(EditorEvents.Smart_Template_Text, () => this.setNote(SMARTTemplate))
    this.minibus.subscribe(EditorEvents.Week_Template_Text, () => this.setNote(WeekPlanner))
    this.minibus.subscribe(EditorEvents.HTML_Template_Text, () => this.setNote(WebStarterHtml))

    this.minibus.subscribe(EditorEvents.Replace_Text, this.replaceTextHandler)
    this.minibus.subscribe(EditorEvents.PrePost_Text, this.prePostTextHandler)
    this.minibus.subscribe(EditorEvents.Number_Lines, this.numberHandler)
    this.minibus.subscribe(EditorEvents.Change_Tabs_To_Spaces, this.tabsToSpacesHandler)
    this.minibus.subscribe(EditorEvents.Double_Space_Lines, this.doubleSpaceLinesHandler)
    this.minibus.subscribe(EditorEvents.Reverse, this.reverseHandler)
    this.minibus.subscribe(EditorEvents.Randomise_Lines, this.randomHandler)
    this.minibus.subscribe(EditorEvents.Sort_Lines, this.sortHandler)
    this.minibus.subscribe(EditorEvents.Sort_Lines_By_Length, this.sortLengthHandler)

    this.minibus.subscribe(EditorEvents.Add_Lorem_Ipsum, this.loremIpsumHandler)
    this.minibus.subscribe(EditorEvents.Duplicate_All, this.duplicateAllHandler)
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
          ref={this.editorRef}
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
    this.minibus.post(EditorEvents.Text_Change, () => documents.activeNote)
  }

  setNote = text => this.update(text)

  handleChange = event => this.update(event.target.value)

  update(text) {
    documents.activeNote.setText(text)
    this.activeNoteChangeHandler()
    this.setEditorFocus()
  }

  getTextAreaRef = () => this.editorRef.current

  setEditorFocus = () => {
    setTimeout(() => {
      const textArea = this.getTextAreaRef()
      textArea.setSelectionRange(textArea.selectionStart, textArea.selectionStart)
      textArea.focus()
    }, 300)
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
  
  sortLengthHandler = () => this.update(textProcessor.sortByLength(documents.activeNote.text))

  loremIpsumHandler = () => {
    const ta = this.getTextAreaRef()
    const text = documents.activeNote.text
    var newText = text.substring(0, ta.selectionStart) +
      loremIpsum +
      '\n\n' +
      text.substring(ta.selectionStart)
    this.update(newText)
  }

  duplicateAllHandler = () => this.update(documents.activeNote.text + `\n` + documents.activeNote.text)
}

export default Editor
