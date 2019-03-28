import React, { Component } from 'react'

import ThemeManager from '../../lib/ThemeManager'
import Minibus from '../../lib/Minibus'
import './About.css'
const theme = ThemeManager.getInstance()
const minibus = Minibus.getInstance()

class AboutDialog extends Component {
    constructor(props) {
        super(props)
        minibus.subscribe('show-about-dialog', () => this.setState({ visible: true }))
        this.state = { visible: true }
    }

    render() {
        if (!this.state.visible) return null
        return (
            <div style={theme.getColorStyles()} className="dialogPanel">
                <textarea readonly cols="85" className="textBox">Cheese</textarea>
                <br />
                <button onClick={(e) => this.setState({ visible: false })}>Close</button>
            </div >
        )
    }
}

export default AboutDialog
