import { app, Menu } from "electron"
import { getFileFromUser } from "./files";

import './ipc'

function initialize() {
	setupMenu();
}
app.on('will-finish-launching', initialize)

async function onReady() {
	console.log('ready')
}
app.on('ready', onReady)

export function setupMenu() {
	const menu = Menu.buildFromTemplate([
		{
			label: "File",
			submenu: [
				{
					label: "Open File",
					click: () => {
						// get file path 
					}
				},
				{
					label: "Open Folder",
				},
				{
					label: "Exit",
					click: () => app.quit()
				}
			]
		}
	]);
	Menu.setApplicationMenu(menu);
}
