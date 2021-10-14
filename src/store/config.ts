import { Folder } from "@/types/files";
import { Action, Module, VuexModule } from "vuex-module-decorators";


@Module({ name: "config", namespaced: true })
export default class Config extends VuexModule {
	sgottPath = ""
	tempFolder = "./temp"

	@Action
	async load(): Promise<void> {
		// Load config, and ask for sgott path if needed
		console.log("config loaded")
	}

	@Action
	async save(): Promise<void> {
		console.log("config saved")
	}
}
