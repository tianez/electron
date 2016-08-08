const {
    remote
} = require('electron');
const {
    Menu,
    MenuItem
} = remote;
const menu = new Menu();
menu.append(new MenuItem({
    label: '设置1',
    click() {
        console.log('item 1 clicked');
    }
}));
menu.append(new MenuItem({
    type: 'separator'
}));
menu.append(new MenuItem({
    label: 'MenuItem2',
    type: 'checkbox',
    checked: true
}));
menu.append(new MenuItem({
    label: 'MenuItem3',
    type: 'checkbox'
}));
window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    menu.popup(remote.getCurrentWindow())
}, false)
