import React, { Component } from 'react'

//import Minibus from '../../lib/Minibus'
import ThemeManager from '../../lib/ThemeManager'
import DocumentManager from '../../model/DocumentManager'

import './EditableLabel.css'

const documents = DocumentManager.getInstance()
const theme = ThemeManager.getInstance()
//const minibus = Minibus.getInstance()

class EditableLabel extends Component {
  constructor(props) {
    super(props)
    this.state = { editMode: false, text: props.note.downloadName }
  }

  toggleMode = () => this.setState({ editMode: !this.state.editMode })

  selectNote = () => {
    documents.makeNoteActive(this.props.note.id)
  }

  exitEditMode = () => {
    documents.activeNote.setDownloadName(this.state.text)
    this.toggleMode()
  }

  onChangeHandler = event => this.setState({ text: event.target.value })

  handleKeyPress = event => {
    if (event.key === 'Enter') this.exitEditMode()
  }

  render() {
    return (
      <div
        className="EditableLabelContainer"
        style={theme.get2ndColorStyles()}
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
