let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

displayItems();

function addTodo() {
  let input = document.querySelector('#todo-input');
  let date = document.querySelector('#todo-date');

  let todoItem = input.value.trim();
  let todoDate = date.value;  // This captures the text for your todo task and cleans it up.
  if (todoItem === '' || todoDate === '') {
    alert('Please enter both todo and date');
    return;
  }

  todoList.push({
    item: todoItem,
    dueDate: todoDate,
    completed: false
  });

  localStorage.setItem('todoList', JSON.stringify(todoList));

  input.value = '';// these basically empty the todo box after entering it
  date.value = '';

  displayItems();
}

function displayItems() {
  let container = document.querySelector('.todo-container');
  container.innerHTML = '';

  todoList.forEach((todo, index) => {
    let row = document.createElement('div');
    row.className = 'todo-row';

    row.innerHTML = `
      <span class="${todo.completed ? 'completed' : ''}">
        ${todo.item}
      </span>

      <span>${todo.dueDate}</span>

      <div class="actions">
        <button class="btn-todo" onclick="toggleTodo(${index})">
          ${todo.completed ? 'Undo' : 'Done'}
        </button>
        <button class="btn-delete" onclick="deleteTodo(${index})">
          Delete
        </button>
      </div>`;
    container.appendChild(row);
  });
}

function toggleTodo(index) {
  todoList[index].completed = !todoList[index].completed;
  localStorage.setItem('todoList', JSON.stringify(todoList));
  displayItems();
}
function deleteTodo(index) {
  todoList.splice(index, 1);
  localStorage.setItem('todoList', JSON.stringify(todoList));
  displayItems();
}

function clearAllTodos() {
  if (confirm('Are you sure you want to delete all todos?')) {
    todoList = [];
    localStorage.removeItem('todoList');
    displayItems();
  }
}
