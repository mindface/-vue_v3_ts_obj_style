<template>
  <div class="field">
    <el-tiptap
      v-model="itemData.textarea"
      :extensions="extensions"
    />
  </div>
  </div>
</template>

<script>
import Vue from 'vue'

import {
  // necessary extensions
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
  OrderedList,
} from 'element-tiptap';
import { ElementTiptap,ElementTiptapPlugin } from 'element-tiptap';
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
          new Bold({ bubble: true }), // render command-button in bubble menu.
          new Underline({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
          new Italic(),
          new Strike(),
          new ListItem(),
          new BulletList(),
          new OrderedList(),
        ],
        content: `
          <p>入力してください。</p>
        `,
      };
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
          this.$accessor.memoryData.setUpdateMemoryAction(this.itemId)
        }else {
          this.viewBtn = true
        }
      })
    },
    methods: {
    },
  });
</script>