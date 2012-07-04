define(["knockout", "jquery"], function(ko, $){
  ko.bindingHandlers.slideVisible = {
      init: function(element, valueAccessor) {
          var value = valueAccessor();
          $(element).toggle(ko.utils.unwrapObservable(value)); 
      },
      update: function(element, valueAccessor) {
          var value = valueAccessor();
          ko.utils.unwrapObservable(value) ? $(element).slideDown() : $(element).slideUp();
      }
  };
});
