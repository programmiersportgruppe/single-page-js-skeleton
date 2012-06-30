define(["knockout", "jquery"], function(ko, $){

  var Authenticator = function(){
    var self = {
      logout: function(){
        $.ajax({
            type: 'delete',
            url: '/sessions',
            success: function(response) {
              console.log('logged out: ' + response.success);
              application.showNotice(response.success);
              self.username("");
              self.logged_in(false);
            },
            error: function(response){
              args = arguments;
              var message = eval("(" + response.responseText + ")").error;
              console.log('error logging out: ' + message);
              application.showAlert(message);
            },
            dataType: 'json',
            beforeSend: function(xhr){
              var token = $('meta[name="csrf-token"]').attr('content');
              console.log('sending token: ' + token);
              xhr.setRequestHeader('X-CSRF-Token', token);
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
            },
            error: function(response){
              args = arguments;
              var message = eval("(" + response.responseText + ")").error;
              console.log('error fetching: ' + message);
              application.showNotice(message);
            },
            dataType: 'json',
            beforeSend: function(xhr){
              var token = $('meta[name="csrf-token"]').attr('content');
              console.log('sending token: ' + token);
              xhr.setRequestHeader('X-CSRF-Token', token);
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
              application.showNotice(response.success);
              self.username(form.username.value);
              self.logged_in(true);
            },
            error: function(response){
              args = arguments;
              var message = eval("(" + response.responseText + ")").error;
              console.log('error signing up: ' + message);
              application.showAlert(message);
            },
            dataType: 'json',
            beforeSend: function(xhr){
              var token = $('meta[name="csrf-token"]').attr('content');
              console.log('sending token: ' + token);
              xhr.setRequestHeader('X-CSRF-Token', token);
            }
        });
      },
      log_in: function(form){
        $.ajax({
            type: form.method,
            url: form.action,
            data: $(form).serialize(),
            success: function(response) {
              console.log('logged in:' + response.success);
              application.showNotice(response.success);
              self.username(form.username.value);
              self.logged_in(true);
            },
            error: function(response){
              args = arguments;
              var message = eval("(" + response.responseText + ")").error;
              console.log('error: ' + message);
              application.showAlert(message);
            },
            dataType: 'json',
            beforeSend: function(xhr){
              var token = $('meta[name="csrf-token"]').attr('content');
              console.log('sending token: ' + token);
              xhr.setRequestHeader('X-CSRF-Token', token);
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
      refresh: function(){
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
            },
            dataType: 'json',
            beforeSend: function(xhr){
              var token = $('meta[name="csrf-token"]').attr('content');
              console.log('sending token: ' + token);
              xhr.setRequestHeader('X-CSRF-Token', token);
            }
        });
      }
    };
    return self;
  };

  var Application = function(){
    var self = {
      notes: Notes(),
      todos: Todos(),
      authenticator: Authenticator(),
      selectedTab: ko.observable(),
      showNotes: function(){
        self.todos.visible(false);
        self.notes.visible(true);
        self.selectedTab("notes");
      },
      showTodos: function(){
        self.todos.visible(true);
        self.notes.visible(false);
        self.todos.refresh();
        self.selectedTab("todos");
      },
      showAlert: function(str){
        $(".alert").text(str);
        setTimeout(function(){
          $(".alert").fadeOut();
        }, 1000);
      },
      showNotice: function(str){
        $(".notice").text(str);
        setTimeout(function(){
          $(".notice").fadeOut();
        }, 1000);
      }
    };
    self.authenticator.init();
    return self;
  };

  return Application;
});
