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
        Chars: {this.state.charcount}
        &nbsp;&nbsp;&nbsp;&nbsp; Lines: {this.state.linecount}
        &nbsp;&nbsp;&nbsp;&nbsp; Words: {this.state.wordcount}
        &nbsp;&nbsp;&nbsp;&nbsp; Sentences: {this.state.sentencecount}
        <span> Last Modified : {this.state.lastModified}</span>
      </div>
    )
  }

  update = dataProvider => {
    let note = dataProvider()
    console.log(note)
    this.setState({
      charcount: note.text.length,
      linecount: this.textProcessor.getLineCount(note.text),
      wordcount: this.textProcessor.getWordCount(note.text),
      sentencecount: this.textProcessor.getSentenceCount(note.text),
      lastModified: note.lastModified.toLocaleString(),
    })
  }
}

export default StatusPanel
