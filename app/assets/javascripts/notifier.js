define(["knockout"], function(ko){
  var Notifier = function(){
    var self = {
      notice: ko.observable(""),
      alert: ko.observable(""),
      noticeVisible: ko.observable(false),
      alertVisible: ko.observable(false),
      showAlert: function(str){
        self.alert(str);
        self.alertVisible(true);
        setTimeout(function(){
          self.alertVisible(false);
        }, 2000);
      },
      showNotice: function(str){
        self.notice(str);
        self.noticeVisible(true);
        setTimeout(function(){
          self.noticeVisible(false);
        }, 2000);
      }
    };
    return self;
  }

  return Notifier;
});

