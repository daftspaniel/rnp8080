import React, { Component } from 'react'

import ThemeManager from '../lib/ThemeManager'
import Minibus from '../lib/Minibus'

export default class Basecomponent extends Component {
    constructor(props) {
        super(props)
        this.state = { visible: true }
        this.theme = ThemeManager.getInstance()
        this.minibus = Minibus.getInstance()
    }

    close = (e) => this.setState({ visible: false })

    show = (e) => this.setState({ visible: true })
}
