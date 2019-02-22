import React, { Component } from 'react'

import DocumentManager from '../../model/DocumentManager'
import EditableLabel from '../EditableLabel/EditableLabel'

import './TabBar.css'

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
      </div>
    )
  }
}

export default TabBar
