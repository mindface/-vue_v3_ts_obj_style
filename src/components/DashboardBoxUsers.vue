<template>
  <el-card class="box-card client">
    <h2 class="client__title title"><i class="el-icon-document icon"></i>プレイヤー情報</h2>
    <ul class="client--list">
      <li
        v-for="(item,index) in clientData"
        :key="index"
        class="client__item item d-flex"
        >
          <h3 class="title">{{item.name}}</h3>
          <div class="sentence">
            {{item.text}}
          </div>
        </li>
    </ul>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data(){
    return {
      clientData:[]
    }
  },
  computed:{
    userData(){
      return this.$accessor.userData ? this.$accessor.userData.userInfo : { role: 'loading', email: 'loading', name: 'loading'}
    }
  },
  mounted() {
    this.$nextTick( () => {
    });
  }
})
</script>
