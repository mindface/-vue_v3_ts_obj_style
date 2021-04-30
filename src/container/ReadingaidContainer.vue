<template>
  <div class="container">
    <div class="readingaid-inner">
      <EditorReadaid edit-type="new" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import EditorReadaid from '../components/EditorReadaid.vue'

export default Vue.extend({
  components: {
    EditorReadaid
  }
})
</script>
