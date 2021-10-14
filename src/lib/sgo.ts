import axios from "axios";
import { readFileSync, writeFileSync } from "original-fs";
import { exec } from 'child_process';
import { promisify } from 'util';
import { File } from "@/types/files";
import { config } from "@/store"

const execAsync = promisify(exec);

export async function load(file: File): Promise<string> {
	const jsonPath = `${config.tempFolder}/${file.name}.json`;
	await execAsync(`${config.sgottPath} "${file.path}" ${jsonPath}`);
	const data = readFileSync(jsonPath).toString();
	return data.replaceAll("  ", "/t")
}

export async function save(file: File, data: string): Promise<void> {
	const jsonPath = `${config.tempFolder}/${file.name}.json`;
	await writeFileSync(jsonPath, data);
	await execAsync(`${config.sgottPath} ${jsonPath} "${file.path}"`);
}
