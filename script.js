// Get the task input field and task list
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
let taskCounter = 1;

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${taskCounter}. ${taskText}</span>
      <button onclick="completeTask(this)">Complete</button>
      <button onclick="removeTask(this)">Remove</button>
    `;
    taskList.appendChild(li);
    taskInput.value = '';
    taskCounter++;

    updateLocalStorage();
  }
}

// Function to mark a task as completed
function completeTask(button) {
  const taskItem = button.parentElement;
  taskItem.classList.toggle('completed');
  updateLocalStorage();
}

// Function to remove a task
function removeTask(button) {
  const taskItem = button.parentElement;
  taskItem.remove();
  updateLocalStorage();
}

// Function to clear all tasks
function clearAll() {
  taskList.innerHTML = '';
  localStorage.clear();
  taskCounter = 1;
}

// Function to update local storage with tasks
function updateLocalStorage() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(task => {
    const taskText = task.querySelector('span').innerText;
    const isCompleted = task.classList.contains('completed');
    tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${taskCounter}. ${task.text}</span>
      <button onclick="completeTask(this)" ${task.completed ? 'disabled' : ''}>Complete</button>
      <button onclick="removeTask(this)">Remove</button>
    `;
    if (task.completed) {
      li.classList.add('completed');
    }
    taskList.appendChild(li);
    taskCounter++;
  });
});
