import React from 'react'
export class MenuItem extends React.Component {
  state = {}

  render() {
    return (
      <div
        className="menuItem"
        onClick={e => this.props.close(e)}
        onMouseEnter={e => this.mouseEnter(e)}
        onMouseLeave={e => this.mouseExit(e)}
        style={this.getItemStyle()}
        title={this.props.item.info}
      >
        {this.props.item.name}
      </div>
    )
  }

  mouseEnter = () => this.setState({ hover: true })

  mouseExit = () => this.setState({ hover: false })

  getItemStyle = () => {
    return { backgroundColor: this.state.hover ? 'white' : null }
  }
}
