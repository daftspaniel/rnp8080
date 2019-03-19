import React, { Component } from 'react'

import ThemeManager from '../../lib/ThemeManager'
import DocumentManager from '../../model/DocumentManager'
import Menu from '../Menu/Menu'
import {StartMenuItems} from './MenuDefinitions'

import './MenuBar.css'

const theme = ThemeManager.getInstance()
const documents = DocumentManager.getInstance()

class MenuBar extends Component {
  render() {
    return (
      <div className="MenuBarContainer">
        <Menu name="Start" items={StartMenuItems} />
        <Menu name="Modify" />
        <Menu name="Add" />
        <Menu name="Remove" />
        <Menu name="Advanced" />
        <Menu name="View" />
        <Menu name="Help" />
        <button style={theme.getColorStyles()} onClick={this.download}>
          Download
        </button>
      </div>
    )
  }

  download() {
    let element = document.createElement('a')
    element.setAttribute(
      'href',
      'data:text/text;charset=utf-8,' + encodeURI(documents.activeNote.text)
    )
    element.setAttribute('download', documents.activeNote.downloadName)
    element.click()
  }
}

export default MenuBar
