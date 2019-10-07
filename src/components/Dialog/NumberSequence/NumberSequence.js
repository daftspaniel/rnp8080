import React from 'react'

import { Dialog } from '../Dialog'
//import StringProcess from '../../../lib/StringProcess'
import { EditorEvents } from '../../../Events'

import '../Dialog.css'

//const textProcessor = new StringProcess()

class NumberSequenceDialog extends Dialog {
    constructor(props) {
        super(props)
        this.minibus.subscribe(EditorEvents.Show_Number_Sequence_Dialog, () => this.show())
        this.title = 'Number Sequence'
        this.state = {
            generatedText: '',
            startIndex: 10,
            repeatCount: 10,
            increment: 10
        }
    }

    render() {
        if (!this.state.visible) return null

        return this.renderDragbar(() => (
            <div
                className="dialogPanel GenerateDialog"
                style={this.theme.getColorStyles()}
            >
                {this.renderTitleBar()}
                <br />
                <div style={{textAlign: 'left'}}>
                    <label className="repeatLabel">Start at </label>
                <input
                    className="repeat"
                    type="text"
                    placeholder="Type text here..."
                    id="repeatTextbox"
                    value={this.state.startIndex}
                />
                <br />
                <br />
                <label className="repeatLabel">and repeat </label>
                <input className="repeatCount" type="number" min="1" value={this.state.repeatCount} /> times
                <br />
                <br />
                <label className="repeatLabel">adding </label>
                <input className="repeatCount" type="number" min="1" value={this.state.increment} /> each time
                <br />
                <br />
            </div>
            
            <textarea
                className="previewText"
                readOnly
                placeholder="Preview will appear here"
                value={this.state.generatedText}
            ></textarea>
            
            <br />
            <button className="actionButton" onClick={this.prepend}>Prepend</button>
            <button className="actionButton" onClick={this.insert}>Insert</button>
            <button className="actionButton" onClick={this.append}>Append</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={this.close}>Close</button>
            </div >
        ))
    }
}

export default NumberSequenceDialog
