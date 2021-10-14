<template>
	<files-container />
</template>

<script lang="ts">
	import Vue from 'vue'
	import FilesContainer from '../components/FilesContainer.vue'

	export default Vue.extend({
		name: 'Home',

		components: {
			FilesContainer,
		},
	})
</script>
