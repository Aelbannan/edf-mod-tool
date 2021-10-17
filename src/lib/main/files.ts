import { File, FileMetadata } from "@/types/files";
import { dialog } from "electron";
import { FileFilter } from "electron/main";
import path from "path";

export const FILE_FILTERS: { [id: string]: FileFilter } = {
	SGO: {
		name: 'SGO',
		extensions: ["sgo"]
	},
	EXE: {
		name: 'EXE',
		extensions: ["exe"]
	},
}

export async function showOpenFileDialog(filters?: FileFilter[]): Promise<string> {
	const res = await dialog.showOpenDialog({
		properties: ["openFile"],
		filters,
	})

	return res.filePaths[0] || ""
}
