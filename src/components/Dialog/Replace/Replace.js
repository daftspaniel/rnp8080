import React from 'react'

import { Dialog } from '../Dialog'
import { EditorEvents } from '../../../Events'
import { TextAreaHelper } from '../../Editor/TextAreaHelper'

import '../Dialog.css'
import '../Common/Buttons.css'
import './Replace.css'

const Placeholder_Text = 'Type text here ...'

class ReplaceDialog extends Dialog {
  constructor(props) {
    super(props)
    this.minibus.subscribe(EditorEvents.Show_Replace_Dialog, () => this.show())
    this.state = { target: '', replacement: '' }
    this.title = 'Replace'
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.visible !== this.state.visible) {
      const taHelper = new TextAreaHelper()
      this.setState({ target: taHelper.getCurrentSelectionInfo().text })
    }
  }

  render() {
    if (!this.state.visible) return null

    return this.renderDragbar(() => (
      <div
        className="dialogPanel ReplaceDialog"
        style={this.theme.getColorStyles()}
      >
        {this.renderTitleBar()}
        {this.replaceDialogContent()}
      </div>
    ))
  }

  onTargetChange = (event) => this.setState({ target: event.target.value })

  onReplacementChange = (event) =>
    this.setState({ replacement: event.target.value })

  replaceText = () =>
    this.minibus.post(EditorEvents.Replace_Text, () => {
      return { target: this.state.target, replacement: this.state.replacement }
    })

  replaceDialogContent = () => (
    <div>
      <div>
        <label>Replace</label>
        <input
          type="text"
          placeholder={Placeholder_Text}
          tabIndex="221"
          defaultValue={this.state.target}
          onChange={this.onTargetChange}
        />
        <label> with </label>
        <input
          type="text"
          placeholder={Placeholder_Text}
          tabIndex="222"
          value={this.state.replacement}
          onChange={this.onReplacementChange}
        />
        <br />
        <br />
        <input type="checkbox" tabIndex="223" /> Add a newline AFTER each
        replacement
        <br />
        <input type="checkbox" tabIndex="224" /> Add a newline BEFORE each
        replacement
        <br />
        <br />
        <div className="ActionButtons">
          <button className="ActionButton" onClick={this.replaceText}>Replace</button>
          <button className="ActionButton" onClick={this.close}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default ReplaceDialog
