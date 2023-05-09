async function init() {
    // let contactsSingleQuote = await getItem('tasks');
    // tasks = JSON.parse(contactsSingleQuote.replace(/'/g, '"'));
    let tasksAsString = await getItem('tasks')
    tasks = JSON.parse(tasksAsString);
    renderTasks('toDo', 'toDo');
    renderTasks('inProgress', 'inProgress');
    renderTasks('feedback', 'feedback');
    renderTasks('done', 'done');
}


function renderTasks(column, id) {
    let columnId = document.getElementById(id)
    columnId.innerHTML = '';
    for (let i = 0; i < tasks[column].length; i++) {
        const task = tasks[column][i];
        columnId.innerHTML += createHtmlForTasks(task, column, i);
    }
}


function openTask(column, i) {
    let taskInfoContainer = document.getElementById('taskInfoContainer');
    taskInfoContainer.classList.remove('dNone');
    taskInfoContainer.innerHTML = createHtmlForTaskInfo(column, i);
    renderAssignetPeople(column, i);
}


function renderAssignetPeople(column, i) {
    let assignedToContainer = document.getElementById('assignedToContainer');
    if (tasks[column][i].assignedTo && tasks[column][i].assignedTo.length > 0) {
        for (let p = 0; p < tasks[column][i].assignedTo.length; p++) {
            const person = tasks[column][i].assignedTo[p];
            assignedToContainer.innerHTML += createHtmlForAssignedPeople(person);
        }
    } else {
        return;
    }
}


function closeTaskInfo() {
    let taskInfoContainer = document.getElementById('taskInfoContainer');
    taskInfoContainer.classList.add('dNone');
}