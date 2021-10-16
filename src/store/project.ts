import { File, FileMetadata, FolderMetadata } from "@/types/files";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import * as SGO from "@/lib/sgo/core"
import { Languages, LanguageSpecificFiles } from "@/types/project";

@Module({ name: "project", namespaced: true })
export default class ProjectStore extends VuexModule {
	directory?: FolderMetadata
	list: FileMetadata[] = []
	defaultLanguage = Languages.English
	weaponTable?: SGO.WeaponTableFile
	languageSpecificFiles?: LanguageSpecificFiles
	
	@Action
	async openDirectory(): Promise<void> {
		console.log("open directory")
	}
}
