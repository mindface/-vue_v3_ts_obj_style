import { getterTree, mutationTree, actionTree } from 'typed-vuex';
import { ReadaidData,SendReadaidData,ReadaidImageData } from './interfaces'
import $axios from '../plugins/axios'
import axios from 'axios'
import fs from 'fs'

export const state = () => ({
  viewFieldId: 1,
  readaidData:[{
    id: 0,
    reedtag_id: 0,
    title: "string",
    body: "string",
    created_at: "2021-04-24T08:22:50.469Z",
    updated_at: "2021-04-24T08:22:50.469Z",
  }],
  readaidUpdateData: {
    id: 0,
    reedtag_id: 0,
    title: "string",
    body: "string",
    created_at: "2021-04-24T08:22:50.469Z",
    updated_at: "2021-04-24T08:22:50.469Z",
  },
  readaidImageData:[
    { 
      id:0,
      caption:"string",
      image_path: 'string',
    }
  ]
})

export const getters = getterTree(state, {
  viewClientData(state){
    return state.viewFieldId
  },
  reversedReadiadData(state){
    return state.readaidData
  },
  reversedReadiadImageData(state){
    return state.readaidImageData
  },
  reversedUpdateReadiadData(state){
    return state.readaidUpdateData
  },
})

export const mutations = mutationTree(state, {
  selectViewField(state, viewid:number) {
    state.viewFieldId = viewid;
  },
  setReadaidData(state, data:ReadaidData[]) {
    state.readaidData = data
  },
  setReadaidImageData(state, data:ReadaidImageData[]) {
    state.readaidImageData = data
  },
  setUpdatetReadaidData(state, data:ReadaidData){
    state.readaidUpdateData = data
  },
})

export const actions = actionTree({ state,getters,mutations},{
  selectViewFieldAction(context,viewId:number) {
    context.commit('selectViewField', viewId);
  },
  async setReadaidAction(context) {
    const user_id = localStorage.getItem('user-id')
    const res = await axios.get(`http://localhost:3001/api/v1/readaids`)
    if(res.status < 400) {
      context.commit('setReadaidData',res.data);
    }
  },
  async setUpdateReadaidAction(context,id:number) {
    const res = await axios.get(`http://localhost:3001/api/v1/readaids/${id}`)
    if(res.status < 400) {
      context.commit('setUpdatetReadaidData',res.data);
    }
  },
  async setReadaidImageAction(context) {
    const res = await axios.get(`http://localhost:3001/api/v1/readaid_imagers`)
    if(res.status < 400) {
      context.commit('setReadaidImageData',res.data);
    }
  },
  async updateReadaidAction(context,item:{itemId:number,data:ReadaidData}) {
    const putData = { readaid: {
      title: item.data.title,
      body: item.data.body,
      reedtag_id: item.data.reedtag_id
    }}
    console.log(localStorage.getItem('user-id'))
    const res = await axios.put(`http://localhost:3001/api/v1/readaids/${item.itemId}`,putData)
    if(res.status < 400) {
      context.dispatch('setUpdatetReadaidData')
    }else {
      console.log('error | ',res)
    }
  },
  async addReadaidAction(context,_sendData:SendReadaidData) {
    const postData = { readaid: {
      title: _sendData.title,
      body: _sendData.body,
      reedtag_id: _sendData.reedtag_id
    }}
    const res = await axios.post('http://localhost:3001/api/v1/readaids',postData)
    if(res.status < 400) {
      context.dispatch('setReadaidAction')
    }else {
      console.log('error | ',res)
    }
  },
  async addReadaidImageAction(context,fileData:any) {
    let formData = new FormData()
    formData.append('readaid_imager[images][]',fileData.fileData)
    formData.append('readaid_imager[caption]',fileData.caption)
    console.log(fileData);
    const url = 'http://localhost:3001/api/v1/readaid_imagers'
    const config = { headers: {
        'Content-type':'multipart/form-data',
        'Access-Control-Allow-Origin':'*',
    }}
    const postData = { readaid_imager:formData }

    let file_reader = new FileReader();
    file_reader.readAsDataURL(fileData);

    const res = await axios.post(url,postData,config)
    if(res.status < 400) {
      context.dispatch('setReadaidAction')
      console.log('secces | ',res)
    }else {
      console.log('error | ',res)
    }
    // const res = await axios.post('http://localhost:3001/api/v1/readaid_imagers',fileData,headers)

  },
  async deleteReadaidAction(context,id:number) {
    const res = await axios.delete(`http://localhost:3001/api/v1/readaids/${id}`)
    if(res.status < 400) {
      context.dispatch('setReadaidAction')
    }else {
      console.log('error | ',res)
    }
  },
  async deleteReadaidImageAction(context,id:number) {
    const res = await axios.delete(`http://localhost:3001/api/v1/readaid_imagers/${id}`)
    if(res.status < 400) {
      context.dispatch('setReadaidAction')
    }else {
      console.log('error | ',res)
    }
  }
})

