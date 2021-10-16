import { ipcRenderer } from "electron";
import { File } from "@/types/files";

export const LOAD_SGO = "sgo:load";

export async function loadSGO(file: File): Promise<string> {
	return await ipcRenderer.invoke(LOAD_SGO, file);
}


export const SAVE_SGO = "sgo:save";

export async function saveSGO(file: File, data: string): Promise<void> {
	return await ipcRenderer.invoke(SAVE_SGO, file, data);
}

