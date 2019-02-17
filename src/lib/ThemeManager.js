export default class ThemeManager {
  static theInstance = null

  darkTheme = {
    foreground: '#eee862',
    backgroundPrimary: '#111111',
    backgroundSecondary: '#333333',
    backgroundTertiary: '#222222',
    padding: 5,
    borderColor: '#A8A5A8 !important',
    documentColor: '#00DC00',
    documentBackground: '#000000',
  }

  active = this.darkTheme

  /**
   * @returns {ThemeManager}
   */
  static getInstance() {
    if (ThemeManager.theInstance == null) {
      ThemeManager.theInstance = new ThemeManager()
    }

    return this.theInstance
  }

  getTheme = () => this.active()

  getStyles = () => {
    return {
      backgroundColor: this.active.backgroundPrimary,
      color: this.active.foreground,
      padding: this.active.padding,
    }
  }
  
  getColorStyles = () => {
    return {
      backgroundColor: this.active.backgroundPrimary,
      color: this.active.foreground
    }
  }

  getDocumentStyles = () => {
    return {
      backgroundColor: this.active.documentBackground,
      color: this.active.documentColor,
      padding: this.active.padding,
    }
  }
}
