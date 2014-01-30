var ToDoList = []

// Get our initial list of todos from the server
ToDoAPI.get(function(todos) {
  todos.forEach(function(todo) {
    ToDoList.push(todo);
	})
})


// Initialize our Ractive App
var ToDoApp = new Ractive({
	el: 'container',
	template: '#todoListTemplate',
	data: {
		todos: ToDoList,
		remaining: function(todos) {
			var completed = todos.filter(function(todo) {
				return todo.completed
			}).length

			var total = todos.length;
			return total - completed;
		}
	}
});

// Bind event handlers for user interaction
ToDoApp.on({
  remove: function ( event, index ) {
    ToDoAPI.remove(event.context);
    ToDoList.splice(ToDoList.indexOf(event.context), 1);

  },
  create: function ( event ) {
    var newTodo = {
      title: event.node.value,
      completed: false
    }
    // immediately add the todo to our list
    ToDoList.push(newTodo);
    // then save it to the server
    ToDoAPI.create(newTodo, function(created) {
    	// now that we have an id, lets replace the newly
    	// created item with the one returned from the server
    	var targetIndex = ToDoList.indexOf(newTodo);
    	ToDoList.splice(targetIndex, 1, created);
    });
    event.node.value = '';
  },
  edit: function ( event ) {
  	ToDoList.forEach(function(todo) {
  		todo.editing = false;
  	})
  	this.set('todos', ToDoList);
    this.set( event.keypath + '.editing', true );
  },
  submit: function ( event ) {
    this.set( event.keypath + '.editing', false );
    ToDoAPI.update(event.context);
  },
  toggle: function ( event ) {
  	ToDoAPI.update(event.context);
  }
});