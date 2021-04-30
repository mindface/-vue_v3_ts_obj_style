<template>
  <li class="item d-flex">
    <h3 class="title">{{item.title}}</h3>
    <div class="sentence">{{item.body}}</div>
    <div class="btns">
      <el-button
        circle
        size="mini"
        @click="fadeAction" ><i class="el-icon-more"></i>
      </el-button>
      <transition name="fade">
        <div v-if="btnSwitch"><ItemBtns :editor-type="editorType" :item-id="item.id" /></div>
      </transition>
    </div>
  </li>
</template>

<script>
import Vue from 'vue'
import ItemBtns from './ItemBtns.vue'

export default Vue.extend({
  components: {
    ItemBtns
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    editorType: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      btnSwitch: false
    }
  },
  methods: {
    fadeAction(){
      this.btnSwitch = !this.btnSwitch
    }
  },
})
</script>