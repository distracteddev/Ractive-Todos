var ToDoAPI = {
  get: function getToDos (cb) {
    cb = cb || function() {}
    $.get('/api/v1/todo').done(cb);
  },

  create: function createToDo (todo, cb) {
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: '/api/v1/todo',
      data: {
        title: todo.title,
        completed: todo.completed
      }
    }).done(cb)
  },

  update: function updateToDo (todo) {
    $.ajax({
      type: 'PUT',
      dataType: 'json',
      url: '/api/v1/todo/' + todo._id,
      data: {
        _id: todo._id,
        title: todo.title,
        completed: todo.completed
      }
    })
  },

  remove: function deleteToDo (todo) {
    $.ajax({
      type: 'DELETE',
      dataType: 'json',
      url: '/api/v1/todo/' + todo._id
    })
  }

}