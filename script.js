"use strict";

var tasks;
const addButton = document.querySelector(".main__section__card__card-input__input-button");
const todoList = document.querySelector(".main__section__card__card-main__todo-list");
const taskInput = document.querySelector(".main__section__card__card-input__input-section");

document.addEventListener('DOMContentLoaded', getTodos);
addButton.addEventListener('click', addTask);
todoList.addEventListener('click', removeElement);

function removeElement(event) {

    const selection = event.target;

    if(selection.classList[0] === "main__section__card__card-main__todo-list__task__button-remove") {

        
        const parentEL = selection.parentElement;
        parentEL.remove();
        removeLocalTodos(parentEL);
    }

    if (selection.classList[0] === "main__section__card__card-main__todo-list__task__checkBox-input"){

        
        const siblingEL = selection.nextElementSibling;
        siblingEL.classList.toggle("completed");
        updateTodoDone(siblingEL);
    }
}

function addTask (event) {

    event.preventDefault();

    const todoItem = document.createElement("div");
    todoItem.classList.add("main__section__card__card-main__todo-list__task-item");

    const checkBoxInput = document.createElement("input");
    checkBoxInput.classList.add("main__section__card__card-main__todo-list__task__checkBox-input");   
    checkBoxInput.type = "checkbox";
    todoItem.appendChild(checkBoxInput);
    
    const todoName = document.createElement("li");
    todoName.classList.add("main__section__card__card-main__todo-list__task-item__name");
    todoName.textContent = taskInput.value;
    todoItem.appendChild(todoName);

    saveLocalTodos({name: taskInput.value, done: false});

    const buttonRemove = document.createElement("button");
    buttonRemove.classList.add("main__section__card__card-main__todo-list__task__button-remove");
    buttonRemove.textContent = "remove";
    todoItem.appendChild(buttonRemove);

    todoList.appendChild(todoItem);

    taskInput.value = "";
}

function saveLocalTodos(todo) {

    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos () {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(element => {
        
        const todoItem = document.createElement("div");
        todoItem.classList.add("main__section__card__card-main__todo-list__task-item");

        const checkBoxInput = document.createElement("input");
        checkBoxInput.classList.add("main__section__card__card-main__todo-list__task__checkBox-input");
        checkBoxInput.type = "checkbox";
        if(element.done === true) {
            checkBoxInput.setAttribute("checked", false);
        }
        todoItem.appendChild(checkBoxInput);

        const todoName = document.createElement("li");
        todoName.classList.add("main__section__card__card-main__todo-list__task-item__name");
        todoName.textContent = element.name;
        if(element.done === true) {
            todoName.classList.add("completed");
        }
        todoItem.appendChild(todoName);

        const buttonRemove = document.createElement("button");
        buttonRemove.classList.add("main__section__card__card-main__todo-list__task__button-remove");
        buttonRemove.textContent = "remove";
        todoItem.appendChild(buttonRemove);

        todoList.appendChild(todoItem);
    });
}

function removeLocalTodos (todo) {

    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndexElement = todo.children[1].innerText;
    
    todos.splice(checkItem(todoIndexElement), 1);
    function checkItem (indexName) {
        for(let i = 0; i<todos.length; i++) {

            if(todos[i].name === indexName){
                return i;
            }
        }
    }
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateTodoDone (todo) {

    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const elementName = todo.textContent;

    for(let i = 0; i<todos.length; i++) {

        if(todos[i].name === elementName){
            if(todos[i].done === false) {
                todos[i].done = true;
            } else {
                todos[i].done = false;
            }
            break;
        }

    }
    localStorage.setItem('todos', JSON.stringify(todos));
}