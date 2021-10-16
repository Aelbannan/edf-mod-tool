export interface FileMetadata {
	readonly name: string
	readonly path: string
	readonly extension: string
}

export interface FolderMetadata {
	name: string
	path: string
	files: File[]
}

export type FileType = string

export enum FileStatus {
	INITIALIZED,
	LOADING,
	LOADED,
	ERROR,
}

export abstract class File implements FileMetadata {
	public readonly name: string
	public readonly path: string
	public readonly extension: string
	public readonly type: FileType
	protected _status = FileStatus.INITIALIZED

	constructor(metadata: FileMetadata, type: FileType) {
		this.name = metadata.name
		this.path = metadata.path
		this.extension = metadata.extension
		this.type = type
	}

	abstract get data(): string
	get status(): FileStatus {
		return this._status
	}

	// These should only be called from the FileStore
	abstract save(): Promise<void>
	abstract load(): Promise<void>
	abstract update(data: string): void
}

export interface MultipleAccessFile extends File {
	// This should only be called from the FileStore
	updatePartial: (data: string, index: number) => void
}

export interface FileGroup {
	files: File[] 									// Primary files in this group. Other groups can't use these files at all
	resources: { [id: string]: MultipleAccessFile } 	// Secondary file dependencies. These files must support multiple access and data merging
}
