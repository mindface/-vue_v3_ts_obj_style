<template>
  <div class="wrapper">
    <BaseNav v-if="this.$auth.$state.loggedIn" />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseNav from '../components/BaseNav.vue'

export default Vue.extend({
  components: {
    BaseNav
  }
})
</script>
