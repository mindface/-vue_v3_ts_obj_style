<template>
  <el-card class="box-card memory">
  　<div class="memory__header">
      <h2 class="title"><i class="el-icon-view icon"></i>行動記録[事実ベース]</h2>
      <DialogMemoryEditor edit-type="new" />
    </div>
    <ul class="memory--list list">
      <ListItem
        v-for="(item,index) in memoryData"
        :key="index"
        :item="item"
        editor-type="memory" />
    </ul>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import ListItem from './ListItem.vue'
import DialogMemoryEditor from './DialogMemoryEditor.vue'

export default Vue.extend({
  components: {
    ListItem,
    DialogMemoryEditor
  },
  computed: {
    memoryData(){
      return this.$accessor.memoryData.reversedMemoryData ? this.$accessor.memoryData.reversedMemoryData : []
    }
  },
  mounted() {
    this.$nextTick( () => {
      this.$accessor.memoryData.setMemoryAction()
    });
  },
  methods: {
  },
})
</script>
