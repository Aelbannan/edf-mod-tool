import { CommitOptions, DispatchOptions } from "vuex";
import PersistedState from "vuex-electron-store";
import { StoreInterface } from "vuex-electron-store/lib/types";
import { ConfigStoreState } from "./config/state";
import { FileStoreState } from "./files/state";

interface ElectronState {
	files: FileStoreState
	config: ConfigStoreState
}

class ElectronStore {
	private store?: StoreInterface

	constructor() {
		this.loadStore()
	}

	async loadStore() {
		this.store = await PersistedState.getStoreFromRenderer() as StoreInterface;
	}


	dispatch(type: string, payload: any, options?: DispatchOptions): void {
		this.store?.dispatch(type, payload, options)
	}

	commit(type: string, payload: any, options?: CommitOptions) {
		this.store?.commit(type, payload, options)
	}

	async getState(): Promise<ElectronState> {
		const state = await this.store?.getState();
		return state as ElectronState;
	}
}

export const electronStore = new ElectronStore()
