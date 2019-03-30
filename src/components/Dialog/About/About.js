import React from 'react'

import { Show_About_Dialog } from '../../../Events'
import { welcomeText } from '../../Resources/Resources'

import '../Dialog.css'
import './About.css'

import { Dialog } from '../Dialog';

class AboutDialog extends Dialog {
    constructor(props) {
        super(props)
        this.minibus.subscribe(Show_About_Dialog, () => this.show())
    }

    render() {
        if (!this.state.visible) return null
        return (
            <div className="dialogPanel AboutDialog" style={this.theme.getColorStyles()}>
                {this.renderCloseCross()}
                <div className="header" style={this.theme.get2ndColorStyles()}>About Notepad 8080 v</div >
                <textarea readOnly cols="85" className="textBox" defaultValue={welcomeText}></textarea>
                <br />
                <button onClick={this.close}>Close</button>
            </div >
        )
    }
}

export default AboutDialog
