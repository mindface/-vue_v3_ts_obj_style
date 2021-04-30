<template>
  <div class="container">
    <div class="dashboard-inner">
      <div class="side-content content">
        <draggable
          :options="{group:'group',animation:300}"
          group="block"
          @end="draggableEnd"
          class="block-card"
          data-group="1">
            <div class="card">
              <DashboardBoxTeachers />
            </div>
            <div class="card">
              <DashboardBoxMyData />
            </div>
        </draggable>
      </div>
      <div class="main-content content">
        <draggable
          :options="{group:'group',animation:300}"
          group="block"
          @end="draggableEnd"
          class="block-card d-flex"
          data-group="2">
              <div class="card">
                <DashboardBoxArticle />
              </div>
              <div class="card">
                <DashboardBoxMemory />
              </div>
        </draggable>
      </div>
      <div class="main-content content">
        <draggable
          :options="{group:'group',animation:300}"
          group="block"
          @end="draggableEnd"
          class="block-card d-flex"
          data-group="3">
            <div class="card">
              <DashboardBoxUpdate />
            </div>
            <div class="card">
              <DashboardBoxUsers />
            </div>
        </draggable>
       </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BlockIcon from '../components/BlockIcon.vue'
import DashboardBoxArticle from '../components/DashboardBoxArticle.vue'
import DashboardBoxUsers from '../components/DashboardBoxUsers.vue'
import DashboardBoxMemory from '../components/DashboardBoxMemory.vue'
import DashboardBoxTeachers from '../components/DashboardBoxTeachers.vue'
import DashboardBoxUpdate from '../components/DashboardBoxUpdate.vue'
import DashboardBoxMyData from '../components/DashboardBoxMyData.vue'
import draggable from 'vuedraggable'

export default Vue.extend({
  components: {
    BlockIcon,
    DashboardBoxArticle,
    DashboardBoxMemory,
    DashboardBoxUpdate,
    DashboardBoxTeachers,
    DashboardBoxMyData,
    draggable
  },
  data(){
    return {
      dataListSub: [
        { title:'01',id:1,body:'text',datatype:1 },
        { title:'02',id:2,body:'text',datatype:2 },
      ],
      dataListViewTop: [
        { title:'01',id:3,body:'text',datatype:3 },
        { title:'02',id:4,body:'text',datatype:4 },
      ],
      dataListViewMiddle: [
        { title:'01',id:5,body:'text',datatype:5 },
        { title:'02',id:6,body:'text',datatype:6 },
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
