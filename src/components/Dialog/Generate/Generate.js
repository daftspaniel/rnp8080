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

    return this.renderDragbar(() => (
      <div
        className="dialogPanel GenerateDialog"
        style={this.theme.getColorStyles()}
      >
        {this.renderTitleBar()}
        <br />
        <label class="repeatLabel">Repeat</label>
        <input
          class="repeat"
          type="text"
          placeholder="Type text here..."
          id="repeatTextbox"
        />
        <input class="repeatCount" type="number" min="1" /> Times
        <br />
        <br />
        <input type="checkbox" /> Add a newline after each item
        <br />
        <br />
        <textarea
          class="previewText"
          readonly
          placeholder="Preview will appear here"
        ></textarea>
        <br />
        <button class="actionButton">Prepend</button>
        <button class="actionButton">Insert</button>
        <button class="actionButton">Append</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={this.close}>Close</button>
      </div>
    ))
  }
}

export default GenerateDialog
