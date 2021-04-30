<template>
  <div class="container">
    <BlockIcon />
    <div class="dashboard">
      <div class="side-content">
        <draggable
          :options="{group:'group',animation:300}"
          group="block"
          @end="draggableEnd"
          class="block-card"
          data-group="2"
          v-model="dataListSub">
            <div
              class="card"
              v-for="element in dataListSub"
              :key="element.id">
              <el-card class="box-card">
                {{element.title}}
              </el-card>
            </div>
        </draggable>
      </div>

      <div class="main-content content">
        <draggable
          :options="{group:'group',animation:300}"
          group="block"
          @end="draggableEnd"
          class="block-card d-flex"
          data-group="2"
          v-model="dataListView">
              <div
              class="card"
              v-for="element in dataListView" 
              key="element.id">
                <el-card class="box-card">
                  {{element.title}}
                </el-card>
              </div>
          </draggable>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BlockIcon from '../components/BlockIcon.vue'
import draggable from 'vuedraggable'

export default Vue.extend({
  components: {
    BlockIcon,
    draggable
  },
  data(){
    return {
      dataListSub: [
        { title:'01',id:1,body:'text',datatype:1 },
        { title:'02',id:2,body:'text',datatype:2 },
        { title:'03',id:3,body:'text',datatype:3 }
      ],
      dataListView: [
        { title:'01',id:1,body:'text',datatype:4 },
        { title:'02',id:2,body:'text',datatype:5 },
        { title:'03',id:3,body:'text',datatype:5 }
      ],
    }
  },
  methods: {
    draggableEnd(e:any){
      console.log(e)
    }
  },
})
</script>
