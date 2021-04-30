<template>
  <el-card class="box-card myinfo">
    <h2 class="myinfo__title title"><i class="el-icon-user-solid icon"></i>マイ情報</h2>
    <ul class="myinfo--list">
      <li class="myinfo__item item">
        <h3 class="title">{{userData.name}}</h3>
      </li>
      <li class="myinfo__item item">
        {{userData.email}}
      </li>
    </ul>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed:{
    userData(){
      return this.$accessor.userData.reversedUserData ? this.$accessor.userData.reversedUserData : { role: 'loading', email: 'loading', name: 'loading'}
    }
  },
  mounted() {
    this.$nextTick( () => {
    });
  }
})
</script>
