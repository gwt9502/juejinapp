import { observable, action } from "mobx";

class Search {
  @observable bannerList = [] // 轮播图
  @observable loading = false
  @observable lists = []
  @observable isEnd = false // 是否加载完数据

  @action
  getBannerList = () => {
    API('get', 'https://banner-storage-ms.juejin.im/v1/get_banner', {limit: 20, position: 'explore', pageSize: 20, platform: 'ios' })
    .then(res => {
      this.bannerList = res.data.d.banner
    })
  }

  @action
  getEntryByRank = (clearListData = false) => {
    if (!clearListData) {
      this.loading = true
    }
    API('get', 'https://timeline-merger-ms.juejin.im/v1/get_entry_by_rank', {uid: userInfo.uid || 'unlogin', limit: 20, before: clearListData ? '' : this.lists.slice(-1)[0].rankIndex})
    .then(res => {
      if (clearListData) {
        this.lists = []
      }
      // 数组去重
      res.data.d.entrylist.reduce((item, next) => {
        JSON.stringify(item).indexOf(JSON.stringify(next.objectId)) > -1 ? '' : item.push(next)
        return item
      }, this.lists)
      this.isEnd = res.data.d.entrylist.length < 20
      this.loading = false
    })
  }
}

export default new Search()