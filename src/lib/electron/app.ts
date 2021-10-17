import { app, BrowserWindow, Menu } from "electron"
import { getFileMetadataFromUser } from "@/lib/file/main";
import { electronStore } from "@/store/electron";
import fs from 'fs'
import path from 'path'
import { PathLike } from "original-fs";

function initialize() {
	console.log('initialize')	
}
app.on('will-finish-launching', initialize)

async function onReady() {
	setupMenu();
}
app.on('ready', onReady)

export function setupMenu() {
	const menu = Menu.buildFromTemplate([
		{
			label: "File",
			submenu: [
				{
					label: "Open File",
					accelerator: "Ctrl+O",
					click: async () => {
						//const store = await PersistedState.getStoreFromRenderer() as StoreInterface;
						const meta = await getFileMetadataFromUser()
						electronStore.dispatch("files/openFileAndUpsertToGroup", { meta })
					}
				},
				{
					label: "Open Folder",
					enabled: false,
				},
				{
					label: "Save File",
					accelerator: "Ctrl+S",
					click() {
						// TODO: move all commands to file as constants
						BrowserWindow.getFocusedWindow()?.webContents.send('ui:saveFile')
					}
				},
				{
					label: "Open Dev Tools",
					accelerator: 'Ctrl+Shift+I',
					click() {
						BrowserWindow.getFocusedWindow()?.webContents.openDevTools();
					}
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
