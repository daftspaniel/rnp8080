import React from 'react'

import { Show_Manual_Dialog } from '../../../Events'
import { getNP8080Manual } from '../../Resources/ManualBuilder'

import '../Dialog.css'
import './Manual.css'

import { Dialog } from '../Dialog';

class ManualDialog extends Dialog {
    constructor(props) {
        super(props)
        this.minibus.subscribe(Show_Manual_Dialog, () => this.show())
        this.text = getNP8080Manual()
        this.title = 'About Notepad 8080'
    }

    render() {
        if (!this.state.visible) return null
        return (
            <div className="dialogPanel ManualDialog" style={this.theme.getColorStyles()}>
                {this.renderTitleBar()}
                <textarea readOnly cols="85" className="textBox" defaultValue={this.text}></textarea>
                <br />
                <button onClick={this.close}>Close</button>
            </div >
        )
    }
}

export default ManualDialog
