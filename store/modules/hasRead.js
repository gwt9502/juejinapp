import { observable, action, computed } from "mobx";

class HasRead {
  @observable readHistoryLists = [] // 列表
  @observable isEnd = false // 是否加载完数据

  // 信息流列表
  @action
  getReadHistoryLists = (clearListData = false) => {
    const before = this.readHistoryLists.length > 0 ? this.readHistoryLists.slice(-1)[0].createdAt : ''
    API('get', 'https://timeline-merger-ms.juejin.im/v1/get_entry_by_self', {before: before, order: 'createdAt', limit: 20, type: 'view', targetUid: userInfo.uid})
    .then(res => {
      if (res.data.d.entrylist.length < 20) {
        this.isEnd = true
      }
      this.readHistoryLists = [...this.readHistoryLists, ...res.data.d.entrylist]
    })
  }
}

export default new HasRead()