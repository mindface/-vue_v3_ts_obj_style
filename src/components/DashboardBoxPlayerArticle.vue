<template>
  <el-card class="box-card artice">
  　<div class="memory__header">
      <h2 class="title"><i class="el-icon-view icon"></i>メンタリング</h2>
      <DialogArticleEditor edit-type="new" />
    </div>
    <h2 class="artice__title title"><i class="el-icon-share icon"></i>メンタリング</h2>
    <ul class="artice--list list">
      <ListItem
        v-for="(item,index) in memoryData"
        :key="index"
        :item="item"
        editor-type="article"
        />
    </ul>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import ListItem from './ListItem.vue'
import DialogArticleEditor from './DialogArticleEditor.vue'

export default Vue.extend({
  components: {
    ListItem,
    DialogArticleEditor
  },
  data(){
    return {
      clientArticle:[]
    }
  },
  computed: {
    memoryData(){
      return this.$accessor.metaData.reversedMetaData ? this.$accessor.metaData.reversedMetaData : []
    }
  },
  mounted() {
    this.$nextTick( () => {
      this.$accessor.metaData.setMetaAction()
    });
  }
})
</script>
