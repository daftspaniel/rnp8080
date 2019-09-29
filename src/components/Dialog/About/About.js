import React from 'react'

import { EditorEvents } from '../../../Events'
import { welcomeText } from '../../Resources/Resources'

import '../Dialog.css'
import './About.css'

import { Dialog } from '../Dialog';

class AboutDialog extends Dialog {
    constructor(props) {
        super(props)
        this.minibus.subscribe(EditorEvents.Show_About_Dialog, () => this.show())
        this.title = 'About Notepad 8080'
    }

    render() {
        if (!this.state.visible) return null
        return (
            <div className="dialogPanel AboutDialog" style={this.theme.getColorStyles()}>
                {this.renderTitleBar()}
                <textarea readonly cols="85" className="textBox" defaultValue={welcomeText}></textarea>
                <br />
                <button onClick={this.close}>Close</button>
            </div >
        )
    }
}

export default AboutDialog
