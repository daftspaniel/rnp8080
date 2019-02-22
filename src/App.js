import React, { Component } from 'react'

import Editor from './components/Editor/Editor'
import TabBar from './components/TabBar/TabBar'
import StatusPanel from './components/StatusPanel/StatusPanel'
import ThemeManager from './lib/ThemeManager'
import AppManager from './model/AppManager'
import Minibus from './lib/Minibus'

import './App.css'

const theme = ThemeManager.getInstance()
const minibus = Minibus.getInstance()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { index: 1 }
    this.appManager = new AppManager()

    minibus.subscribe('theme-change', this.update)
  }

  update = () => this.setState({ index: this.state.index + 1 })

  render() {
    return (
      <div className="App" style={theme.getColorStyles()}>
        <TabBar />
        <Editor />
        <StatusPanel />
      </div>
    )
  }
}

export default App
