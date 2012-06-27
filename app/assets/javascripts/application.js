define(["knockout"], function(ko){

  var Sidebar = function(){
    return {
    };
  };

  var Notes = function(){
    return {
      visible: ko.observable(false),
    };
  };

  var Todos = function(){
    return {
      visible: ko.observable(false)
    };
  };

  var Application = function(){
    return {
      sidebar: Sidebar(),
      notes: Notes(),
      todos: Todos(),
      showNotes: function(){
        this.todos.visible(false);
        this.notes.visible(true);
      },
      showTodos: function(){
        this.todos.visible(true);
        this.notes.visible(false);
      }
    };
  };

  return Application;
});
