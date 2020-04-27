export class TextAreaHelper {
  constructor() {
    this.textArea = document.getElementById('nptextarea')
  }

  getCurrentSelectionInfo() {
    const selection = new TextareaSelection()
    selection.start = this.textArea.selectionStart
    selection.end = this.textArea.selectionEnd
    selection.text = this.textArea.value.substring(
      selection.start,
      selection.end
    )
    return selection
  }
}

class TextareaSelection {
  constructor() {
    this.start = 0
    this.end = 0
    this.text = 0
  }
}