import { getterTree, mutationTree, actionTree } from 'typed-vuex';
import { MetaData,SendMetaData } from './interfaces'
import { ApiFetchGet } from '../api/http-client'
import $axios from '../plugins/axios'
import axios from 'axios'
// import axios from 'axios'

export const state = () => ({
  viewFieldId: 1,
  metaData:[{
    id: 0,
    agent_id: 0,
    title: "string",
    body: "string",
    category: "string",
    created_at: "2021-04-24T08:22:50.469Z",
    updated_at: "2021-04-24T08:22:50.469Z",
  }],
  memoryUpdateData: {
    id: 0,
    agent_id: 0,
    title: "string",
    body: "string",
    category: "string",
    created_at: "2021-04-24T08:22:50.469Z",
    updated_at: "2021-04-24T08:22:50.469Z",
  }
})

export const getters = getterTree(state, {
  viewClientData(state){
    return state.viewFieldId
  },
  reversedMetaData(state){
    return state.metaData
  },
  reversedUpdateMetaData(state){
    return state.memoryUpdateData
  },
})

export const mutations = mutationTree(state, {
  selectViewField(state, viewid:number) {
    state.viewFieldId = viewid;
  },
  setMetaData(state, data:MetaData[]) {
      state.metaData = data
  },
  setUpdatetMetaData(state, data:MetaData){
    state.memoryUpdateData = data
  },  
})

export const actions = actionTree({ state,getters,mutations},{
  selectViewFieldAction(context,viewId:number) {
    context.commit('selectViewField', viewId);
  },
  async setMetaAction(context) {
    const user_id = localStorage.getItem('user-id')
    const res = await axios.get(`http://localhost:3001/api/v1/meta?client_id=${user_id}`)
    if(res.status < 400) {
      context.commit('setMetaData',res.data);
    }
  },
  async setUpdateMetaAction(context,id:number) {
    const res = await axios.get(`http://localhost:3001/api/v1/meta/${id}`)
    if(res.status < 400) {
      context.commit('setUpdatetMetaData',res.data);
    }
  },
  async updateMetaAction(context,item:{itemId:number,data:MetaData}) {
    const putData = { memory: {
        agent_id: Number(localStorage.getItem('user-id')),
        title: item.data.title,
        body: item.data.body,
        category: item.data.category
    }}
    console.log(localStorage.getItem('user-id'))
    const res = await axios.put(`http://localhost:3001/api/v1/meta/${item.itemId}`,putData)
    if(res.status < 400) {
      context.dispatch('setUpdatetMetaData')
    }else {
      console.log('error | ',res)
    }
  },
  async addMetaAction(context,_sendData:SendMetaData) {
    const sendData = { memory: _sendData }
    const postData = { memory: {
        agent_id: Number(localStorage.getItem('user-id')),
        title: _sendData.title,
        body: _sendData.body,
        category: _sendData.category
    }}
    const res = await axios.post('http://localhost:3001/api/v1/meta',postData)
    if(res.status < 400) {
      context.dispatch('setMetaAction')
    }else {
      console.log('error | ',res)
    }
  },
  async deleteMetaAction(context,id:number) {
    const res = await axios.delete(`http://localhost:3001/api/v1/meta/${id}`)
    if(res.status < 400) {
      context.dispatch('setMetaAction')
    }else {
      console.log('error | ',res)
    }
  }
})

