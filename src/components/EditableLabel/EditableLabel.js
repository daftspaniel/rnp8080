import React, { Component } from 'react'

import { Active_Note_Change } from '../../Events'
import Minibus from '../../lib/Minibus'
import ThemeManager from '../../lib/ThemeManager'
import DocumentManager from '../../model/DocumentManager'

import './EditableLabel.css'

const documents = DocumentManager.getInstance()
const theme = ThemeManager.getInstance()
const minibus = Minibus.getInstance()

class EditableLabel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      editMode: false,
      text: props.note.downloadName,
    }
    minibus.subscribe(Active_Note_Change, this.activeNoteChangeHandler)
  }

  componentDidMount = () => this.activeNoteChangeHandler()

  toggleMode = () => this.setState({ editMode: !this.state.editMode })

  selectNote = () => {
    documents.makeNoteActive(this.props.note.id)
    this.setState({ active: true })
  }
  
  activeNoteChangeHandler = () =>
    this.setState({ active: this.props.note.id === 1 + documents.activeNoteId })

  exitEditMode = () => {
    documents.activeNote.setDownloadName(this.state.text)
    this.toggleMode()
  }

  onChangeHandler = event => this.setState({ text: event.target.value })

  handleKeyPress = event => {
    if (event.key === 'Enter') this.exitEditMode()
  }

  getLabelStyle = () => {
    let labelStyle = theme.get2ndColorStyles()
    labelStyle.opacity = this.state.active ? '1' : '0.6'
    return labelStyle
  }

  render() {
    return (
      <div
        className="EditableLabelContainer"
        style={this.getLabelStyle()}
        onDoubleClick={() => this.toggleMode()}
        onClick={() => this.selectNote()}
      >
        {this.state.editMode ? (
          <input
            type="text"
            autoFocus={true}
            defaultValue={this.state.text}
            onBlur={this.exitEditMode}
            onChange={this.onChangeHandler}
            onKeyPress={this.handleKeyPress}
          />
        ) : (
          this.state.text
        )}
      </div>
    )
  }
}

export default EditableLabel
