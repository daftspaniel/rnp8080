import React, { Component } from 'react'

import ThemeManager from '../../lib/ThemeManager'

import './Menu.css'
import { MenuItem } from './MenuItem'

const theme = ThemeManager.getInstance()

class Menu extends Component {
  state = {}
  render() {
    return (
      <div
        className="Menu"
        style={theme.getColorStyles()}
        onMouseLeave={e => this.close(e)}
      >
        <div onClick={e => this.open(e)}>{this.props.name}</div>
        {this.state.open && this.props.items ? (
          <div
            className="menuH"
            onMouseLeave={e => this.close(e)}
            style={theme.getColorStyles()}
          >
            {this.props.items.map((item, index) =>
              this.renderMenuItem(item, index)
            )}
          </div>
        ) : null}
      </div>
    )
  }

  renderMenuItem(item, index) {
    return (
      <div key={index}>
        <MenuItem item={item} close={this.close} />
        {this.getSeparator(item)}
      </div>
    )
  }

  getMenuStyles() {
    let styles = theme.getColorStyles()
    return styles
  }

  getSeparator(item) {
    return item.separator ? (
      <div className="menuSeparator" style={theme.getColorStyles()}>
        &nbsp;
      </div>
    ) : null
  }
  
  open = e => {
    console.log('Open')
    this.setState({ open: true })
  }
  close = e => {
    console.log('Close')
    this.setState({ open: false })
    return false
  }
}

export default Menu
