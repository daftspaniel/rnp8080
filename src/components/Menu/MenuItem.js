import React from 'react'

import Minibus from '../../lib/Minibus'

const minibus = Minibus.getInstance()

export class MenuItem extends React.Component {
  state = {}

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
    minibus.post(this.props.item.command)
    this.props.close()
  }

  mouseEnter = () => this.setState({ hover: true })

  mouseExit = () => this.setState({ hover: false })

  getItemStyle = () => {
    return { backgroundColor: this.state.hover ? 'white' : null }
  }
}
