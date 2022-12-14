"use strict";

let todos = JSON.parse(localStorage.getItem("todos")) || [];
const btnSort = document.querySelector("#sort");

window.addEventListener("load", () => {
  //Selecting main elements
  const form = document.querySelector("#new-todo-form");
  const input = document.querySelector("#content");
  const nameInput = document.querySelector("#name");
  const username = localStorage.getItem("username") || "";
  //Username
  nameInput.value = username;
  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    //Pushing new todo to local storage
    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    e.target.reset();

    displayTodos();
  });

  displayTodos();
});

function displayTodos(sort = false) {
  //Creating html elements
  const list = document.querySelector("#todo-list");
  list.innerHTML = "";

  const todoSort = sort
    ? todos.sort((a, b) => b.createdAt - a.createdAt)
    : todos.sort((a, b) => a.createdAt - b.createdAt);

  todoSort
    // .sort((a, b) => b.createdAt - a.createdAt)
    .forEach((todo) => {
      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-item");

      const label = document.createElement("label");

      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.checked = todo.done;

      const bubble = document.createElement("span");
      bubble.classList.add("bubble");

      todo.category == "personal"
        ? bubble.classList.add("personal")
        : bubble.classList.add("business");

      const textDiv = document.createElement("div");
      textDiv.classList.add("todo-content");

      textDiv.innerHTML = `<input type="text" value ="${todo.content}" readonly>`;

      const date = document.createElement("div");
      date.classList.add("date");

      //Created at
      const dateFormat = new Date(todo.createdAt);
      const hours = `${dateFormat.getHours()}`.padStart(2, 0);
      const mins = `${dateFormat.getMinutes()}`.padStart(2, 0);
      // date.innerText = `Created at: ${hours}:${mins < 10 ? "0" : ""}${mins}`;
      date.innerText = `Created at: ${hours}:${mins}`;
      btnSort.innerText = sort ? "SORT ???" : "SORT ???";

      const actions = document.createElement("div");
      actions.classList.add("actions");

      const edit = document.createElement("button");
      edit.innerText = "Edit";
      edit.classList.add("edit");
      edit.style.isolation = "isolate";
      //Make content editable
      edit.addEventListener("click", (e) => {
        const input = textDiv.querySelector("input");
        input.removeAttribute("readonly");
        input.focus();
        input.addEventListener("blur", (e) => {
          input.setAttribute("readonly", true);
          todo.content = e.target.value;
          localStorage.setItem("todos", JSON.stringify(todos));
          displayTodos();
        });
      });

      const del = document.createElement("button");
      del.classList.add("delete");
      del.style.isolation = "isolate";
      del.innerText = "Delete";

      // Delete button function
      del.addEventListener("click", (e) => {
        todos = todos.filter((t) => t != todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        displayTodos();
      });

      if (todo.done) {
        todoItem.classList.add("done");
      }

      checkbox.addEventListener("click", (e) => {
        todo.done = e.target.checked;
        localStorage.setItem("todos", JSON.stringify(todos));

        todo.done
          ? todoItem.classList.add("done")
          : todoItem.classList.remove("done");
        displayTodos();
      });

      list.appendChild(todoItem);
      todoItem.appendChild(label);
      label.appendChild(checkbox);
      label.appendChild(bubble);
      todoItem.appendChild(textDiv);
      todoItem.appendChild(date);
      todoItem.appendChild(actions);
      actions.appendChild(edit);
      actions.appendChild(del);
    });
}

let sorted = true;

btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayTodos(sorted);
  sorted = !sorted;
  console.log(sorted);
});
