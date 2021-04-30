<template>
  <el-card class="box-card client">
    <h2 class="client__title title"><i class="el-icon-edit-outline icon"></i>プレイヤー更新データ</h2>
    <ul class="client--list">
      <li
        v-for="(item,index) in clientData"
        :key="index"
        class="client__item item d-flex"
        >
          <h3 class="title">{{item.name}}</h3>
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
  mounted() {
    this.$nextTick( () => {
    });
  }
})
</script>
