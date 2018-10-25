import { observable, action } from "mobx";

class Quiz {
  @observable allBookList = []
  @observable isEnd = false
  @observable loading = false
  @observable pageNum = 1

  @action
  getAllBookList = (clearListData = false) => {
    if (!clearListData) {
      this.loading = true
    } else {
      this.pageNum = 1
    }
    API('get', 'https://xiaoce-timeline-api-ms.juejin.im/v1/getListByLastTime', {pageNum: this.pageNum})
    .then(res => {
      if (clearListData) {
        this.allBookList = []
      }
      this.allBookList = [...this.allBookList, ...res.data.d]
      this.isEnd = res.data.d.length < 20
      this.pageNum++
      this.loading = false
    })
  }
}

export default new Quiz()