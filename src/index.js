document.addEventListener('deviceready', function () {
    // Enable to debug issues.
    // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
    function guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    
    var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      alert(JSON.stringify(jsonData));
      
     
    };
  
    window.plugins.OneSignal
      .startInit("77845435-3924-4f76-aa29-b740d3547b86")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();
  }, false);