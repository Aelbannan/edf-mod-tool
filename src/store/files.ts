import { File, Folder } from "@/types/files";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import * as SGO from "@/lib/sgo"

@Module({ name: "files", namespaced: true })
export default class FilesStore extends VuexModule {
	project?: Folder
	fileIndex: { [id: string]: File } = {}
	activeFiles: File[] = []

	get file(): (f: File) => File {
		return (file: File) => this.fileIndex[file.path]
	}

	@Mutation
	addFile(file: File): void {
		this.fileIndex[file.path] = file
	}

	@Mutation
	updateFile({ file, loading, data= "" }: { file: File, loading: boolean, data: string }): void {
		file = this.file(file)
		file.loading = loading
		file.data = data;
	}

	@Action
	async openFile(file: File): Promise<void> {
		if (!this.file(file)) {
			this.context.commit("addFile", file);
		}

		let data;
		switch (file.extension) {
			case '.sgo':
				this.context.commit('updateFile', { file, loading: true });
				data = await SGO.load(file);
				this.context.commit('updateFile', { file, loading: false, data });
				break;

		}
	}
}
