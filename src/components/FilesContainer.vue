<template>
	<div>
		<v-app-bar app>
			<v-tabs 
				v-model="activeTabIndex"
				background-color="indigo"
				dark
				fixed-tabs
				:centered="false"
				align-with-title
			>
				<v-tab
					v-for="(group, index) in $store.state.files.groups"
					:key="index"
				>
					{{group.files[0].name}}
				</v-tab>
			</v-tabs>
		</v-app-bar>

		<v-main app>
			<v-tabs-items
				v-model="activeTabIndex"
			>
				<v-tab-item
					v-for="(group, index) in $store.state.files.groups"
					:key="index"
				>
					<SimpleSGOEditor 
						:group="group" 
						:active="index === activeTabIndex"
					/>
				</v-tab-item>
			</v-tabs-items>
		</v-main>
	</div>
</template>

<script lang="ts">
import { File } from '@/types/files';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import SimpleSGOEditor from './SimpleSGOEditor.vue'

@Component({
	components: {
		SimpleSGOEditor,
	}
})
export default class FilesContainer extends Vue {
	activeTabIndex = 0

	@Watch("$store.state.files.activeGroupIndex")
	onActiveGroupChange(index: number) {
		this.activeTabIndex = index
	}
}
</script>
