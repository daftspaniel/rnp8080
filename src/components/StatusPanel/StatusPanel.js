import React, { Component } from 'react'

import ThemeManager from '../../lib/ThemeManager'
import Minibus from '../../lib/Minibus'
import StringProcess from '../../lib/StringProcess'

import './StatusPanel.css'

const theme = ThemeManager.getInstance()
const minibus = Minibus.getInstance()

class StatusPanel extends Component {
  constructor(props) {
    super(props)
    minibus.subscribe('text-change', this.update)
    this.textProcessor = new StringProcess()
    this.state = {}
  }

  render() {
    return (
      <div style={theme.getColorStyles()} className="StatusContainer">
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
