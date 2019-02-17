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
    this.panelStyle = theme.getColorStyles()

    this.panelStyle.paddingLeft = 5
    this.panelStyle.paddingRight = 5
    this.panelStyle.paddingBottom = 0

    this.panelStyle.height = 20
    this.panelStyle.width = 'calc(100% - 40px)'
    this.panelStyle.maxHeight = 20
    this.panelStyle.fontSize = 'small'

    this.state = { charcount: 0 }
    minibus.subscribe('text-change', this.update)
    this.textProcessor = new StringProcess()
  }

  render() {
    return (
      <div style={this.panelStyle}>
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
