import { getterTree, mutationTree, actionTree } from 'typed-vuex';
import { userData } from './interfaces'
import axios from 'axios'
import { ApiFetchGet,ApiFetch } from '../api/http-client'

export const state = () => ({
  viewFieldId: 1,
  userInfo: {
    role: '',
    email: '',
    name: ''
  },
  signinData:{
    client: "",
    "access-token":"",
    uid:"",
  }
})

export const getters = getterTree(state, {
  viewClientData(state){
    return state.viewFieldId
  },
  reversedUserData(state){
    return state.userInfo
  },
  reversedLoginUserData(state){
    return state.signinData
  }
})

export const mutations = mutationTree(state, {
  selectViewField(state, viewid:number) {
    state.viewFieldId = viewid;
  },
  setUserData(state, data:userData) {
    state.userInfo = data
  },
  loginUserData(state, data:userData) {
    state.userInfo = data
  },
})

export const actions = actionTree({ state,getters,mutations},{
  selectViewFieldAction(context,viewId:number) {
    context.commit('selectViewField', viewId);
  },
  getUserAction(context):void {
    const FetachD = new ApiFetchGet('')
    FetachD.init().then(res => {
      const data = res.result
    });
  },
  setUserAction(context,data:userData):void {
    context.commit('setUserData',data);
  },
  async loginUserAction(context,data:{email:string,password:string}) {
    try {
      const FetachD = new ApiFetch('http://localhost:3001/api/v1/auth/sign_in',data)
      FetachD.init().then(res => {
        const data = res.result
      });
      const res = await axios.post('http://localhost:3001/api/v1/auth/sign_in',data)
      console.log(res)
      context.commit('loginUserData',res.data);
    } catch (error) {
      console.log(error)
    }
  }
})

