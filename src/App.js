import React from 'react'

import BaseComponent from './components/BaseComponent'
import { Theme_Change } from './Events'

import Editor from './components/Editor/Editor'
import TabBar from './components/TabBar/TabBar'
import MenuBar from './components/MenuBar/MenuBar'
import StatusPanel from './components/StatusPanel/StatusPanel'

import AboutDialog from './components/Dialog/About/About'
import ManualDialog from './components/Dialog/Manual/Manual'
import ReplaceDialog from './components/Dialog/Replace/Replace'
import PrePostDialog from './components/Dialog/PrePost/PrePost'

import AppManager from './model/AppManager'
import { loadValue } from './lib/Storage'

import './App.css'


class App extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = { index: 1 }
    this.appManager = new AppManager()
    this.theme.setTheme(loadValue('theme', 0))
    this.minibus.subscribe(Theme_Change, this.update)
  }

  update = () => this.setState({ index: this.state.index + 1 })

  render() {
    return (
      <div className="App" style={this.theme.getColorStyles()}>
        <AboutDialog />
        <ManualDialog />
        <ReplaceDialog />
        <PrePostDialog />
        <MenuBar />
        <TabBar />
        <Editor />
        <StatusPanel />
      </div>
    )
  }
}

export default App
