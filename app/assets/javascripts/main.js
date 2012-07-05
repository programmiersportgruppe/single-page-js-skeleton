require(["application", "notifier", "router", "knockout", "jquery", "custom-ko"], function (Application, Notifier, Router, ko, $) {

  application = Application(Notifier());

  ko.applyBindings(application);

  $(".initial_component").removeClass("initial_component");

  Router(application).run();

  application.authenticator.init();
});
