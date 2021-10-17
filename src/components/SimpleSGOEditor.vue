<template>
	<div>
		<JsonEditor 
			v-model="json"
			@save="saveFile"
		/>
	</div>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Component, Model, Prop, Vue, Watch } from 'vue-property-decorator';
import { FileGroup } from '@/types/files';
import { ipcRenderer } from 'electron';
import JsonEditor from './JsonEditor.vue'

@Component({
	components: {
		JsonEditor,
	}
})
export default class SimpleSGOEditor extends Vue {
	@Prop() group!: FileGroup
	@Prop({ type: Boolean, default: false }) active!: boolean
	file = this.group?.files[0]
	json: string = this.group?.files[0]?.data || ""
	hasUnsavedChanges = false;

	mounted() {
		ipcRenderer.on('ui:saveFile', this.saveFile)
	}

	beforeUnmount() {
		ipcRenderer.removeListener('ui:saveFile', this.saveFile)
	}

	@Watch("group")
	onGroupChange() {
		this.file = this.group.files[0]
		this.json = this.group.files[0].data
	}

	get fileContents() {
		return this.file.data
	}

	saveFile() {
		if (!this.active) {
			return;
		}
		console.log('saving ' + this.file.name)

		// TODO: Only save when something's changed
		// TODO: update hasUnsavedChanges

		this.$store.commit('files/updateFile', { 
			file: this.file,
			data: this.json
		})
		this.$store.dispatch('files/saveFile', { 
			file: this.file
		})
	}
}
</script>
