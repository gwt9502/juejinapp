import { observable, action, computed } from "mobx";

class Home {
  @observable lists = [] // 列表
  @observable recommendList = [] // 热门推荐
  @observable currentIndex = 0 // 当前展示的热门推荐
  @observable loading = false
  @observable isEnd = false // 是否加载完数据

  // 热门推荐
  @action
  getEntryByHotRecomment = () => {
    API('get', 'https://timeline-merger-ms.juejin.im/v1/get_entry_by_hot_recomment', { limit: 20 })
    .then(res => {
      this.recommendList = res.data.d.entry.entrylist
    })
  }

  // 信息流列表
  @action
  getTimelineList = (clearListData = false) => {
    if (!clearListData) {
      this.loading = true
      this.isEnd = false
    }
    API('get', 'https://timeline-merger-ms.juejin.im/v1/get_entry_by_timeline', {limit: 20, category: 'all', recomment: 1, before: clearListData ? '' : this.lists.slice(-1)[0].verifyCreatedAt})
    .then(res => {
      console.log(res)
      if (clearListData) {
        this.lists = []
      }
      // console.log(res.data.d.entrylist)
      if (res.data.d.entrylist.length < 20) {
        this.isEnd = true
      }
      this.lists = [...this.lists, ...res.data.d.entrylist]
      this.loading = false
    })
  }
}

export default new Home()