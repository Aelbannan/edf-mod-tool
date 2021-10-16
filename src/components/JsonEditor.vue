<template>
	<pre
		ref="editor" 
		style="min-height: 100vh"
	/>
</template>

<script lang="ts">
// TODO: Split prism into own component
import 'reflect-metadata'
import { Component, Model, ModelSync, Prop, Vue, Watch } from 'vue-property-decorator';
//import 'ace-builds/webpack-resolver'
import ace, { Ace } from 'ace-builds'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-min-noconflict/theme-one_dark'
import 'ace-builds/src-min-noconflict/mode-json'


@Component({
	components: {
	}
})
export default class JsonEditor extends Vue {
	@ModelSync('json', 'change') jsonModel!: string
	@Prop() active!: boolean
	editor?: Ace.Editor

	mounted() {
		this.editor = ace.edit(this.$refs.editor as Element, {
			theme: "ace/theme/one_dark",
			mode: "ace/mode/json",
			minLines: 10,
			maxLines: Number.MAX_SAFE_INTEGER,
			fontSize: 16,
			showPrintMargin: false,
		})
		// Set JSON
		this.editor.setValue(this.jsonModel)
		// On save, send to parent
		this.editor.commands.addCommand({
			name: 'save',
			bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
			exec: this.onSave,
			readOnly: false
		})
	}

	getEditorJson(): string {
		const json = this.editor?.getValue()
		return json || ""
	}

	@Watch('jsonModel')
	onJsonChange() {
		const editorJson = this.getEditorJson();
		if (editorJson !== this.jsonModel) {
			console.log('update editor json')
			this.editor?.setValue(this.jsonModel)
		}
	}

	onSave() {
		this.jsonModel = this.getEditorJson()
		this.$emit('save')
	}
}
</script>
