import { EditorEvents } from '../../Events'

export const StartMenuItems = [
  {
    name: 'Clear text',
    info: 'Start again with an empty file.',
    separator: true,
    command:  EditorEvents.Clear_Text,
  },
  {
    name: 'Welcome text',
    info: 'Put sample text into the file.',
    separator: false,
    command:  EditorEvents.Welcome_Text,
  },
  {
    name: 'Markdown',
    info: 'Put sample Markdown into the file.',
    separator: false,
    command:  'markdown-text'
  },
  {
    name: 'Todo Template',
    info: 'Put a Todo list template into the file.',
    separator: false,
    command:  'todo-template-text'
  },
  {
    name: 'PMI Template',
    info: 'Put a PMI list template into the file.',
    separator: false,
    command:  'pmi-template-text'
  },
  {
    name: 'SMART Goal',
    info: 'Put a SMART Goal template into the file.',
    separator: true,
    command:  'smart-template-text'
  },
  {
    name: 'Week Planner',
    info: 'Put a week long planning template into the file.',
    separator: false,
    command:  'week-template-text'
  },
  {
    name: 'HTML Starter',
    info: 'Put an HTML template into the file.',
    separator: false,
    command:  'html-template-text'
  },
]

export const ModifyMenuItems = [
  {
    name: 'Replace...',
    info: 'Replace text with different text.\nCtrl + Q',
    separator: false,
    command:  EditorEvents.Show_Replace_Dialog
  },
  {
    name: 'Pre/Post...',
    info: 'Add text to start and/or end of lines.',
    separator: true,
    command:  EditorEvents.Show_PrePost_Dialog
  },
  {
    name: 'Number',
    info: 'Number non-blank lines.',
    separator: false,
    command:  EditorEvents.Number_Lines
  },
  {
    name: 'Tabs to Spaces',
    info: 'Convert tab characters to spaces.',
    separator: false,
    command:  EditorEvents.Change_Tabs_To_Spaces
  },
  {
    name: 'Doublespace',
    info: 'Double space the lines.',
    separator: true,
    command:  EditorEvents.Double_Space_Lines
  },
  {
    name: 'Reverse',
    info: 'Reverse the line order.',
    separator: false,
    command:  EditorEvents.Reverse
  },
  {
    name: 'Randomise',
    info: 'Randomise the line order.',
    separator: true,
    command:  EditorEvents.Randomise_Lines
  },
  {
    name: 'Sort A to Z',
    info: 'Sort the contents alphabetically.',
    separator: false,
    command:  EditorEvents.Sort_Lines
  },
  {
    name: 'Sort by line length',
    info: 'Sort lines by length - shortest to longest.',
    separator: false,
    command:  EditorEvents.Double_Space_Lines
  },
]


export const AddMenuItems = [
  {
    name: 'Lorem Ipsum',
    info: 'Add Lorem Ipsum text.',
    separator: true,
    command:  EditorEvents.Add_Lorem_Ipsum
  },  {
    name: 'Duplicate All',
    info: 'Append a copy of the entire text to itself.',
    separator: true,
    command:  EditorEvents.Duplicate_All
  },
]

export const AboutMenuItems = [
  {
    name: 'About...',
    info: 'Find out more about NP8080.',
    separator: false,
    command:  'show-about-dialog'
  },
  {
    name: 'Manual...',
    info: 'Read the NP8080 manual.',
    separator: true,
    command:  'show-manual-dialog'
  }
]

export const AllMenus = [StartMenuItems, ModifyMenuItems, AddMenuItems, AboutMenuItems] 