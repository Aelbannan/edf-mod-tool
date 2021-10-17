import { readFileSync, writeFileSync } from "original-fs";
import { exec } from 'child_process';
import { promisify } from 'util';
import { File } from "@/types/files";
import { electronStore } from "@/store/electron";
import { ipcMain } from "electron";
import { LOAD_SGO, SAVE_SGO } from "./ipc";
import { IpcMainInvokeEvent } from "electron/main";
import path from 'path'

const execAsync = promisify(exec);

export async function convertAndLoadSGOFile(file: File): Promise<string> {
	const { config } = await electronStore.getState();
	const jsonPath = path.resolve(`${config.tempFolder}/${file.name}.json`);
	
	await execAsync(`"${path.resolve(config.sgottPath)}" "${file.path}" "${jsonPath}"`);

	const data = readFileSync(jsonPath).toString();
	return data.replaceAll("  ", "\t")
}
ipcMain.handle(LOAD_SGO, async (event: IpcMainInvokeEvent, file: File) => convertAndLoadSGOFile(file));


export async function saveAndConvertSGOFile(file: File, data: string): Promise<void> {
	const { config } = await electronStore.getState()
	const jsonPath = path.resolve(`${config.tempFolder}/${file.name}.json`)

	await writeFileSync(jsonPath, data);

	await execAsync(`"${path.resolve(config.sgottPath)}" "${jsonPath}" "${file.path}"`);
}
ipcMain.handle(SAVE_SGO, async (event: IpcMainInvokeEvent, file: File, data: string) => saveAndConvertSGOFile(file, data));
