import { Languages } from "@/types/project";
import { Action, Module, VuexModule } from "vuex-module-decorators";
import { ConfigStoreState } from "./state";


@Module({ namespaced: true })
export default class Config extends VuexModule implements ConfigStoreState {
	sgottPath = "./resources/sgott.exe"
	tempFolder = "./temp"
	language = Languages.English

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
