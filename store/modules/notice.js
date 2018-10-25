import { observable, action } from "mobx";

class Notice {
  @observable userNoticeLists = []
  @observable empty = false
  @observable systemNoticeLists = []

  @action.bound
  getUserNotice = () => {
    const before = this.userNoticeLists.length > 0 ? this.userNoticeLists.slice(-1)[0].beforeAtString : ''
    this.empty = false
    API('get', 'https://ufp-api-ms.juejin.im/v1/getUserNotification', { before: before })
    .then(res => {
      if (res.data.d.length == 0) {
        this.empty = true
      }
      this.userNoticeLists = [...this.userNoticeLists, ...res.data.d]
    })
  }
}

export default new Notice()