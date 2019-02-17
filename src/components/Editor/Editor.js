import React, { Component } from 'react'

import { loadValue } from '../../lib/Storage'
import ThemeManager from '../../lib/ThemeManager'
import Minibus from '../../lib/Minibus'
import { welcomeText } from '../Resources/Resources'

import './Editor.css'

const theme = ThemeManager.getInstance()
const minibus = Minibus.getInstance()

class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = { value: loadValue('text1', welcomeText) }
  }

  componentDidMount() {
    minibus.post('text-change', () => this.state.value)
  }

  render() {
    return (
      <div className="EditorContainer">
        <textarea
          className="Editor"
          onKeyUp={this.handleChange}
          onChange={this.handleChange}
          defaultValue={this.state.value}
          autoFocus={true}
          style={theme.getDocumentStyles()}
        />
      </div>
    )
  }

  handleChange = event => {
    minibus.post('text-change', () => event.target.value)
  }
}

export default Editor
