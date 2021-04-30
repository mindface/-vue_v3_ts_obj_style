<template>
  <el-card class="box-card report">
    <h2 class="report__title title"><i class="el-icon-share icon"></i>メンタリング</h2>
    <ul class="report--list">
      <li
        v-for="(item,index) in clientArticle"
        :key="index"
        class="report__item item d-flex"
        >
        <h3 class="title">{{item.title}}</h3>
        <div class="sentence">{{item.text}}</div>
      </li>
    </ul>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data(){
    return {
      clientArticle:[]
    }
  },
  mounted() {
    this.$nextTick( () => {
    });
  }
})
</script>
