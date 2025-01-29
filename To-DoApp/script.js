"use strict";

const todoMain = document.querySelector("main");
const userInput = document.querySelector(".todo-input");
const listUL = document.querySelector(".todo-list");
const btnClose = document.getElementById("close-Ccon");
const bntAdd = document.querySelector(".add-button");
const todoForm = document.querySelector(".todo-form");

let todos = [];

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addElement();
});

const addElement = function () {
  const inputText = userInput.value;
  console.log(inputText);
  if (inputText.length > 0) {
    todos.push(inputText);
    console.log(todos);
    updateListUL();
    userInput.value = "";
  }
};

bntAdd.addEventListener("click", addElement);

function updateListUL() {
  listUL.innerHTML = "";
  todos.forEach((todo, todoIndex) => {
    const todoItem = createTodoItem(todo, todoIndex);
    listUL.append(todoItem);
  });

  saveList();
}

function createTodoItem(todo, todoIndex) {
  const todoId = "todo-" + todoIndex;
  const todoLi = document.createElement("li");
  todoLi.classList.add("todo-item");
  todoLi.innerHTML = `
    <input type="checkbox" id="${todoId}" class="todo-checkbox" />
    <label for="${todoId}" class="custom-checkbox">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icons" id="check-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    </label>
    <label for="${todoId}" class="todo-text">${todo}</label>
    <button class="cancel-button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icons" id="close-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
  `;

  return todoLi;
}

const removeElement = function (todoIndex) {
  todos.splice(todoIndex, 1);
  updateListUL();
};

listUL.addEventListener("click", function (e) {
  if (e.target.id === "close-icon") {
    console.log(e.target);
    const todoItem = e.target.closest("li");

    const todoIndex = Array.from(listUL.children).indexOf(todoItem);

    removeElement(todoIndex);
  }
  saveList();
});

function saveList() {
  localStorage.setItem("data", listUL.innerHTML);
}

function showTask() {
  listUL.innerHTML = localStorage.getItem("data");
}

showTask();
