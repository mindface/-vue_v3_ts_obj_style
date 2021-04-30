<template>
  <div class="nav-box">
    <div class="nav-btn">
      <el-button @click="drawer = true" style="margin-left: 16px;">
        <i class="el-icon-menu"></i>
      </el-button>
    </div>
    <el-drawer
      title="I am the title"
      :visible.sync="drawer"
      :with-header="false">
      <nav class="nav">
        <ul class="nav-list">
          <li class="nav-item" @click="drawer = false">
            <span class="link">close</span>
          </li>
          <li class="nav-item" @click="logoutAction">
            <span class="link">ログアウト</span>
          </li>
          <li class="nav-item">
            <nuxt-link class="link" to="/dashbord">ダッシュボード</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="link" to="/readingaid">教材コンテンツ追加</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="link" to="/PlayerRegistration">プレイヤー登録</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="link" to="/info">info</nuxt-link>
          </li>
        </ul>
      </nav>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      drawer: false,
    }
  },
  methods: {
    logoutAction(){
      this.$auth.logout()
      location.reload()
    }
  }
})
</script>
