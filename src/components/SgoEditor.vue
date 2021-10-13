<template>
	<div>
		<div>
			<input type="file" id="file" @change="onInputChange">
			Open file: {{ filepath }}
		</div>

		<div>
			<button @click="saveToSGO">
				Save to SGO
			</button>
		</div>

		<div>
			<prism-editor v-model="json" :highlight="highlighter" line-numbers :tabSize="4" :insertSpaces="false"></prism-editor>
		</div>
	</div>
</template>

<script lang="ts">
import { convertSgoToJson, saveJsonAsSgo } from '@/lib/sgo';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
// @ts-expect-error: Not picking up @types/prismjs
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css'; 

@Component({
	components: {
		PrismEditor,
	}
})
export default class SgoEditor extends Vue {
	filename = ""
	filepath = ""
	json = ""

	async onInputChange(event: any) {
		const { name, path } = event.target.files[0];
		this.filename = name;
		this.filepath = path;
		this.json = await convertSgoToJson(name, path);
	}

	async saveToSGO() {
		await saveJsonAsSgo(this.filename, this.filepath, this.json)
		alert('Saved successfully')
	}

	highlighter() {
		return highlight(this.json, languages.json)
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
