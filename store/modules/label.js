import { observable, action } from "mobx";

const tagUrl = 'https://gold-tag-ms.juejin.im/v1'

class Label {
  @observable myTaglists = []
  @observable allTaglists = []
  @observable recommendTaglists = []
  @observable currentPage = 1
  @observable isEnd = false
  @observable loading = false

  @action
  getMyTagLists = () => {
    this.myTaglists = []
    API('get', `${tagUrl}/user/${userInfo.uid}/subscribe`)
    .then(res => {
      // if (res.data.d.tagList.length != this.myTaglists.lenght) {
      //   this.myTaglists = []
      // }
      this.myTaglists = res.data.d.tagList
    })
  }

  @action
  getRecommendTaglists = () => {
    API('get', `${tagUrl}/tags/type/hot/suggest/category/page/1/pageSize/100`)
    .then(res => {
      this.recommendTaglists = res.data.d.tags
    })
  }

  @action
  getAllTagLists = (isFirstRequest) => {
    this.loading = true
    if (isFirstRequest) {
      this.currentPage = 1
      this.allTaglists = []
    }
    API('get', `${tagUrl}/tags/type/hot/suggest/tag/page/${this.currentPage}/pageSize/20`)
    .then(res => {
      if (res.data.d.tags.length == 0) {
        this.isEnd = true
      }
      this.currentPage++
      this.allTaglists = [...this.allTaglists, ...res.data.d.tags]
      this.loading = false
    })
  }

  @action
  updateTagStatus = (type, tagId) => {
    return API(type, `${tagUrl}/tag/subscribe/${tagId}`)
  }
}

export default new Label()