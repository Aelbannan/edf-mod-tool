import { File, FileGroup, FileMetadata, FileStatus, FileType, MultipleAccessFile } from "@/types/files";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import * as SGO from "@/lib/sgo/core"
import { FileStoreState } from "./state";

@Module({ namespaced: true })
export default class FileStore extends VuexModule implements FileStoreState {
	filesByPath: { [path: string]: File } = {}
	fileList: File[] = []

	groups: FileGroup[] = []
	activeGroupIndex = 0

	get getFileByPath(): (p: string) => File | undefined {
		return (path: string) => this.filesByPath[path]
	}

	get getFileByMetadata(): (m: FileMetadata) => File | undefined {
		return (meta: FileMetadata) => this.getFileByPath(meta.path)
	}

	get getFile(): (f: File) => File | undefined {
		return (file: File) => this.getFileByPath(file.path)
	}

	get indexOfGroupContainingFile(): (f: File) => number {
		return (file: File) => {
			const existingGroupIndex = this.groups.findIndex(
				group => group.files.some(f => f.path === file.path)
			);
			return existingGroupIndex;
		}
	}

	get getFileFactory(): (m: FileMetadata) => ((m: FileMetadata, t?: FileType) => File) {
		return (m) => {
			switch (m.extension) {
				case SGO.BaseFile.TYPE: return SGO.createSGOFileFromMetadata
				default: throw new Error("Unknown file extension")
			}	
		}
	}

	@Mutation
	addFile(file: File) {
		this.fileList.push(file)
		this.filesByPath[file.path] = file
	}

	@Mutation 
	updateFile({ file, data } : { file: File, data: string }) {
		file.update(data)
	}

	@Mutation
	updatePartialFile({ file, data, index }: { file: MultipleAccessFile, data: string, index: number }) {
		file.updatePartial(data, index)
	}

	@Mutation
	setActiveGroup(index: number): void {
		this.activeGroupIndex = index
	}

	@Mutation 
	createFileGroup(): void {
		this.groups.push({ files: [], resources: {} });
	}

	@Mutation 
	addFileToGroup({ file, index }: { file: File, index: number }): void {
		this.groups[index].files.push(file);
	}

	@Action
	async openFile({ meta, typeOverride }: { meta: FileMetadata, typeOverride?: FileType }): Promise<void> {
		// Check if file exists
		let file = this.getFileByMetadata(meta);
		
		// If file doesn't exist, create and add to lists
		if (!file) {
			const createFileFunc = this.getFileFactory(meta);
			file = createFileFunc(meta, typeOverride)
			this.context.commit("addFile", file)
		}

		// If file hasn't been loaded yet, load
		if (file.status === FileStatus.INITIALIZED) {
			await file.load()
		}
	}

	@Action
	upsertFileIntoGroup({ file, groupIndex }: { file: File, groupIndex?: number }): void {
		const existingIndex = this.indexOfGroupContainingFile(file);
		if (existingIndex >= 0) {
			this.context.commit('setActiveGroupIndex', existingIndex)
		}

		// If not, add to group (or create one)
		if (!groupIndex || !this.groups[groupIndex]) {
			this.context.commit('createFileGroup')
			groupIndex = this.groups.length - 1;
		}
		
		this.context.commit('addFileToGroup', { file, index: groupIndex })
		this.context.commit('setActiveGroup', groupIndex)
	}
	
	@Action
	async openFileAndUpsertToGroup({ meta }: { meta: FileMetadata }) {
		await this.context.dispatch('openFile', { meta })
		const file = this.getFileByMetadata(meta)
		this.context.dispatch('upsertFileIntoGroup', { file })
	}

	@Action 
	async saveFile({ file }: { file: File }): Promise<void> {
		await file.save()
	}
}
