document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskTitleInput = document.getElementById('task-title');
    const taskCategorySelect = document.getElementById('task-category');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    const loadTasks = () => JSON.parse(localStorage.getItem('tasks')) || [];

    let tasks = loadTasks();

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskItem.dataset.id = task.id;

            const taskDetails = document.createElement('div');
            taskDetails.className = 'task-details';

            const taskTag = document.createElement('div');
            taskTag.className = `task-tag tag-${task.color}`;

            const taskTitle = document.createElement('span');
            taskTitle.className = 'task-title';
            taskTitle.textContent = task.title;

            const taskCategory = document.createElement('span');
            taskCategory.className = `task-category category-${task.category}`;
            taskCategory.textContent = task.category;

            taskDetails.appendChild(taskTag);
            taskDetails.appendChild(taskTitle);
            taskDetails.appendChild(taskCategory);

            const taskActions = document.createElement('div');
            taskActions.className = 'task-actions';

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';

            taskActions.appendChild(deleteBtn);

            taskItem.appendChild(taskDetails);
            taskItem.appendChild(taskActions);

            taskList.appendChild(taskItem);
        });
    };

    const addTask = (e) => {
        e.preventDefault();
        const title = taskTitleInput.value.trim();
        const category = taskCategorySelect.value;
        const color = document.querySelector('input[name="color"]:checked').value;

        if (title) {
            const newTask = {
                id: Date.now(),
                title,
                category,
                color,
                completed: false
            };

            tasks.push(newTask);
            saveTasks();
            renderTasks();
            taskForm.reset();
        }
    };

    const handleTaskListClick = (e) => {
        const target = e.target;
        const taskItem = target.closest('.task-item');
        if (!taskItem) return;

        const taskId = Number(taskItem.dataset.id);
        const taskIndex = tasks.findIndex(task => task.id === taskId);

        if (target.classList.contains('delete-btn')) {
            tasks.splice(taskIndex, 1);
        } else {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
        }

        saveTasks();
        renderTasks();
    };

    taskForm.addEventListener('submit', addTask);
    taskList.addEventListener('click', handleTaskListClick);

    renderTasks();
});
