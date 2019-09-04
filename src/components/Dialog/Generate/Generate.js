import React from 'react'

import { EditorEvents } from '../../../Events'

import '../Dialog.css'
import './Generate.css'

import { Dialog } from '../Dialog'

class GenerateDialog extends Dialog {
    constructor(props) {
        super(props)
        this.minibus.subscribe(EditorEvents.Show_Generate_Dialog, () => this.show())
        this.title = 'Generate'
    }

    render() {
        if (!this.state.visible) return null
        return (
            <div className="dialogPanel GenerateDialog" style={this.theme.getColorStyles()}>
                {this.renderTitleBar()}
                <br />
                <button onClick={this.close}>Close</button>
            </div >
        )
    }
}

export default GenerateDialog