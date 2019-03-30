import React from 'react'

import BaseComponent from '../BaseComponent'

export class MenuItem extends BaseComponent {

  render() {
    return (
      <div
        className="menuItem"
        onClick={e => this.mouseClick(e)}
        onMouseEnter={e => this.mouseEnter(e)}
        onMouseLeave={e => this.mouseExit(e)}
        style={this.getItemStyle()}
        title={this.props.item.info}>
        {this.props.item.name}
      </div>
    )
  }

  mouseClick = () => {
    this.minibus.post(this.props.item.command)
    this.props.close()
  }

  mouseEnter = () => this.setState({ hover: true })

  mouseExit = () => this.setState({ hover: false })

  getItemStyle = () => {return { backgroundColor: this.state.hover ? 'white' : null }}
}
