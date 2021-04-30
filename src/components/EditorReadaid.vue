<template>
  <div class="dialog-view">
      <div class="dialog-field">
        <h3 class="title">新規追加</h3>
        <div class="field">
          <el-input
            placeholder="Please title"
            v-model="title"
            clearable>
          </el-input>
        </div>
        <DialogMedia />
        <div class="field">
          <el-input
            placeholder="Please category"
            v-model="category"
            clearable>
          </el-input>
        </div>
        <div class="field">
          <el-tiptap
            v-model="textarea"
            :extensions="extensions"
          />
        </div>
        <div class="field">
          <el-button type="primary" @click="sendDataAction">送信</el-button>
        </div>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'

import { 
  ElementTiptap,
  ElementTiptapPlugin,
  Doc,
  Text,
  Paragraph,
  Heading,
  Blockquote,
  CodeBlock,
  HardBreak,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  SelectAll,
  FontSize,
  Print,
  HorizontalRule,
  Image,
  CodeView,
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'
import DialogMedia from './DialogMedia.vue'

import codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css' 
import 'codemirror/mode/xml/xml.js' 
import 'codemirror/addon/selection/active-line.js' 
import 'codemirror/addon/edit/closetag.js'

Vue.use(ElementTiptapPlugin, {
        lang: "ja",
        spellcheck: true,
      })

export default Vue.extend({
    components: {
      'el-tiptap': ElementTiptap,
      DialogMedia
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
        new Underline({ bubble: true, menubar: false }),
        new Italic(),
        new Strike(),
        new HorizontalRule(),
        new Blockquote(),
        new CodeBlock(),
        new HardBreak(),
        new BulletList(),
        new OrderedList(),
        new ListItem(),
        new TodoItem(),
        new TodoList(),
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new Strike(),
        new History(),
        new SelectAll(),
        new FontSize(),
        new Print(),
        new Image(),
        new CodeView({
          codemirror,
          codemirrorOptions: {
            styleActiveLine: true,
            autoCloseTags: true,
          },
        }),
        ],
        content: `
          <p>入力してください。</p>
        `,
      }
    },
    computed: {
      itemData() {
        if(this.editType === 'update'){
          const item = this.$accessor.memoryData.reversedUpdateMemoryData
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
          this.$accessor.readaidData.setUpdateReadaidDataAction(this.itemId)
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
        this.$accessor.readaidData.addReadaidAction(sendData)
        this.title = ''
        this.textarea = ''
        this.category = ''
        
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
        this.$accessor.readaidData.updateReadaidAction(sendData)
        this.title = ''
        this.textarea = ''
        this.category = ''
      },
      update(editor){
        console.log(editor)
      }
    },
  })
</script>