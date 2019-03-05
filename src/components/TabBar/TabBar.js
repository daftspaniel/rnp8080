import React, { Component } from 'react'

import ThemeManager from '../../lib/ThemeManager'
import DocumentManager from '../../model/DocumentManager'
import EditableLabel from '../EditableLabel/EditableLabel'

import './TabBar.css'

const theme = ThemeManager.getInstance()
const documents = DocumentManager.getInstance()

class TabBar extends Component {
  render() {
    return (
      <div className="TabBarContainer">
        {documents.allNotes.map((note, i) => (
          <EditableLabel
            note={note}
            key={i}
            active={documents.activeNoteId === note.id}
          />
        ))}
        <div className="TabBarNav">
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button style={theme.getColorStyles()} onClick={this.previous}>
            &lt;
          </button>
          <button style={theme.getColorStyles()} onClick={this.next}>
            &gt;
          </button>
        </div>
      </div>
    )
  }

  previous() {
    documents.moveToPreviousTab()
  }

  next() {
    documents.moveToNextTab()
  }

}

export default TabBar
