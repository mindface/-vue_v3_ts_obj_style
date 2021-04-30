<template>
  <el-card class="box-card client">
    <h2 class="client__title title">
      <nuxt-link to="/readingaid">
        <i class="el-icon-tickets icon"></i>
      </nuxt-link>
    リーディングリスト</h2>
    <ul class="client--list">
      <li
        v-for="(item,index) in readaidData"
        :key="index"
        class="client__item item d-flex"
        >
          <nuxt-link :to="`/readaid/`+item.id">
            <h3 class="title">{{item.title}}</h3>
            <div class="sentence">
              {{item.body}}
            </div>
          </nuxt-link>
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
    readaidData(){
      console.log(this.$accessor.readaidData.reversedReadiadData);
      return this.$accessor.readaidData.reversedReadiadData ? this.$accessor.readaidData.reversedReadiadData : []
    }
  },
  mounted() {
    this.$nextTick( () => {
      this.$accessor.readaidData.setReadaidAction()
    })
  }
})
</script>
