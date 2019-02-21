import Minibus from './Minibus'

const minibus = Minibus.getInstance()

export default class ThemeManager {
  static theInstance = null

  defaultTheme = {
    foreground: '#111111',
    backgroundPrimary: '#bbd8f9',
    backgroundSecondary: '#9ac0e9',
    backgroundTertiary: '#c0deff',
    padding: 5,
    borderColor: '#94b1ff !important',
    documentColor: '#111111',
    documentBackground: 'whitesmoke',
  }

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

  amberTheme = {
    foreground: '#ff7418',
    backgroundPrimary: '#050107',
    backgroundSecondary: '#63281b',
    backgroundTertiary: '#050107',
    padding: 5,
    borderColor: '#c47429 !important',
    documentColor: '#ff671f',
    documentBackground: '#060201',
  }

  allThemes = [this.defaultTheme, this.darkTheme, this.amberTheme]

  activeIndex = 0

  active = this.allThemes[this.activeIndex]

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

  switchTheme = () => {
    this.activeIndex++
    if (this.activeIndex > this.allThemes.length - 1) this.activeIndex = 0
    this.active = this.allThemes[this.activeIndex]
    minibus.post('theme-change')
  }

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
      color: this.active.foreground,
    }
  }

  get2ndColorStyles = () => {
    return {
      backgroundColor: this.active.backgroundSecondary,
      color: this.active.foreground,
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
