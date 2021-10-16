import { File, FileMetadata, FileStatus, FileType, MultipleAccessFile } from "@/types/files";
import { loadSGO, saveSGO } from "./ipc";

export class BaseFile extends File {
	public static readonly TYPE: FileType = ".sgo"
	private _data = ""

	constructor(metadata: FileMetadata, type?: FileType) {
		super(metadata, type || BaseFile.TYPE)
	}

	async save(): Promise<void> {
		await saveSGO(this, this._data)
	}

	async load(): Promise<void> {
		this._status = FileStatus.LOADING

		const data = await loadSGO(this)
		this._data = data;
		
		this._status = FileStatus.LOADED
	}
	
	get data(): string {
		return this._data
	}

	update(data: string): void {
		this._data = data
	}
}

export class WeaponTableFile extends BaseFile implements MultipleAccessFile {
	public static readonly TYPE: FileType = "WEAPONTABLE"

	constructor(metadata: FileMetadata) {
		super(metadata, WeaponTableFile.TYPE)
	}

	getIndexOfFile(filename: string): number {
		return 0
	}

	updatePartial(data: string, index: number): void {
		console.log("update partial")
	}
}

export class WeaponTextFile extends BaseFile implements MultipleAccessFile {
	public static readonly TYPE: FileType = "WEAPONTEXT"

	constructor(metadata: FileMetadata) {
		super(metadata, WeaponTextFile.TYPE)
	}

	updatePartial(data: string, index: number): void {
		console.log("update partial")
	}
}

export function createSGOFileFromMetadata(meta: FileMetadata, type?: FileType): File {
	switch (type) {
		case WeaponTableFile.TYPE: 
			return new WeaponTableFile(meta)
		case WeaponTextFile.TYPE:
			return new WeaponTextFile(meta);
		default:
			return new BaseFile(meta);
	}	
}
