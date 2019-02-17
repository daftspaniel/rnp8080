import React, { Component } from 'react'

import Editor from './components/Editor/Editor'
import StatusPanel from './components/StatusPanel/StatusPanel'
import ThemeManager from './lib/ThemeManager'

import './App.css'

const theme = ThemeManager.getInstance()

class App extends Component {
  
  render() {
    return (
      <div className="App" style={theme.getColorStyles()} >
        <div>Menubar</div>
        <Editor />
        <StatusPanel/>
      </div>
    )
  }
}

export default App
