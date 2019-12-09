// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  pendingList = document.querySelector(".js-pendingList"),
  finishedList = document.querySelector(".js-finishedList");

const TODOS_LS = "toDos";
const FINISHED_LS = "FINISHED";
let toDos = [];
let finish = [];

function transToDo(e) {
  const trBtn = e.target;
  const trBtnLi = e.target.parentNode;
  pendingList.removeChild(trBtnLi);

  const trLi = document.createElement("li");
  const trSpan = document.createElement("span");
  const trDelBtn = document.createElement("button");
  const RollbackBtn = document.createElement("button");
  const trNewId = trBtnLi.id;
  const trText = trBtnLi.firstChild.innerText;

  trSpan.innerText = trText;
  trDelBtn.innerText = "❌";
  trDelBtn.addEventListener("click", deleToDo);
  RollbackBtn.innerText = "⏪";
  RollbackBtn.addEventListener("click", transToDo);

  trLi.appendChild(trSpan);
  trLi.appendChild(trDelBtn);
  trLi.appendChild(RollbackBtn);
  trLi.id = trNewId;
  finishedList.appendChild(trLi);

  const finObj = {
    text: trText,
    id: trNewId
  };

  finish.push(finObj);
  saveToDos();
}

function deleToDo(e) {
  const btn = e.target;
  const btnLi = btn.parentNode;
  pendingList.removeChild(btnLi);

  const filterAry = toDos.filter(function(el) {
    return el.id !== parseInt(btnLi.id);
  });
  toDos = filterAry;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  localStorage.setItem(FINISHED_LS, JSON.stringify(finish));
}

function paintTodo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const transBtn = document.createElement("button");
  const newId = toDos.length + 1;
  span.innerText = text;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleToDo);
  transBtn.innerText = "✅";
  transBtn.addEventListener("click", transToDo);

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(transBtn);
  li.id = newId;
  pendingList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId
  };

  toDos.push(toDoObj);
  saveToDos();
}

function handeleSubmit(e) {
  e.preventDefault();
  const text = input.value;
  paintTodo(text);
  input.value = "";
}

function loadTodo() {
  const current = localStorage.getItem(TODOS_LS);
  if (current !== null) {
    const parseCurrent = JSON.parse(current);
    parseCurrent.forEach(function(el) {
      paintTodo(el.text);
    });
  }
}

function init() {
  loadTodo();
  form.addEventListener("submit", handeleSubmit);
}

init();
