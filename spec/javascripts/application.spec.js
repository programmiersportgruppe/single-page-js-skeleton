require('requirejs')(['app/assets/javascripts/application.js'],
		function (Application) {
      describe("application", function() {
          it("should toggle the visiblity of components", function() {
              application = Application();

              expect(application.todos.visible()).toEqual(false);
              expect(application.notes.visible()).toEqual(false);
              application.showTodos();

              expect(application.todos.visible()).toEqual(true);
              expect(application.notes.visible()).toEqual(false);
              application.showNotes();

              expect(application.todos.visible()).toEqual(false);
              expect(application.notes.visible()).toEqual(true);
          });
      });
    });
