import React, { Component } from 'react'

import Editor from './components/Editor/Editor'
import StatusPanel from './components/StatusPanel/StatusPanel'
import ThemeManager from './lib/ThemeManager'
import Minibus from './lib/Minibus'

import './App.css'

const theme = ThemeManager.getInstance()
const minibus = Minibus.getInstance()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { index: 1 }
    minibus.subscribe('theme-change', this.update)
  }

  update = () => {
    this.setState({ index: this.state.index + 1 })
  }

  render() {
    return (
      <div className="App" style={theme.getColorStyles()}>
        <div>Menubar</div>
        <Editor />
        <StatusPanel />
      </div>
    )
  }
}

export default App
