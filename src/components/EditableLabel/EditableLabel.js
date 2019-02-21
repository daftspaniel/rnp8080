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
    this.state = { editMode: false, text: props.text }
  }

  toggleMode = () => {
    this.setState({ editMode: !this.state.editMode })
  }

  exitEditMode = () => {
    documents.activeNote.setDownloadName(this.state.text)
    this.toggleMode()
  }

  onChangeHandler = event => {
    this.setState({ text: event.target.value })
  }

  render() {
    return (
      <div
        className="EditableLabelContainer"
        style={theme.get2ndColorStyles()}
        onClick={() => this.toggleMode()}
      >
        {this.state.editMode ? (
          <input
            type="text"
            autoFocus={true}
            defaultValue={this.state.text}
            onBlur={this.exitEditMode}
            onChange={this.onChangeHandler}
          />
        ) : (
          this.state.text
        )}
      </div>
    )
  }
}

export default EditableLabel
