const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

addTaskBtn.addEventListener('click', addTask);

// Function to get tasks from localStorage
function getTasksFromStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Function to save tasks to localStorage
function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage when the page loads
window.addEventListener('load', function () {
    const tasks = getTasksFromStorage();
    tasks.forEach(function (taskText) {
        addTaskToList(taskText);
    });
});

function editTask(event) {
    let taskListItem = event.target.parentNode;
    let taskSpan = taskListItem.querySelector('span');
    let task = taskSpan.textContent;

    taskInput.value = task;
    addTaskBtn.textContent = 'Update Task';
    addTaskBtn.removeEventListener('click', addTask);
    addTaskBtn.addEventListener('click', function() {
        updateTask(taskListItem, taskSpan);
    });
}

function updateTask(taskListItem, taskSpan) {
    let updatedTask = taskInput.value.trim();
    if (updatedTask) {
        taskSpan.textContent = updatedTask;
        addTaskBtn.textContent = 'Add Task';
        addTaskBtn.removeEventListener('click', updateTask);
        addTaskBtn.addEventListener('click', addTask);
        taskInput.value = '';
    }
}

function deleteTask(event) {
    let taskListItem = event.target.parentNode;
    taskList.removeChild(taskListItem);
    removeTaskFromStorage(taskListItem.querySelector('span').textContent);
}

// Function to add a task to the list
function addTaskToList(taskText) {
    const li = document.createElement('li');
    
    li.innerHTML = `
        <span>${taskText}</span>
       <button class="edit-btn">&#9998;</button>
        <button class="delete-btn">&#10006;</button>
    `;

    const editBtn = li.querySelector('.edit-btn');
    const deleteBtn = li.querySelector('.delete-btn');

    editBtn.addEventListener('click', editTask);
    deleteBtn.addEventListener('click', deleteTask);

    taskList.appendChild(li);
}

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Task cannot be empty!');
        return;
    }

    addTaskToList(taskText);

    // Save task to localStorage
    const tasks = getTasksFromStorage();
    tasks.push(taskText);
    saveTasksToStorage(tasks);

    taskInput.value = ''; // Clear input after adding task
}
document.getElementById('clear-all-btn').addEventListener('click', () => {
    // Clear the task list here
    // For example, if you're using a <ul> element to display tasks:
    const taskList = document.querySelector('ul');
    taskList.innerHTML = '';
});

// Function to remove task from localStorage
function removeTaskFromStorage(taskText) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(task => task !== taskText);
    saveTasksToStorage(tasks);
}
