<template>
  <div class="home">
    <SgoEditor />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SgoEditor from '@/components/SgoEditor.vue'; // @ is an alias to /src

@Component({
  components: {
    SgoEditor,
  },
})
export default class Home extends Vue {}
</script>
