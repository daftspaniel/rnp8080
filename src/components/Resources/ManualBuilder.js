import { AllMenus } from '../MenuBar/MenuDefinitions'

export const getNP8080Manual = () => {
    let manual = Introduction


    AllMenus.forEach((menu) => {
        manual += '\n\n'
        menu.forEach((menuItem) => {
            manual += `${menuItem.name}\t\t${menuItem.info.replace('\n', '\t')}\n`
        })
        manual += '\n'
    })

    return manual
}

const Introduction = `Notepad 8080 is a text editor in your browser. It is 100% free to use, contains
no advertising or tracking. Your data is automatically stored in your web 
browser's local storage and NOT on any server.

The application is constantly updated! Hit Refresh to make sure you 
are on the latest.

`