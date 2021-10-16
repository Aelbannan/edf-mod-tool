import { File, FileGroup } from "@/types/files";


export interface FileStoreState {
	filesByPath: { [path: string]: File }
	fileList: File[] 

	groups: FileGroup[]
	activeGroupIndex: number
}
