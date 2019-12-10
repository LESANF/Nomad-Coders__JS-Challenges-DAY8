// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  pendingList = document.querySelector(".js-pendingList"),
  finishedList = document.querySelector(".js-finishedList");

const TODOS_LS = "PENDING";
const FINISHED_LS = "FINISHED";
let toDos = [];
let finish = [];

function transToDo(e) {
  const trBtn = e.target;
  const trBtnLi = e.target.parentNode;
  deleToDo(e);
  const trLi = document.createElement("li");
  const trSpan = document.createElement("span");
  const trDelBtn = document.createElement("button");
  const RollbackBtn = document.createElement("button");
  const trNewId = trBtnLi.id;
  const trText = trBtnLi.firstChild.innerText;

  trSpan.innerText = trText;
  trDelBtn.innerText = "❌";
  trDelBtn.addEventListener("click", deleToDoTs);
  RollbackBtn.innerText = "⏪";
  RollbackBtn.addEventListener("click", handleRollback);

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
  saveToDosTs();
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

function deleToDoTs(e) {
  const btn = e.target;
  const btnLi = btn.parentNode;
  finishedList.removeChild(btnLi);

  const filterAry = finish.filter(function(el) {
    return el.id !== btnLi.id;
  });
  finish = filterAry;
  saveToDosTs();
}

function saveToDosTs() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finish));
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintTodo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const transBtn = document.createElement("button");
  const newId = Math.floor(Math.random() * 1000000000000);
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

function handleRollback(e) {
  const trBtn = e.target;
  const trBtnLi = e.target.parentNode;
  deleToDoTs(e);
  console.log(trBtn, trBtnLi);
  const trLi = document.createElement("li");
  const trSpan = document.createElement("span");
  const trDelBtn = document.createElement("button");
  const RollbackBtn = document.createElement("button");
  const trNewId = trBtnLi.id;
  const trText = trBtnLi.firstChild.innerText;

  trSpan.innerText = trText;
  trDelBtn.innerText = "❌";
  trDelBtn.addEventListener("click", deleToDoTs);
  RollbackBtn.innerText = "✅";
  RollbackBtn.addEventListener("click", transToDo);

  trLi.appendChild(trSpan);
  trLi.appendChild(trDelBtn);
  trLi.appendChild(RollbackBtn);
  trLi.id = trNewId;
  pendingList.appendChild(trLi);

  const finObj = {
    text: trText,
    id: trNewId
  };

  toDos.push(finObj);
  saveToDos();
}

function paintTodoTs(elTsText, elTsId) {
  const trLi = document.createElement("li");
  const trSpan = document.createElement("span");
  const trDelBtn = document.createElement("button");
  const RollbackBtn = document.createElement("button");
  const trNewId = elTsId;
  const trText = elTsText;
  trSpan.innerText = trText;
  trDelBtn.innerText = "❌";
  trDelBtn.addEventListener("click", deleToDoTs);
  RollbackBtn.innerText = "⏪";
  RollbackBtn.addEventListener("click", handleRollback);
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
  saveToDosTs();
}

function loadTodoTs() {
  const currentTs = localStorage.getItem(FINISHED_LS);
  if (currentTs !== null) {
    const parseCurrentTs = JSON.parse(currentTs);
    parseCurrentTs.forEach(function(elTs) {
      paintTodoTs(elTs.text, elTs.id);
    });
  }
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
  loadTodoTs();
  form.addEventListener("submit", handeleSubmit);
}

init();
