import { File } from "@/types/files";
import { dialog } from "electron";
import path from "path";

export function convertPathToFile(filepath: string): File {
	return {
		name: path.basename(filepath),
		path: filepath,
		extension: path.extname(filepath).toLowerCase(),
		data: "",
		loading: false,
	}
}

export async function getFileFromUser(): Promise<File> {
	const res = await dialog.showOpenDialog({ properties: ['openFile'] });
	return convertPathToFile(res.filePaths[0])
}
