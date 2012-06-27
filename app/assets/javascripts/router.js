define(['sammy'], function(Sammy){

  var Router = function(application){
    return {
      sammy: Sammy('#site', function() {
        this.get('#/', function() {
          console.log('routing...');
          this.redirect("#/todos");
        });

        this.get('#/todos', function(){
          console.log('routing to todos');
          application.showTodos();
        });

        this.get('#/notes', function(){
          console.log('routing to notes');
          application.showNotes();
        });
      }),

      run: function(){
        this.sammy.run('#/');
      }
    }
  };

  return Router;
});
