import React from 'react'

import { EditorEvents } from '../../Events'
import DocumentManager from '../../model/DocumentManager'
import BaseComponent from '../BaseComponent'

import './EditableLabel.css'

const documents = DocumentManager.getInstance()

class EditableLabel extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      editMode: false,
      text: props.note.downloadName,
    }
    this.minibus.subscribe(EditorEvents.Active_Note_Change, this.activeNoteChangeHandler)
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
    let labelStyle = this.theme.get2ndColorStyles()
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
