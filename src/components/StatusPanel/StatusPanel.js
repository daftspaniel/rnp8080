import React from 'react'

import BaseComponent from '../BaseComponent'
import { EditorEvents } from '../../Events'
import StringProcess from '../../lib/StringProcess'

import './StatusPanel.css'

class StatusPanel extends BaseComponent {
  constructor(props) {
    super(props)
    this.minibus.subscribe(EditorEvents.Text_Change, this.update)
    this.textProcessor = new StringProcess()
  }

  render() {
    return (
      <div style={this.theme.getColorStyles()} className="StatusContainer">
        <div className="infoItem">Chars: {this.state.charcount}</div>
        <div className="infoItem">Lines: {this.state.linecount}</div>
        <div className="infoItem">Words: {this.state.wordcount}</div>
        <div className="infoItem">Sentences: {this.state.sentencecount}</div>
        <div className="modified">Last Modified : {this.state.lastModified}</div>
      </div>
    )
  }

  update = dataProvider => {
    let note = dataProvider()
    if (!note) return
    this.setState({
      charcount: note.text.length,
      linecount: this.textProcessor.getLineCount(note.text),
      wordcount: this.textProcessor.getWordCount(note.text),
      sentencecount: this.textProcessor.getSentenceCount(note.text),
      lastModified: this.formatDate(note.lastModified),
    })
  }

  formatDate(date) {
    var m = new Date(date)
    return (
      ('0' + m.getDate()).slice(-2) +
      '/' +
      ('0' + (m.getMonth() + 1)).slice(-2) +
      ' ' +
      ('0' + m.getHours()).slice(-2) +
      ':' +
      ('0' + m.getMinutes()).slice(-2) +
      ':' +
      ('0' + m.getSeconds()).slice(-2)
    )
  }
}

export default StatusPanel
