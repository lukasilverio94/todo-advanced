//Select Elements
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const filterSelect = document.querySelector("#filter-select");
const searchInput = document.querySelector("#search-input");

let oldInputValue = "";

// Create todo item
const createTodoElement = (text) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  todo.innerHTML = `
    <h3>${text}</h3>
      <button class="finish-todo" data-action="finish">
        <i class="fa-solid fa-check"></i>
      </button>
      <button class="edit-todo" data-action="edit">
        <i class="fa-solid fa-pen"></i>
      </button>
      <button class="remove-todo" data-action="remove">
        <i class="fa-solid fa-xmark"></i>
      </button>
  `;

  return todo;
};

// Save todo item
const saveTodo = (text) => {
  const todo = createTodoElement(text);
  todoList.appendChild(todo);
  todoInput.value = "";
  todoInput.focus();
};

// Toggle between Forms
const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

// Update Todo Item
const updateTodo = (newText) => {
  const todos = document.querySelectorAll(".todo h3");
  todos.forEach((todoTitle) => {
    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = newText;
    }
  });
};

// Handle button clicks (event delegation)
const handleTodoClick = (e) => {
  const targetEl = e.target;
  const parentEl = e.target.closest(".todo");
  const action = targetEl.closest("button")?.dataset.action;
  const todoTitle = parentEl?.querySelector("h3")?.innerText;

  if (action === "finish") {
    parentEl.classList.toggle("done");
  } else if (action === "edit") {
    toggleForms();
    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  } else if (action === "remove") {
    parentEl.remove();
  }
};

// Filter todos based on search input
const filterTodosByName = (searchText) => {
  const todos = document.querySelectorAll(".todo");
  todos.forEach((todo) => {
    const todoTitle = todo.querySelector("h3").innerText;

    // check if the todo title contains the search text
    if (todoTitle.includes(searchText)) {
      todo.style.display = "flex"; // show matchin todos
    } else {
      todo.style.display = "none"; // hide non matching todos
    }
  });
};

// Event Listeners
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = todoInput.value.trim();
  if (inputValue) {
    saveTodo(inputValue);
  }
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const editInputValue = editInput.value.trim();
  if (editInputValue) {
    updateTodo(editInputValue);
    toggleForms();
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms();
});

todoList.addEventListener("click", handleTodoClick);

// Listen for search input and filter todos dynamically
searchInput.addEventListener("input", (e) => {
  const searchText = e.target.value;
  filterTodosByName(searchText);
});

// Filter todos when the filter dropdown changes (existing funcionality)
filterSelect.addEventListener("change", (e) => {
  filterTodosByName(searchInput.value);
});
