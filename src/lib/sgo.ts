import axios from "axios";
import { ipcMain, ipcRenderer } from "electron";
import { readFileSync, writeFileSync } from "original-fs";
import { join, resolve } from "path";
import { TEMP_FILE_DIR } from "./core";
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const SGOTT_PATH = join(TEMP_FILE_DIR, 'sgott.exe');

// Convert to JSON and load
const IPC_CONVERT_SGO_TO_JSON = 'sgo:convertSgoToJson';

export async function convertSgoToJson(filename: string, filepath: string): Promise<string> {
	return await ipcRenderer.invoke(IPC_CONVERT_SGO_TO_JSON, filename, filepath);
}
ipcMain?.handle(IPC_CONVERT_SGO_TO_JSON, async (event, filename, filepath) => {
	await execAsync(`${SGOTT_PATH} "${filepath}" ${TEMP_FILE_DIR}/${filename}.json`);
	let str = readFileSync(`${TEMP_FILE_DIR}/${filename}.json`).toString();
	str = str.replaceAll("  ", "\t")
	return str;
});

// Save to JSON and convert to SGO
const IPC_CONVERT_JSON_TO_SGO = 'sgo:saveJsonAsSgo';

export async function saveJsonAsSgo(filename: string, filepath: string, json: string): Promise<void> {
	return await ipcRenderer.invoke(IPC_CONVERT_JSON_TO_SGO, filename, filepath, json);
}
ipcMain?.handle(IPC_CONVERT_JSON_TO_SGO, async (event, filename, filepath, json) => {
	await writeFileSync(`${TEMP_FILE_DIR}/${filename}.json`, json);
	await execAsync(`${SGOTT_PATH} ${TEMP_FILE_DIR}/${filename}.json "${filepath}"`);
});




