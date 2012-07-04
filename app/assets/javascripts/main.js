require(["application", "notifier", "router", "knockout", "custom-ko"], function (Application, Notifier, Router, ko) {

  application = Application(Notifier());

  ko.applyBindings(application);

  Router(application).run();

  application.authenticator.init();
});
