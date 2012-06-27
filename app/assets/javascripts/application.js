define(["knockout"], function(ko){

  var Sidebar = function(){
    return {
    };
  };

  var Notes = function(){
    return {
      visible: ko.observable(false),
      notes: ko.observable("Hello Matt")

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
          application.todos.visible(false);
          application.notes.visible(true);
      },
      showTodos: function(){
          application.todos.visible(true);
          application.notes.visible(false);
      }
    };
  };

  return Application;
});
