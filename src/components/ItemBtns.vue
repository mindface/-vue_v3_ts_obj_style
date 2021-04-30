<template>
  <div class="item-btns">
    <el-button
      circle
      size="mini"
      @click="viewAction" ><i class="el-icon-notebook-2"></i>
    </el-button>
    <el-button
      circle
      size="mini"
      @click="editAction" ><i class="el-icon-edit"></i>
    </el-button>
    <el-button
      circle
      size="mini"
      @click="deleteAction" ><i class="el-icon-delete"></i>
    </el-button>
    <DialogArticleEditor v-if="editorType === 'article'" ref="editor" edit-type="update" :item-id="itemId" />
    <DialogMemoryEditor v-if="editorType === 'memory'" ref="editor" edit-type="update" :item-id="itemId" />
  </div>
</template>

<script>
import Vue from 'vue'
import DialogArticleEditor from './DialogArticleEditor.vue'
import DialogMemoryEditor from './DialogMemoryEditor.vue'

export default Vue.extend({
  components: {
    DialogMemoryEditor,
    DialogArticleEditor
  },
  data() {
    return {
    };
  },
  props: {
    itemId: {
      type: Number,
      required: true
    },
    editorType: {
      type: String,
      required: true
    },
  },
  methods: {
    viewAction(){},
    editAction(){
      console.log(this.itemId);
      this.$refs.editor.dialogFormVisible = true
    },
    deleteAction(){
      switch (this.editorType) {
        case 'article':
          this.$accessor.metaData.deleteMetaAction(this.itemId)
          break;
        case 'memory':
          this.$accessor.memoryData.deleteMemoryAction(this.itemId)
          break;
      }
    },
  },
})
</script>