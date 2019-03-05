import React, { Component } from 'react'

import Editor from './components/Editor/Editor'
import TabBar from './components/TabBar/TabBar'
import MenuBar from './components/MenuBar/MenuBar'
import StatusPanel from './components/StatusPanel/StatusPanel'
import ThemeManager from './lib/ThemeManager'
import AppManager from './model/AppManager'
import Minibus from './lib/Minibus'
import { loadValue } from './lib/Storage'

import './App.css'

const theme = ThemeManager.getInstance()
const minibus = Minibus.getInstance()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { index: 1 }
    this.appManager = new AppManager()
    theme.setTheme(loadValue('theme', 0))
    minibus.subscribe('theme-change', this.update)
  }

  update = () => this.setState({ index: this.state.index + 1 })

  render() {
    return (
      <div className="App" style={theme.getColorStyles()}>
      <MenuBar/>
        <TabBar />
        <Editor />
        <StatusPanel />
      </div>
    )
  }
}

export default App
