"use strict";
const log = console.log.bind(console);
function getSelector(getElement) {
  const element = document.querySelector(getElement);
  if (element) {
    return element;
  } else {
    throw Error(`There is no element called ${getElement}`);
  }
}
function getSelectors(getElements) {
  const elements = document.querySelectorAll(getElements);
  if (elements.length == 0) {
    throw Error(`There are no elements called ${getElements}`);
  } else {
    return elements;
  }
}
function getID(getID) {
  const element = document.getElementById(getID);
  if (element) {
    return element;
  } else {
    throw Error(`There is no ID called ${getID}`);
  }
}

const todoInput = getSelector(".todo__input");
const todoBtn = getSelector(".todo__button");
const todoList = getSelector(".todo__list");
const filterOption = getSelector(".filter__tasks");

todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteItem);
filterOption.addEventListener("click", filterTasks);
document.addEventListener("DOMContentLoaded", getTasksFromLocalStorage);

function addTodo(event) {
  event.preventDefault();

  const todoTask = document.createElement("div");
  todoTask.classList.add("todo__task");

  const newTask = document.createElement("li");
  newTask.innerText = todoInput.value;
  newTask.classList.add("todo__item");
  todoTask.appendChild(newTask);

  saveLocalStorage(todoInput.value);

  const successBtn = document.createElement("button");
  successBtn.innerHTML = '<i class="fas fa-check"></i>';
  successBtn.classList.add("success__btn");
  todoTask.appendChild(successBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.classList.add("delete__btn");
  todoTask.appendChild(deleteBtn);

  todoList.appendChild(todoTask);
  todoInput.value = "";
}

function deleteItem(e) {
  const item = e.target;
  if (item.classList[0] === "delete__btn") {
    const task = item.parentElement;
    task.classList.add("drop");
    removeTasksFromLocalStorage(task);
    task.addEventListener("transitionend", function () {
      task.remove();
    });
  }

  if (item.classList[0] === "success__btn") {
    const task = item.parentElement;
    task.classList.toggle("successful");
  }
}

function filterTasks(e) {
  const tasks = [...todoList.childNodes];
  tasks.shift();
  log(tasks);

  tasks.forEach(function (task) {
    switch (e.target.value) {
      case "all":
        log(task);
        task.style.display = "flex";
        break;
      case "successful":
        if (task.classList.contains("successful")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
      case "unfinished":
        if (!task.classList.contains("successful")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
    }
  });
}

function saveLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    const todoTask = document.createElement("div");
    todoTask.classList.add("todo__task");

    const newTask = document.createElement("li");
    newTask.innerText = task;
    newTask.classList.add("todo__item");
    todoTask.appendChild(newTask);

    const successBtn = document.createElement("button");
    successBtn.innerHTML = '<i class="fas fa-check"></i>';
    successBtn.classList.add("success__btn");
    todoTask.appendChild(successBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("delete__btn");
    todoTask.appendChild(deleteBtn);

    todoList.appendChild(todoTask);
  });
}

function removeTasksFromLocalStorage() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  const taskIndex = task.children[0].innerText;
  tasks.splice(tasks.indexOf(taskIndex), 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
