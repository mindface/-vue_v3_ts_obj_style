<template>
  <div class="page">
    <div class="dashboard">
      <DashbordContainer v-if="viewSwitch === 'onwer'" />
      <DashbordPlayerContainer v-else />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DashbordContainer from '../container/DashbordContainer.vue'
import DashbordPlayerContainer from '../container/DashbordPlayerContainer.vue'

export default Vue.extend({
  components: {
    DashbordContainer,
    DashbordPlayerContainer
  },
  data(){
    return {
      viewSwitch: ''
    }
  },
  mounted() {
    this.viewSwitch = this.$accessor.userData.reversedUserData.role
  },
})
</script>
