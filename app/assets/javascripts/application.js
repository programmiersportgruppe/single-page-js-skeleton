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
            self.list.push(todo);
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
        $.post('/todos.json', {todo: todo}, function(response) {
          console.log('posted the todo to the server: ' + response);
        }, 'json');
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
