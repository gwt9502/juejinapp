import { observable, action } from "mobx";

class ItemDetail {
  @observable articleData = {}
  @observable commentList = []

  @action
  getArticleData = (entryId) => {
    API('get', 'https://entry-view-storage-api-ms.juejin.im/v1/getEntryView', {entryId: entryId})
    .then(res => {
      this.articleData = res.data.d
    })
  }

  @action
  getCommentList = (articleId) => {
    API('get', `https://comment-wrapper-ms.juejin.im/v1/comments/entry/${articleId}`, {rankType: 'new',createdAt: ''})
    .then(res => {
      // console.log(res)
      this.commentList = res.data.d.comments
    })
  }
}

export default new ItemDetail()