<template>
  <div class="page">
    <DashbordContainer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DashbordContainer from '../container/DashbordContainer.vue'

export default Vue.extend({
  components: {
    DashbordContainer
  }
})
</script>
