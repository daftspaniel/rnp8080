import React from 'react'

import DocumentManager from '../../model/DocumentManager'
import EditableLabel from '../EditableLabel/EditableLabel'
import BaseComponent from '../BaseComponent'

import './TabBar.css'

const documents = DocumentManager.getInstance()

class TabBar extends BaseComponent {
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
          <button style={this.theme.getColorStyles()} onClick={this.previous}>
            &lt;
          </button>
          <button style={this.theme.getColorStyles()} onClick={this.next}>
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
