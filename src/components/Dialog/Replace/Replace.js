import React from 'react'

import { Show_Replace_Dialog } from '../../../Events'

import '../Dialog.css'
import './Replace.css'

import { Dialog } from '../Dialog';
import Draggable from 'react-draggable';

class ReplaceDialog extends Dialog {
    constructor(props) {
        super(props)
        this.minibus.subscribe(Show_Replace_Dialog, () => this.show())
        this.state = { target: 'asdf' }
    }

    render() {
        if (!this.state.visible) return null
        return (<Draggable>
            <div className="dialogPanel ReplaceDialog" style={this.theme.getColorStyles()}>
                {this.renderCloseCross()}
                {this.renderHeader('Replace')}
                {this.replaceDialogContent()}
            </div >
        </Draggable>)
    }

    onTargetChange(event) {
        this.setState({ target: event.target.value });
    }

    replaceDialogContent = () => (
        <div>
            <div>
                <label>Replace</label>
                <input type="text" placeholder="Type text here..." tabIndex="221" id="targetTextbox" value={this.state.target} onChange={this.onTargetChange} />
                <label> with </label>
                <input type="text" placeholder="Type text here..." tabIndex="222" id="replaceTextbox" />
                <br />
                <br />
                <input type="checkbox" tabIndex="223" /> Add a newline AFTER each replacement
                        <br />
                <input type="checkbox" tabIndex="224" /> Add a newline BEFORE each replacement
                        <br />
                <br />
                <div className="ActionButtons">
                    <button>Replace</button>
                    <button>Close</button>
                </div>
            </div>
        </div>
    )
}

export default ReplaceDialog
