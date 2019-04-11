import React from 'react'

import { Dialog } from '../Dialog'
import { Show_PrePost_Dialog, PrePost_Text } from '../../../Events'

import '../Dialog.css'
import './PrePost.css'

const Placeholder_Text = 'Type text here ...'

class PrePostDialog extends Dialog {
    constructor(props) {
        super(props)
        this.minibus.subscribe(Show_PrePost_Dialog, () => this.show())
        this.state = { pre: '', post: '' }
        this.title = 'Prefix and Postfix Lines'
    }

    render() {
        if (!this.state.visible) return null

        return this.renderDragbar(
            () => (
                <div className="dialogPanel PrePostDialog" style={this.theme.getColorStyles()}>
                    {this.renderTitleBar()}
                    {this.PrePostDialogContent()} 
                </div >
            )
        )
    }

    onPreChange = (event) => this.setState({ pre: event.target.value })

    onPostChange = (event) => this.setState({ post: event.target.value })

    updateText = () => this.minibus.post(PrePost_Text, () => { return { pre: this.state.pre, post: this.state.post } })

    PrePostDialogContent = () => (
        <div>
            <div>
                <label>Add to start </label><input type="text" placeholder={Placeholder_Text} tabIndex="221" defaultValue={this.state.pre} onChange={this.onPreChange} />
                <br />
                <label>Add to end </label><input type="text" placeholder={Placeholder_Text} tabIndex="222" value={this.state.post} onChange={this.onPostChange} />
                <br />
                <div className="ActionButtons">
                    <button onClick={this.updateText}>Do it!</button>
                    <button onClick={this.close}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default PrePostDialog
