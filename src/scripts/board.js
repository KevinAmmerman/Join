async function init() {
    tasks = JSON.parse(await getItem('tasks'));
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
        renderInitinalsForAssingetPeople(column, i);
    }
}

function renderInitinalsForAssingetPeople(column, i) {
    let assignedTo = document.getElementById(`assignedTo${column}${i}`);
    if (tasks[column][i].assignedTo && tasks[column][i].assignedTo.length > 0) {
        for (let p = 0; p < tasks[column][i].assignedTo.length; p++) {
            const person = tasks[column][i].assignedTo[p];
            if (p < 3) {
                assignedTo.innerHTML += createHtmlForAssignedPeopleTask(person);
            } else {
                assignedTo.innerHTML += createHtmlForAdditional(tasks[column][i].assignedTo.length - 3);
                return;
            }
        }
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
            assignedToContainer.innerHTML += createHtmlForAssignedPeople(person, p);
        }
    } else {
        return;
    }
}


function editTask() {
    let taskInfoContainer = document.getElementById('taskInfoContainer');
    taskInfoContainer.innerHTML = ''
}