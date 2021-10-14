import Vue from 'vue';
import Vuex from 'vuex';
import PersistedState from 'vuex-electron-store'

import FileStore from './files'
import ConfigStore from './config'
import { getModule } from 'vuex-module-decorators';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		files: FileStore,
		config: ConfigStore,
	},
	plugins: [
		PersistedState.create(),
	]
});

export default store;
export const files = getModule(FileStore, store)
export const config = getModule(ConfigStore, store)
