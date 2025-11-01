// Local array to store todo items
let todos = [];

// Form validation
function validateForm(todo, date) {
  if (todo.trim() === '' || date.trim() === '') {
    alert('Please enter a todo item and select a due date');
    return false;
  }
  return true;
}

// Add new todo
function addTodo() {
  const todoInput = document.getElementById('todo-input').value;
  const todoDate = document.getElementById('todo-date').value;

  if (!validateForm(todoInput, todoDate)) return;

  todos.push({ task: todoInput, dueDate: todoDate });

  // Reset input fields
  document.getElementById('todo-input').value = '';
  document.getElementById('todo-date').value = '';

  renderTodos();
}

// Delete a todo by index
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Clear all todos
function clearAllTodos() {
  if (todos.length === 0) {
    alert('No todos to clear.');
    return;
  }

  if (confirm('Are you sure you want to clear all todos?')) {
    todos = [];
    renderTodos();
  }
}

// Filter todos by date 
function filterTodos() {
  if (todos.length === 0) {
    alert('No todos available to filter.');
    return;
  }

  const dateToFilter = prompt('Enter date to filter (YYYY-MM-DD):');
  if (!dateToFilter) {
    renderTodos(); 
    return;
  }

  const filtered = todos.filter(todo => todo.dueDate === dateToFilter);

  if (filtered.length === 0) {
    alert(`No todos found for ${dateToFilter}`);
  }

  renderTodos(filtered);
}

// Render todos to the DOM
function renderTodos(filteredList = null) {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  const list = filteredList || todos;

  if (list.length === 0) {
    todoList.innerHTML = '<li>No todos available</li>';
    return;
  }

  list.forEach((todo, index) => {
    todoList.innerHTML += `<li class="flex justify-between items-center border p-2 my-1 rounded">
        <span>${todo.task} - ${todo.dueDate}</span>
        <button onclick="deleteTodo(${index})" class="text-red-500">Delete</button>
      </li>`;
  });
}

// Attach event listeners to buttons
document.getElementById('clear-all-btn').addEventListener('click', clearAllTodos);
document.getElementById('filter-todos-btn').addEventListener('click', filterTodos);
