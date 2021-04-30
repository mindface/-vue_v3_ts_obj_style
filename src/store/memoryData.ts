import { getterTree, mutationTree, actionTree } from 'typed-vuex';
import { MemoryData,SendMemoryData } from './interfaces'
import { ApiFetchGet } from '../api/http-client'
import $axios from '../plugins/axios'
import axios from 'axios'
// import axios from 'axios'

export const state = () => ({
  viewFieldId: 1,
  memoryData:[{
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
  reversedMemoryData(state){
    return state.memoryData
  },
  reversedUpdateMemoryData(state){
    return state.memoryUpdateData
  },
})

export const mutations = mutationTree(state, {
  selectViewField(state, viewid:number) {
    state.viewFieldId = viewid;
  },
  setMemoryData(state, data:MemoryData[]) {
      state.memoryData = data
  },
  setUpdatetMemoryData(state, data:MemoryData){
    state.memoryUpdateData = data
  },  
})

export const actions = actionTree({ state,getters,mutations},{
  selectViewFieldAction(context,viewId:number) {
    context.commit('selectViewField', viewId);
  },
  async setMemoryAction(context) {
    const user_id = localStorage.getItem('user-id')
    const res = await axios.get(`http://localhost:3001/api/v1/memories?client_id=${user_id}`)
    if(res.status < 400) {
      context.commit('setMemoryData',res.data);
    }
  },
  async setUpdateMemoryAction(context,id:number) {
    const res = await axios.get(`http://localhost:3001/api/v1/memories/${id}`)
    if(res.status < 400) {
      context.commit('setUpdatetMemoryData',res.data);
    }
  },
  async updateMemoryAction(context,item:{itemId:number,data:MemoryData}) {
    const putData = { memory: {
        // uid:localStorage.getItem('uid'),
        // "access-token":localStorage.getItem('access-token'),
        // client:localStorage.getItem('client'),
        agent_id: Number(localStorage.getItem('user-id')),
        title: item.data.title,
        body: item.data.body,
        category: item.data.category
    }}
    console.log(localStorage.getItem('user-id'))
    const res = await axios.put(`http://localhost:3001/api/v1/memories/${item.itemId}`,putData)
    if(res.status < 400) {
      context.dispatch('setUpdatetMemoryData')
    }else {
      console.log('error | ',res)
    }
  },
  async postMemoryAction(context,_sendData:SendMemoryData) {
    const sendData = { memory: _sendData }
    const postData = { memory: {
        // uid:localStorage.getItem('uid'),
        // "access-token":localStorage.getItem('access-token'),
        // client:localStorage.getItem('client'),
        agent_id: Number(localStorage.getItem('user-id')),
        title: _sendData.title,
        body: _sendData.body,
        category: _sendData.category
    }}
    console.log(localStorage.getItem('user-id'))
    const res = await axios.post('http://localhost:3001/api/v1/memories',postData)
    if(res.status < 400) {
      context.dispatch('setMemoryAction')
    }else {
      console.log('error | ',res)
    }
  },
  async deleteMemoryAction(context,id:number) {
    const res = await axios.delete(`http://localhost:3001/api/v1/memories/${id}`)
    if(res.status < 400) {
      context.dispatch('setMemoryAction')
    }else {
      console.log('error | ',res)
    }
  }
})

