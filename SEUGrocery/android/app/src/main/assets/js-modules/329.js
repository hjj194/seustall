__d(function(g,r,i,a,m,e,d){'use strict';var t=r(d[0]),o=r(d[1]),n=r(d[2]),c=r(d[3]).PushNotificationManager,l=r(d[4]),s=new n(c),u=new Map,f=(function(){function n(o){var c=this;t(this,n),this._data={},this._remoteNotificationCompleteCallbackCalled=!1,this._isRemote=o.remote,this._isRemote&&(this._notificationId=o.notificationId),o.remote?Object.keys(o).forEach(function(t){var n=o[t];'aps'===t?(c._alert=n.alert,c._sound=n.sound,c._badgeCount=n.badge,c._category=n.category,c._contentAvailable=n['content-available'],c._threadID=n['thread-id']):c._data[t]=n}):(this._badgeCount=o.applicationIconBadgeNumber,this._sound=o.soundName,this._alert=o.alertBody,this._data=o.userInfo,this._category=o.category)}return o(n,null,[{key:"presentLocalNotification",value:function(t){c.presentLocalNotification(t)}},{key:"scheduleLocalNotification",value:function(t){c.scheduleLocalNotification(t)}},{key:"cancelAllLocalNotifications",value:function(){c.cancelAllLocalNotifications()}},{key:"removeAllDeliveredNotifications",value:function(){c.removeAllDeliveredNotifications()}},{key:"getDeliveredNotifications",value:function(t){c.getDeliveredNotifications(t)}},{key:"removeDeliveredNotifications",value:function(t){c.removeDeliveredNotifications(t)}},{key:"setApplicationIconBadgeNumber",value:function(t){c.setApplicationIconBadgeNumber(t)}},{key:"getApplicationIconBadgeNumber",value:function(t){c.getApplicationIconBadgeNumber(t)}},{key:"cancelLocalNotifications",value:function(t){c.cancelLocalNotifications(t)}},{key:"getScheduledLocalNotifications",value:function(t){c.getScheduledLocalNotifications(t)}},{key:"addEventListener",value:function(t,o){var c;l('notification'===t||'register'===t||'registrationError'===t||'localNotification'===t,'PushNotificationIOS only supports `notification`, `register`, `registrationError`, and `localNotification` events'),'notification'===t?c=s.addListener("remoteNotificationReceived",function(t){o(new n(t))}):'localNotification'===t?c=s.addListener("localNotificationReceived",function(t){o(new n(t))}):'register'===t?c=s.addListener("remoteNotificationsRegistered",function(t){o(t.deviceToken)}):'registrationError'===t&&(c=s.addListener("remoteNotificationRegistrationError",function(t){o(t)})),u.set(t,c)}},{key:"removeEventListener",value:function(t,o){l('notification'===t||'register'===t||'registrationError'===t||'localNotification'===t,'PushNotificationIOS only supports `notification`, `register`, `registrationError`, and `localNotification` events');var n=u.get(t);n&&(n.remove(),u.delete(t))}},{key:"requestPermissions",value:function(t){var o={};return o=t?{alert:!!t.alert,badge:!!t.badge,sound:!!t.sound}:{alert:!0,badge:!0,sound:!0},c.requestPermissions(o)}},{key:"abandonPermissions",value:function(){c.abandonPermissions()}},{key:"checkPermissions",value:function(t){l('function'==typeof t,'Must provide a valid callback'),c.checkPermissions(t)}},{key:"getInitialNotification",value:function(){return c.getInitialNotification().then(function(t){return t&&new n(t)})}}]),o(n,[{key:"finish",value:function(t){this._isRemote&&this._notificationId&&!this._remoteNotificationCompleteCallbackCalled&&(this._remoteNotificationCompleteCallbackCalled=!0,c.onFinishRemoteNotification(this._notificationId,t))}},{key:"getMessage",value:function(){return this._alert}},{key:"getSound",value:function(){return this._sound}},{key:"getCategory",value:function(){return this._category}},{key:"getAlert",value:function(){return this._alert}},{key:"getContentAvailable",value:function(){return this._contentAvailable}},{key:"getBadgeCount",value:function(){return this._badgeCount}},{key:"getData",value:function(){return this._data}},{key:"getThreadID",value:function(){return this._threadID}}]),n})();f.FetchResult={NewData:'UIBackgroundFetchResultNewData',NoData:'UIBackgroundFetchResultNoData',ResultFailed:'UIBackgroundFetchResultFailed'},m.exports=f},329,[28,29,113,14,9]);