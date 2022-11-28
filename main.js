"use strict";

const form = document.querySelector("#new-todo-form");
const input = document.querySelector("#content");
const list = document.querySelector("#todo-list");
const nameInput = document.querySelector("#name");
const username = localStorage.getItem("username") || "";

nameInput.value = username;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    const bubble = document.createElement("span");
    bubble.classList.add("bubble");

    const textDiv = document.createElement("div");
    textDiv.classList.add("todo-content");

    const text = document.createElement("input");
    text.setAttribute("type", "text");
    text.setAttribute("readonly", true);
    text.setAttribute(
      "value",
      input.value[0].toUpperCase() + input.value.slice(1)
    );

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const edit = document.createElement("button");
    edit.innerText = "Edit";
    edit.classList.add("edit");

    edit.addEventListener("click", () => {
      text.readOnly = false;
      text.contentEditable = true;
    });

    const del = document.createElement("button");
    del.classList.add("delete");
    del.innerText = "Delete";

    del.addEventListener("click", function () {
      list.removeChild(todoItem);
    });

    list.appendChild(todoItem);
    todoItem.appendChild(label);
    label.appendChild(checkbox);
    label.appendChild(bubble);
    todoItem.appendChild(textDiv);
    textDiv.appendChild(text);

    todoItem.appendChild(actions);

    actions.appendChild(edit);

    actions.appendChild(del);
    input.value = "";
  }
});
