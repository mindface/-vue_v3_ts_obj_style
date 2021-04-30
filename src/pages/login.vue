<template>
  <div class="page">
    <div class="login sign-up d-flex-c">
      <el-card class="box-card">
        <div class="login-form">
          <h2 class="form__title">Login</h2>
          <div class="form__field">
            <p class="label">メール</p>
            <el-input placeholder="email" v-model="email"></el-input>
          </div>
          <div class="form__field">
            <p class="label">パスワード</p>
            <el-input placeholder="password" v-model="password"></el-input>
          </div>
          <p v-if="confirmation">パスワードもしくはメールアドレスが異なります。</p>
          <div class="form__field form__field--btn">
            <el-button type="primary" @click="submitAction">ログイン</el-button>
          </div>
          <div v-if="false" class="form__field">
            <p class="text" @click="changeBlock">新規登録</p>
          </div>
        </div>
      </el-card>
      <el-card v-if="false" class="box-card">
        <div class="sign-up-form">
          <h2 class="form__title">Sign Up</h2>
          <div class="form__field">
            <p class="label">メール</p>
            <el-input placeholder="email" v-model="email"></el-input>
          </div>
          <div class="form__field">
            <p class="label">パスワード</p>
            <el-input placeholder="password" v-model="password"></el-input>
          </div>
          <div class="form__field">
            <p class="label">パスワード確認</p>
            <el-input placeholder="password_confirmation" v-model="password_confirmation"></el-input>
          </div>
          <div class="form__field">
            <p class="label">ネーム</p>
            <el-input placeholder="password" v-model="name"></el-input>
          </div>
          <div class="form__field">
            <p class="label">サブネーム</p>
            <el-input placeholder="nickname" v-model="nickname"></el-input>
          </div>
          <div class="form__field">
            <p class="label">登録カテゴリ</p>
            <el-select v-model="value" placeholder="Select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
              </el-option>
            </el-select>
            <el-input placeholder="nickname" v-model="nickname"></el-input>
          </div>
          <div class="form__field form__field--btn">
            <el-button type="primary" @click="submitAction">登録</el-button>
          </div>
          <div class="form__field">
            <p class="text" @click="changeBlock">戻る</p>
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
      viewBlock: true,
      email: '',
      password: '',
      password_confirmation: '',
      name:'',
      nickname:"",
      options: [{
        value: 'コーチ',
        label: 'admin'
      }, {
        value: 'プレイヤー',
        label: 'player',
      }, {
        value: 'アドバイザー',
        label: 'advisor'
      }],
      value: '',
      confirmation: false,
    }
  },
  methods: {
    submitAction(e:MouseEvent){
      e.preventDefault();
      // const sendData = {
      //     email: this.email,
      //     password: this.password
      //   }
      // this.$accessor.userData.loginUserAction(sendData)
      this.loginAuth()
    },
    re(){
    },
    changeBlock(){
      this.viewBlock = !this.viewBlock
    },
    async loginAuth(){

      await this.$auth.loginWith('local', {
        data:{
          email: this.email,
          password: this.password
        }
      })
      .then( (response:any) => {
        console.log(response.headers)
        const item = response.data.data
        const sendData = {
          role: item.role,
          email: item.email,
          name: item.name
        }
        localStorage.setItem("access-token",response.headers["access-token"])
        localStorage.setItem("client",response.headers.client)
        localStorage.setItem("uid",item.uid)
        this.$accessor.userData.setUserAction(sendData)
        this.confirmation = false
        return response
      }, (error) => {
        console.log(error)
        this.confirmation = true
      })
    },
    async logoutAction(){
      await this.$auth.logout()
    }
  }
})
</script>