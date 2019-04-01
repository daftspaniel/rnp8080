import React from 'react'

import BaseComponent from '../BaseComponent'

export class Dialog extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = { visible: false }
    }

    close = (e) => this.setState({ visible: false })

    show = (e) => this.setState({ visible: true })

    renderCloseCross = () => <div onClick={this.close} className="closeCross">X</div>

    renderHeader = (text) => <div className="header" style={this.theme.get2ndColorStyles()}>{text}</div >
}
