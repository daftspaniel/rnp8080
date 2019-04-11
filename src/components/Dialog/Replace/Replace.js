import React from 'react'

import { Dialog } from '../Dialog'
import { Replace_Text, Show_Replace_Dialog } from '../../../Events'

import '../Dialog.css'
import './Replace.css'

const Placeholder_Text = 'Type text here ...'

class ReplaceDialog extends Dialog {
    constructor(props) {
        super(props)
        this.minibus.subscribe(Show_Replace_Dialog, () => this.show())
        this.state = { target: '', replacement: '' }
        this.title = 'Replace'
    }

    render() {
        if (!this.state.visible) return null

        return this.renderDragbar(
            () => (
                <div className="dialogPanel ReplaceDialog" style={this.theme.getColorStyles()}>
                    {this.renderTitleBar()}
                    {this.replaceDialogContent()}
                </div >
            )
        )
    }

    onTargetChange = (event) => this.setState({ target: event.target.value })

    onReplacementChange = (event) => this.setState({ replacement: event.target.value })

    replaceText = () => this.minibus.post(Replace_Text, () => { return { target: this.state.target, replacement: this.state.replacement } })

    replaceDialogContent = () => (
        <div>
            <div>
                <label>Replace</label>
                <input type="text" placeholder={Placeholder_Text} tabIndex="221" defaultValue={this.state.target} onChange={this.onTargetChange} />
                <label> with </label>
                <input type="text" placeholder={Placeholder_Text} tabIndex="222" value={this.state.replacement} onChange={this.onReplacementChange} />
                <br />
                <br />
                <input type="checkbox" tabIndex="223" /> Add a newline AFTER each replacement
                <br />
                <input type="checkbox" tabIndex="224" /> Add a newline BEFORE each replacement
                <br />
                <br />
                <div className="ActionButtons">
                    <button onClick={this.replaceText}>Replace</button>
                    <button onClick={this.close}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default ReplaceDialog
