require(["application", "router", "knockout"], function (Application, Router, ko) {
  application = Application();
  ko.applyBindings(application);
  Router(application).run();
  application.authenticator.init();
});
