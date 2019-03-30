import React from 'react'

import Menu from '../Menu/Menu'
import { StartMenuItems, ModifyMenuItems, AboutMenuItems } from './MenuDefinitions'
import Basecomponent from '../BaseComponent'
import DocumentManager from '../../model/DocumentManager'

import './MenuBar.css'

const documents = DocumentManager.getInstance()

class MenuBar extends Basecomponent {
  render() {
    return (
      <div className="MenuBarContainer">
        <Menu name="Start" items={StartMenuItems} />
        <Menu name="Modify" items={ModifyMenuItems} />
        <Menu name="Add" />
        <Menu name="Remove" />
        <Menu name="Advanced" />
        <Menu name="View" />
        <Menu name="Help" items={AboutMenuItems} />
        <button style={this.theme.getColorStyles()} onClick={this.download}>
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
