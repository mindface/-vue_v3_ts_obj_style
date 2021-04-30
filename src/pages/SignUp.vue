<template>
  <div class="page">
    <div class="login d-flex-c">
      <el-card class="box-card">
        <div class="login-form">
          <h2 class="form__title">Login</h2>
          <div class="form__field">
            <p class="label">email</p>
            <el-input placeholder="email" v-model="email"></el-input>
          </div>
          <div class="form__field">
            <p class="label">password</p>
            <el-input placeholder="password" v-model="password"></el-input>
          </div>
          <div class="form__field form__field--btn">
            <el-button type="primary" @click="submitAction">ログイン</el-button>
            <el-button type="primary" @click="">re</el-button>
            <el-button type="primary" @click="logoutAction">ログイン</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    submitAction(e:MouseEvent){
      e.preventDefault();
      // this.loginAuth()
    },
    async loginAuth(){
      // this.$axios.post('http://localhost:3001/api/v1/auth/sign_in',{
      //     email: this.email,
      //     password: this.password,
      //   })
      // await this.$auth.loginWith('local', {
      //   data:{
      //     email: this.email,
      //     password: this.password
      //   }
      // })
      // .then( (response:any) => {
      //   console.log(response)
      //   return response
      // }, (error) => {
      //   console.log(error)
      // })
    },
    async logoutAction(){
      // await this.$auth.logout()
    }
  }
})
</script>