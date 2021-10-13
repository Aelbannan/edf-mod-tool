import { ipcMain, ipcRenderer } from "electron";
import { exists, existsSync, fstat, mkdirSync } from "fs";

export const isRendererThread = (process && process.type === 'renderer');
export const isMainThread = (process && process.type === 'browser');


function createFolder(folderPath: string) {
	if (!existsSync(folderPath)) {
		mkdirSync(folderPath)
	}
}

// Initialize filesystem 
const IPC_INITIALIZE_FILESYSTEM = 'core:initializeFilesystem';
export const TEMP_FILE_DIR = './temp';

export function initializeFilesystem() {
	ipcRenderer.invoke(IPC_INITIALIZE_FILESYSTEM);
}
ipcMain?.handle(IPC_INITIALIZE_FILESYSTEM, () => {
	createFolder(TEMP_FILE_DIR);
});



