import { ipcMain, ipcRenderer } from "electron";
import * as SGO from '@/lib/sgo'
import { File } from "@/types/files";
import { IpcMainInvokeEvent } from "electron/main";

const LOAD_SGO = "sgo:load";

export async function loadSGO(file: File): Promise<string> {
	return await ipcRenderer.invoke(LOAD_SGO, file.name, file.path);
}
ipcMain?.handle(LOAD_SGO, async (event: IpcMainInvokeEvent, file: File) => SGO.load(file));


const SAVE_SGO = "sgo:save";

export async function saveSGO(file: File, data: string): Promise<void> {
	return await ipcRenderer.invoke(SAVE_SGO, file, data);
}
ipcMain?.handle(SAVE_SGO, async (event: IpcMainInvokeEvent, file: File, data: string) => SGO.save(file, data));
