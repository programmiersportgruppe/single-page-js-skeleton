define(["knockout", "jquery"], function(ko, $){

  var Sidebar = function(){
    return {
    };
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
    return {
      sidebar: Sidebar(),
      notes: Notes(),
      todos: Todos(),
      selectedTab: ko.observable(),
      showNotes: function(){
        this.todos.visible(false);
        this.notes.visible(true);
        this.selectedTab("notes");
      },
      showTodos: function(){
        this.todos.visible(true);
        this.notes.visible(false);
        this.todos.refresh();
        this.selectedTab("todos");
      }
    };
  };

  return Application;
});
