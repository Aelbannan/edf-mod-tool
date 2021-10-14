export interface File {
	name: string
	path: string
	extension: string
	data: string
	loading: boolean
}

export interface Folder {
	name: string
	path: string
	files: File[]
}
