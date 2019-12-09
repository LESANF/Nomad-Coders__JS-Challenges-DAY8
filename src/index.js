// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  pendingList = document.querySelector(".js-pendingList"),
  finishedList = document.querySelector(".js-finishedList");

const TODOS_LS = "toDos";
let toDos = [];

function transTodo() {}

function deleTodo() {}

function paintTodo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const transBtn = document.createElement("button");
  const newId = toDos.length + 1;
  span.innerText = "text ";
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleTodo);
  transBtn.innerText = "✅";
  delBtn.addEventListener("click", transTodo);

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(transBtn);
  pendingList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId
  };

  toDos.push(toDoObj);
}

function handeleSubmit(e) {
  e.preventDefault();
  const text = input.value;
  paintTodo(text);
  input.value = "";
}

function init() {
  form.addEventListener("submit", handeleSubmit);
}

init();
