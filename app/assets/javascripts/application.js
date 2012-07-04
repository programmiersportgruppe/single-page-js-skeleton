define(["knockout", "jquery"], function(ko, $){

  var initialize_ajax = function(notifier){
    $.ajaxSetup({
      dataType: 'json',
      beforeSend: function(xhr){
        var token = $('meta[name="csrf-token"]').attr('content');
        console.log('sending token: ' + token);
        xhr.setRequestHeader('X-CSRF-Token', token);
      },
      error: function(response){
        var message = eval("(" + response.responseText + ")").error;
        console.log('error: ' + message);
        notifier.showAlert(message);
      }
    });
  }

  var Authenticator = function(notifier){
    var self = {
      logout: function(){
        $.ajax({
            type: 'delete',
            url: '/sessions',
            success: function(response) {
              console.log('logged out: ' + response.success);
              notifier.showNotice(response.success);
              self.username("");
              self.logged_in(false);
            }
        });
      },
      init: function(){
        $.ajax({
            type: 'get',
            url: '/users/fetch',
            success: function(response) {
              if (response.user){
                self.username(response.user.username);
                self.logged_in(true);
              }
            }
        });
      },
      log_in_page: {visible: ko.observable(false)},
      sign_up_page: {visible: ko.observable(false)},
      toggle_log_in: function(){self.log_in_page.visible(!self.log_in_page.visible());},
      toggle_sign_up: function(){self.sign_up_page.visible(!self.sign_up_page.visible());},
      logged_in: ko.observable(false),
      username: ko.observable(""),
      sign_up: function(form){
        $.ajax({
            type: form.method,
            url: form.action,
            data: $(form).serialize(),
            success: function(response) {
              console.log('signed up:' + response.success);
              notifier.showNotice(response.success);
              self.username(form.username.value);
              self.logged_in(true);
            }
        });
      },
      log_in: function(form){
        $.ajax({
            type: form.method,
            url: form.action,
            data: $(form).serialize(),
            success: function(response) {
              console.log('logged in: ' + response.success);
              notifier.showNotice(response.success);
              self.username(form.username.value);
              self.logged_in(true);
            }
        });

      }
    };
    return self;
  };

  var Notes = function(){
    return {
      visible: ko.observable(false)
    };
  };

  var Todos = function(){
    self = {
      refresh: function(authenticator){
        if (!authenticator.logged_in()){
          self.list([]);
          return;
        }
        
        $.getJSON("/todos.json", function(data) {
          self.list([]);
          $.each(data, function(index, todo){
            self.list.push(todo['todo']);
          });
        });
      },
      list: ko.observableArray([]),
      visible: ko.observable(false),
      next_todo: ko.observable(""),
      add_next_todo_to_list: function(){
        var todo = {content: self.next_todo()};
        self.list.push(todo);
        self.next_todo("");
        self.synchronize(todo);
      },
      synchronize: function(todo){
        $.ajax({
            type: 'POST',
            url: '/todos.json',
            data: {todo: todo},
            success: function(response) {
              console.log('posted the todo to the server: ' + response);
            }
        });
      }
    };
    return self;
  };

  var Notifier = function(){
    var self = {
      notice: ko.observable(""),
      alert: ko.observable(""),
      showAlert: function(str){
        self.alert(str);
        $(".alert").show();
        setTimeout(function(){
          $(".alert").slideUp();
        }, 2000);
      },
      showNotice: function(str){
        self.notice(str);
        $(".notice").show();
        setTimeout(function(){
          $(".notice").slideUp();
        }, 2000);
      }
    };
    return self;
  }

  var Application = function(){
    var self = {};

    self.notifier = Notifier();
    initialize_ajax(self.notifier);

    self.notes = Notes();
    self.todos = Todos();

    self.selectedTab = ko.observable();

    self.refresh = function (){
      self.todos.refresh(self.authenticator);
    };

    self.authenticator = Authenticator(self.notifier);
    self.authenticator.logged_in.subscribe(self.refresh);

    self.showNotes = function(){
      self.todos.visible(false);
      self.notes.visible(true);
      self.selectedTab("notes");
    };

    self.showTodos = function(){
      self.todos.visible(true);
      self.notes.visible(false);
      self.selectedTab("todos");
    };

    return self;
  };

  return Application;
});
