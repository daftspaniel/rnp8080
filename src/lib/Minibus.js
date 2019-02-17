class Minibus {
  subscriptions = {}

  static theInstance = null
  /**
   * @returns {ThemeManager}
   */
  static getInstance() {
    if (Minibus.theInstance == null) {
      Minibus.theInstance = new Minibus()
    }

    return this.theInstance
  }

  /// Subscribe a target to an event.
  subscribe(event, target) {
    if (!this.subscriptions[event]) {
      this.subscriptions[event] = []
    }
    this.subscriptions[event].push(target)
  }

  /// Post the event [String] and data provider [Function] to the subscriptions.
  post(event, dataProvider) {
    if (this.subscriptions[event]) {
      this.subscriptions[event].forEach(target => {
        target(dataProvider)
      })
    }
  }
}

export default Minibus
