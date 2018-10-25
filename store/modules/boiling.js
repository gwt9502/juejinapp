import { observable, action } from "mobx";

class Boiling {
  @observable hotRecommendLists = []
  @observable recommendLists = []
  @observable loading = false
  @observable isEnd = false

  @action.bound
  getHotRecommendLists = () => {
    API('get', 'https://short-msg-ms.juejin.im/v1/getHotRecommendList')
    .then(res => {
      this.hotRecommendLists = res.data.d.list
    })
  }
  @action.bound
  getRecommendLists = (clearListData = false) => {
    if (!clearListData) {
      this.loading = true
      this.isEnd = false
    }
    API('get', 'https://short-msg-ms.juejin.im/v1/pinList/recommend', {limit: 20, before: clearListData ? '' : this.recommendLists.slice(-1)[0].verifyCreatedAt})
    .then(res => {   
      if (clearListData) {
        this.recommendLists = []
      }
      console.log(res)
      if (res.data.d.list.length < 20) {
        this.isEnd = true
      }
      this.recommendLists = [...this.recommendLists, ...res.data.d.list]
      this.loading = false
    })
  }
}

export default new Boiling()