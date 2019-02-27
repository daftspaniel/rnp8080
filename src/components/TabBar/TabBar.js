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
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button style={theme.getColorStyles()} onClick={this.download}>
            Download
          </button>
        </div>
      </div>
    )
  }

  previous() {
    documents.moveToNextTab()
  }

  next() {
    documents.moveToNextTab()
  }

  download() {
    let element = document.createElement('a')
    element.setAttribute(
      'href',
      'data:text/text;charset=utf-8,' + encodeURI(documents.activeNote.text)
    )
    element.setAttribute('download', documents.activeNote.downloadName)
    element.click()
  }
}

export default TabBar
