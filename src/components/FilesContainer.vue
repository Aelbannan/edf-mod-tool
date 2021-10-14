<template>
	<div>
		<v-tabs>
			<v-tab
				v-for="file in $store.state.files.activeFiles"
				:key="file.path"
			>
				{{file.name}}
			</v-tab>
		</v-tabs>
	</div>
</template>

<script lang="ts">
import { File } from '@/types/files';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class FilesContainer extends Vue {
	@Prop() openFile!: File

	@Watch('openFile')
	openOrSwitchToFile(file: File) {
		console.log("WOW")
	}

}
</script>
