// define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();


// load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event
  form.addEventListener('submit', addTask);

  // delete task event
  taskList.addEventListener('click', deleteTask);

  // clear tasks
  clearBtn.addEventListener('click', clearTasks);

  // filter tasks
  filter.addEventListener('keyup', filterTasks);
}

// get tasks from local storage
function getTasks() {
  let tasks;
  task = taskInput.value;
  tasks = localStorage.getItem('tasks') === null ? [] : JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach(task => {
    // create task as a li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // add inner text to the task
    li.innerText = task;
    // create the delete icon as a link element
    const deleteIcon = document.createElement('a');
    // add class
    deleteIcon.className = 'delete-item secondary-content';
    // add icon html
    deleteIcon.innerHTML = `<i class="fa fa-remove"></i>`;
    // append deleteIcon to a task
    li.appendChild(deleteIcon);
    // append task to the ul in the DOM
    taskList.appendChild(li);
  })
}

// add task
function addTask(e) {
  e.preventDefault();
  if (!taskInput.value) alert('Add a Task!');
  else {
    // create task as a li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // add inner text to the task
    li.innerText = taskInput.value;
    // create the delete icon as a link element
    const deleteIcon = document.createElement('a');
    // add class
    deleteIcon.className = 'delete-item secondary-content';
    // add icon html
    deleteIcon.innerHTML = `<i class="fa fa-remove"></i>`;
    // append deleteIcon to a task
    li.appendChild(deleteIcon);
    // append task to the ul in the DOM
    taskList.appendChild(li);
    // add to local storage
    addToLocalStorage(li.textContent);
    // clear the input
    taskInput.value = '';
    // console.log(task.textContent);
  }
}


// add tasks to local storage
function addToLocalStorage(task) {
  let tasks;
  task = taskInput.value;
  tasks = localStorage.getItem('tasks') === null ? [] : JSON.parse(localStorage.getItem('tasks'));
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  alert('Added to Local Storage');
}

// is delete icon clicked?
function checkValidClick(e) {
  if (e.target.parentElement.classList.contains('delete-item')) return true;
}

// delete task
function deleteTask(e) {
  if (checkValidClick(e)) {
    if (confirm('Are you sure you want to delete task?')) {
      e.target.parentElement.parentElement.remove();

      // delete from local storage as well
      deleteTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// remove from local storage
function deleteTaskFromLocalStorage(taskItem) {
  // first check ls
  let tasks;
  task = taskInput.value;
  tasks = localStorage.getItem('tasks') === null ? [] : JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach((task, idx) => {
    if (taskItem.textContent === task) {
      tasks.splice(idx, 1);
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks
// function clearTasks() {
//   while (taskList.firstChild) {
//     if (confirm('Are you sure you want to clear tasks?')) taskList.removeChild(taskList.firstChild);
//   }
// }

// or
function clearTasks(e, tasks) {
  e.preventDefault();
  tasks = taskList;
  if (tasks.childElementCount) {
    if (confirm('Are you sure you want to clear tasks?')) {
      [...tasks.children].forEach(child => child.remove());
    }
  } else {
    return;
  }

  clearTasksFromLocalStorage();
}

// clear tasks from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(task => {
    let item = task.firstChild.textContent;
    if (item.toLocaleLowerCase().indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}