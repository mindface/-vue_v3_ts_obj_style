<template>
  <div class="dialog-media">
    <div>
    　<el-button type="text" @click="dialogFormVisible = true">
        メディア<i class="el-icon-picture-outline"></i>
      </el-button>
    </div>
    <el-dialog :visible.sync="dialogFormVisible">
      <div class="dialog-field dialog-field--media">
        <h3 class="title">新規追加</h3>
        <div class="field field--media">
          <ul class="media--list">
            <li class="media__item" v-for="item in itemData" >
              <img :src="$config.baseURL+'/'+item.image_path" :alt="item.caption" class="img">
              <p class="icons d-flex-c">
                <el-button
                  type="primay"
                  icon="el-icon-paperclip"
                  circle
                  @click="handleCopy($config.baseURL+'/'+item.image_path)"
                  ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="handleDelete(item.id)"
                  ></el-button>
              </p>
            </li>
          </ul>
        </div>
        <div class="field">
          <el-input
            placeholder="Please category"
            v-model="caption"
            clearable>
          </el-input>
        </div>
        <div class="field">
          <el-upload
            ref="upload"
            action=""
            :on-change="uploadAction"
            :auto-upload="false"
            list-type="picture-card"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <div class="field">
          <button type="primary" ref="uploadBtn" @click="sendAction">アップロード</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data() {
      return {
        dialogFormVisible: false,
        fileData: "",
        dialogImageUrl: '',
        dialogVisible: false,
        caption: ''
      };
    },
    computed: {
      itemData() {
        return this.$accessor.readaidData.reversedReadiadImageData
      }
    },
    mounted() {
      this.$nextTick( () => {
        this.$accessor.readaidData.setReadaidImageAction()
      })
    },
    methods: {
      updateDataAction(){
      },
      handleRemove() {
      },
      handleDelete(id:number){
        this.$accessor.readaidData.deleteReadaidImageAction(id)
      },
      handleCopy(url:string) {
        console.log(url);
        navigator.clipboard.writeText(url).then(e => {
           alert('画像パスをコピーしました。')
        })
      },
      uploadAction(file:any){
        const btn = this.$refs.uploadBtn as HTMLButtonElement
        btn.addEventListener('click', () => {
          const sendData = {caption:this.caption,fileData:file.raw}
          this.$accessor.readaidData.addReadaidImageAction(sendData)
        })
      },
      sendAction(){
        const form = this.$refs.form
        const config = { headers: {
            'Content-type':'multipart/form-data',
            'Access-Control-Allow-Origin':'*',
        }}        
        // this.$axios.put('http://localhost:3001/api/v1/readaid_imagers',this.fileData,config)
      }
    },
  })
</script>