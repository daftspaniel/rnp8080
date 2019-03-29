import React, { Component } from 'react'

import ThemeManager from '../../lib/ThemeManager'
import Minibus from '../../lib/Minibus'
import { welcomeText } from '../Resources/Resources'

import './Dialog.css'
import './About.css'

class Dialog extends Component {
    constructor(props) {
        super(props)
        this.state = { visible: false }
        this.theme = ThemeManager.getInstance()
        this.minibus = Minibus.getInstance()
    }
    close = (e) => this.setState({ visible: false })
    show = (e) => this.setState({ visible: true })
}

class AboutDialog extends Dialog {
    constructor(props) {
        super(props)
        this.minibus.subscribe('show-about-dialog', () => this.show())
    }

    render() {
        if (!this.state.visible) return null
        return (
            <div className="dialogPanel AboutDialog" style={this.theme.getColorStyles()}>
                <div onClick={this.close} className="closeCross">X</div>
                <div className="header" style={this.theme.get2ndColorStyles()}>About Notepad 8080 v</div >
                <textarea readOnly cols="85" className="textBox" defaultValue={welcomeText}></textarea>
                <br />
                <button onClick={this.close}>Close</button>
            </div >
        )
    }
}

export default AboutDialog
