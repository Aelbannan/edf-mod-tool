<template>
	<v-app>
		<FilesContainer />
	</v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import FilesContainer from '@/components/FilesContainer.vue'

@Component({
	components: {
		FilesContainer,
	}
})
export default class App extends Vue {
	mounted() {
		console.log(this.$store)
	}
}
</script>
