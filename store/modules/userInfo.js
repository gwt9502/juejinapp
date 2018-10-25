import { observable, action } from "mobx";

class UserInfo {
  @observable userMsg = {};

  @action.bound
  getUserInfo = (ids) => {
    API('get', 'https://lccro-api-ms.juejin.im/v1/get_multi_user', {ids, cols: 'objectId|username|avatar_large|avatarLarge|role|company|jobTitle|self_description|selfDescription|blogAddress|isUnitedAuthor|isAuthor|authData|totalHotIndex|postedEntriesCount|postedPostsCount|collectedEntriesCount|likedPinCount|collectionSetCount|subscribedTagsCount|followeesCount|followersCount|pinCount'})
    .then(res => {
      console.log(res)
      this.userMsg = res.data.d[ids]
    })
  }
}

export default new UserInfo()