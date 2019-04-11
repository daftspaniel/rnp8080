import React from 'react'
import Draggable from 'react-draggable'

import BaseComponent from '../BaseComponent'

export class Dialog extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = { visible: false }
    }

    close = (e) => this.setState({ visible: false })

    show = (e) => this.setState({ visible: true })

    renderTitleBar = () => {
        return <div>
            <div onClick={this.close} className="closeCross">X</div>
            <div className="handle">
                <div className="header" style={this.theme.get2ndColorStyles()}>{this.title}
                </div >
            </div>
        </div>
    }

    renderDragbar(contentRenderer) {
        return (
            <Draggable handle=".handle">
                {contentRenderer()}
            </Draggable>
        )
    }
}
