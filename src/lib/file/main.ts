import { File, FileMetadata } from "@/types/files";
import { dialog } from "electron";
import path from "path";

export function convertPathToFileMetadata(filepath: string): FileMetadata {
	return {
		name: path.basename(filepath),
		path: filepath,
		extension: path.extname(filepath).toLowerCase(),
	}
}

// TODO: make filters flexible
export async function getFileMetadataFromUser(): Promise<FileMetadata> {
	const res = await dialog.showOpenDialog({ 
		properties: ['openFile'], 
		filters: [
			{ name: "SGO", extensions: ["sgo"] }
		] 
	});
	return convertPathToFileMetadata(res.filePaths[0])
}

