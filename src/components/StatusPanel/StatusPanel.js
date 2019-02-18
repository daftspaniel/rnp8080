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
      </div>
    )
  }

  update = dataProvider => {
    let text = dataProvider()
    this.setState({
      charcount: text.length,
      linecount: this.textProcessor.getLineCount(text),
      wordcount: this.textProcessor.getWordCount(text),
      sentencecount: this.textProcessor.getSentenceCount(text),
    })
  }
}

export default StatusPanel
