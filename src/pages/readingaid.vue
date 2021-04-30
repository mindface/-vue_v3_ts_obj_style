<template>
  <div class="page">
    <div class="readingaid">
      <ReadingaidContainer />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ReadingaidContainer from '../container/ReadingaidContainer.vue'

export default Vue.extend({
  components: {
    ReadingaidContainer
  }
})
</script>