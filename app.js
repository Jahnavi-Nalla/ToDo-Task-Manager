const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

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

// Function to add a task to the list
function addTaskToList(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function () {
        taskList.removeChild(li);
        removeTaskFromStorage(taskText);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Add new task
addTaskBtn.addEventListener('click', function () {
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
});

// Function to remove task from localStorage
function removeTaskFromStorage(taskText) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(task => task !== taskText);
    saveTasksToStorage(tasks);
}
