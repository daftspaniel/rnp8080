import React from 'react'

import { Dialog } from '../Dialog'
import StringProcess from '../../../lib/StringProcess'
import { EditorEvents } from '../../../Events'

import '../Dialog.css'
import '../Common/Buttons.css'
import './Generate.css'

const textProcessor = new StringProcess()

class GenerateDialog extends Dialog {
  constructor(props) {
    super(props)
    this.minibus.subscribe(EditorEvents.Show_Generate_Dialog, () => this.show())
    this.title = 'Generate'
    this.state = { text: '', repeat: 10, generatedText: '' }
  }

  onTextChange = (event) => {
    this.setState({ text: event.target.value })
    this.updatePreview(event.target.value, this.state.repeat)
  }

  onNumberChange = (event) => {
    this.setState({ repeat: event.target.value })
    this.updatePreview(this.state.text, event.target.value)
  }

  insert = () => {
    this.minibus.post(EditorEvents.Insert_Text, this.state.generatedText)
    this.close()
  }

  prepend = () => {
    this.minibus.post(EditorEvents.Prepend_Text, this.state.generatedText)
    this.close()
  }

  append = () => {
    this.minibus.post(EditorEvents.Append_Text, this.state.generatedText)
    this.close()
  }

  updatePreview(text, number) {
    const newPreviewText = textProcessor.generateRepeatedString(text, number)
    this.setState({ generatedText: newPreviewText })
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
        <label className="repeatLabel">Repeat</label>
        <input
          className="repeat"
          type="text"
          placeholder="Type text here..."
          id="repeatTextbox"
          value={this.state.text}
          onChange={this.onTextChange}
        />
        <input className="repeatCount" type="number" min="1" value={this.state.repeat} onChange={this.onNumberChange} /> Times
        <br />
        <br />
        <input type="checkbox" /> Add a newline after each item
        <br />
        <br />
        <textarea
          className="previewText"
          readOnly
          placeholder="Preview will appear here"
          value={this.state.generatedText}
        ></textarea>
        <br />
        <button className="ActionButton" onClick={this.prepend}>Prepend</button>
        <button className="ActionButton" onClick={this.insert}>Insert</button>
        <button className="ActionButton" onClick={this.append}>Append</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="ActionButton" onClick={this.close}>Close</button>
      </div>
    ))
  }
}

export default GenerateDialog
