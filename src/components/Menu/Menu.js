import React from 'react'

import { MenuItem } from './MenuItem'
import BaseComponent from '../BaseComponent'

import './Menu.css'

class Menu extends BaseComponent {
  render() {
    return (
      <div
        className="Menu"
        style={this.theme.getColorStyles()}
        onMouseLeave={e => this.close(e)}
      >
        <div onClick={e => this.open(e)}>{this.props.name}</div>
        {this.state.open && this.props.items ? (
          <div
            className="menuH"
            onMouseLeave={e => this.close(e)}
            style={this.theme.getColorStyles()}
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

  getMenuStyles = () => this.theme.getColorStyles()

  getSeparator(item) {
    return item.separator ? (
      <div className="menuSeparator" style={this.theme.getColorStyles()}>
        &nbsp;
      </div>
    ) : null
  }

  open = e => this.setState({ open: true })

  close = e => {
    this.setState({ open: false })
    return false
  }
}

export default Menu
