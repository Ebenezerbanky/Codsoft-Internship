let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('taskDueDate').value;
    const priority = document.getElementById('taskPriority').value;

    if (title === '') {
        alert('Task title is required');
        return;
    }

    const task = {
        id: Date.now(), // unique ID for each task
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        completed: false
    };

    tasks.push(task); // add new task to tasks array
    saveTasks(); // save tasks to local storage
    renderTasks(); // re-render task list
    clearInputFields(); // clear input fields after adding task
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // clear current list

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = task.completed ? 'completed' : '';

        const taskContent = document.createElement('div');
        taskContent.innerHTML = `
            <strong>${task.title}</strong><br>
            ${task.description}<br>
            Due: ${task.dueDate}<br>
            Priority: ${task.priority}
        `;
        taskItem.appendChild(taskContent);

        const actionButtons = document.createElement('div');

        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.onclick = () => toggleTaskCompletion(task.id);
        actionButtons.appendChild(completeButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTask(task.id);
        actionButtons.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(task.id);
        actionButtons.appendChild(deleteButton);

        taskItem.appendChild(actionButtons);
        taskList.appendChild(taskItem);
    });
}

function toggleTaskCompletion(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed; // toggle completion status
    saveTasks(); // save updated tasks to local storage
    renderTasks(); // re-render task list
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id); // remove task from tasks array
    saveTasks(); // save updated tasks to local storage
    renderTasks(); // re-render task list
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDescription').value = task.description;
    document.getElementById('taskDueDate').value = task.dueDate;
    document.getElementById('taskPriority').value = task.priority;

    deleteTask(id); // remove task from list temporarily for editing
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // save tasks array to local storage
}

function clearInputFields() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskDueDate').value = '';
    document.getElementById('taskPriority').value = 'Low';
}

document.addEventListener('DOMContentLoaded', renderTasks); // render tasks when page loads