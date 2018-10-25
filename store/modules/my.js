import { observable, action } from "mobx";

class My {
  @observable userNotificationNum = 0;
  @observable userMessage = {}

  @action
  getUserNotificationNum = () => {
    API('get', 'https://ufp-api-ms.juejin.im/v1/getUserNotificationNum')
    .then(res => {
      this.userNotificationNum = res.data.d.notification_num
    })
  }

  @action
  getUserInfo = () => {
    API('get', 'https://user-storage-api-ms.juejin.im/v1/getUserInfo', {current_uid: userInfo.uid})
    .then(res => {
      this.userMessage = res.data.d
    })
  }
}

export default new My()