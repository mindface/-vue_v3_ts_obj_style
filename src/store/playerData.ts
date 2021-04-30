import { getterTree, mutationTree, actionTree } from 'typed-vuex';
import { ClientData,MethodCrad,sendUpdateCard } from './interfaces'
import { ApiFetchGet } from '../api/http-client'

export const state = () => ({
  viewFieldId: 1,
  clientData: [
    {id: 1,name: "山田太郎",level:'improvement',text:"自己紹介自己紹介自己紹介自己紹介自己紹介自己紹介"},
    {id: 2,name: "山田太郎",level:'improvement',text:"自己紹介自己紹介"},
    {id: 3,name: "山田太郎",level:'improvement',text:"自己紹介自己紹介自己紹介自己紹介自己紹介自己紹介"},
    {id: 4,name: "山田太郎",lsevel:'improvement',text:"自己紹介自己紹介自己紹介自己紹介"},
    {id: 5,name: "山田太郎",level:'improvement',text:"自己紹介自己紹介"}
  ],
  fieldItems: [
    {
      slug: 'customize',
      fieldId: 1,
      clientarticle: [
        {
          id: 1,
          title: "実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行",
          text: '計画を解決できない場合は、図にしてプロセス化してフローを確認する。',
          category: "join",
          articles_id: 2,
          user_id: 2,
        },
        {
          id: 2,
          title: "実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行",
          text: '計画を解決できない場合は、図にしてプロセス化してフローを確認する。',
          category: "join",
          articles_id: 2,
          user_id: 2,
        },
        {
          id: 3,
          title: "実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行",
          text: '計画を解決できない場合は、図にしてプロセス化してフローを確認する。',
          category: "join",
          articles_id: 2,
          user_id: 3,
        },
        {
          id: 4,
          title: "実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行実行",
          text: '計画を解決できない場合は、図にしてプロセス化してフローを確認する。',
          category: "join",
          articles_id: 2,
          user_id: 3,
        }
      ]
    }
  ]
})

export const getters = getterTree(state, {
  viewClientData(state){
    return state.viewFieldId
  },
  reversedClientData(state){
    return state.clientData
  },
  reversedCard(state){
    return state.fieldItems
  }
})

export const mutations = mutationTree(state, {
  selectViewField(state, viewid:number) {
    state.viewFieldId = viewid;
  },
  addField(state, data:ClientData) {
    state.clientData.push(data);
  },
  updateField(state, data:ClientData) {
    state.clientData.push(data);
    state.clientData = state.clientData.filter( v => v );
  },
  addCard(state, data:sendUpdateCard) {
    const setId = data.fieldId - 1;
    state.fieldItems.map( (item,index) => {
      if(item.fieldId === data.fieldId){
        item.clientarticle.push(data.item);
        item.clientarticle = item.clientarticle.filter( v => v );
      }
    })
  },
  updateCard(state, data:MethodCrad) {
    let items:MethodCrad[] = state.fieldItems[state.viewFieldId-1].clientarticle
    items = items.map( (item,index) => {
      if( item.id === data.id ){
        return data
      }
      return item
    });
    console.log(items)
    state.fieldItems[state.viewFieldId-1].clientarticle = items;
  },
  deleteCard(state, id:number) {
    const items = state.fieldItems[(state.viewFieldId-1)].clientarticle
    let sendItem:MethodCrad[] = []
    items.map( (item,index) => {
      if(item.id !== id){
        sendItem.push(item)
      }
    });
    state.fieldItems[state.viewFieldId-1].clientarticle = sendItem
  },
})

export const actions = actionTree({ state,getters,mutations},{
  selectViewFieldAction(context,viewId:number) {
    context.commit('selectViewField', viewId);
  },
  getAction(context):void {
    const FetachD = new ApiFetchGet('')
    FetachD.init().then(res => {
      const data = res.result
    });
  },
  addFieldAction(context,data:ClientData) {
    context.commit('addField', data);
  },
  updateFieldAction(context,data:ClientData) {
    context.commit('updateField', data);
  },
  addCardAction(context,data:sendUpdateCard) {
    context.commit('addCard', data);
  },
  deleteCardAction(context,id:number) {
    context.commit('deleteCard', id);
  },
  updateCardAction(context,data:MethodCrad) {
    context.commit('updateCard', data);
  }
})

