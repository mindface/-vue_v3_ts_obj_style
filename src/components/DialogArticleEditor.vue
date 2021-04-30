<template>
  <div class="dialog-view">
    <el-dialog :visible.sync="dialogFormVisible">
      <div class="dialog-field">
        <h3 class="title">新規追加</h3>
        <div class="field">
          <el-input
            placeholder="Please title"
            v-model="itemData.title"
            clearable>
          </el-input>
        </div>
        <div class="field">
          <el-input
            placeholder="Please category"
            v-model="itemData.category"
            clearable>
          </el-input>
        </div>
        <div class="field">
          <el-tiptap
            v-model="itemData.textarea"
            :extensions="extensions"
          />
        </div>
        <div class="field">
          <el-button v-if="editType === 'update'" type="primary" @click="updateDataAction">送信</el-button>
          <el-button v-else type="primary" @click="sendDataAction">送信</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'

import {
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  CodeView,
  OrderedList,
  ElementTiptap,
  ElementTiptapPlugin } from 'element-tiptap';
import 'element-tiptap/lib/index.css';
Vue.use(ElementTiptapPlugin);

export default Vue.extend({
    components: {
      'el-tiptap': ElementTiptap,
    },
    props: {
      itemId: {
        type: Number
      },
      editType: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        dialogFormVisible: false,
        viewBtn: false,
        title: '',
        category: '',
        textarea: '',
        extensions: [
          new Doc(),
          new Text(),
          new Paragraph(),
          new Heading({ level: 5 }),
          new Bold({ bubble: true }), 
          new Underline({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
          new Italic(),
          new Strike(),
          new ListItem(),
          new BulletList(),
          new OrderedList(),
          new CodeView(),
        ],
        content: `
          <p>入力してください。</p>
        `,
      };
    },
    computed: {
      itemData() {
        if(this.editType === 'update'){
          const item = this.$accessor.metaData.reversedUpdateMetaData
          return {
            title: item.title,
            category: item.category,
            textarea: item.body,
          }
        }
        return {
          title: this.title,
          category: this.category,
          textarea: this.textarea,
        }
      }
    },
    mounted() {
      this.$nextTick( () => {
        if(this.editType === 'update'){
          this.$accessor.metaData.setUpdateMetaAction(this.itemId)
        }else {
          this.viewBtn = true
        }
      })
    },
    methods: {
      sendDataAction(){
        const sendData = {
          title: this.title,
          body: this.textarea,
          category: this.category
        }
        console.log(sendData)
        this.$accessor.metaData.addMetaAction(sendData)
        this.title = ''
        this.textarea = ''
        this.category = ''
        this.dialogFormVisible = false
      },
      updateDataAction(){
        const sendData = {
          itemId: this.itemId,
          data :{
            title: this.title,
            body: this.textarea,
            category: this.category
          }
        }
        this.$accessor.metaData.updateMetaAction(sendData)
        this.title = ''
        this.textarea = ''
        this.category = ''
        this.dialogFormVisible = false
      }
    },
  });
</script>