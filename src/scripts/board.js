let prio;
let assignedPeople = [];

async function init() {
    tasks = JSON.parse(await getItem('tasks'));
    contacts = JSON.parse(await getItem('contacts'));
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

// EDIT TASK FUNCTIONS


function editTask(column, i) {
    let taskInfoContainer = document.getElementById('taskInfoContainer');
    taskInfoContainer.innerHTML = createHtmlForEditTask(column, i);
    assignedPeople = [];
    getValuesForTask(column, i);
    getPrioStatus(column, i);
    getAssignedTo(column, i);
    renderAssignetPeopleForEdit();
    getSubtasks(column, i);
}


function getValuesForTask(column, i) {
    document.getElementById('inputEditTitle').value = tasks[column][i].title;
    document.getElementById('inputEditDescription').value = tasks[column][i].description;
    document.getElementById('editDate').value = tasks[column][i].date;
}


function getPrioStatus(column, i) {
    let prioStatus = tasks[column][i].prio;
    if (prioStatus == 1) {
        addPrio(0);
    } else if (prioStatus == 2) {
        addPrio(1);
    } else {
        addPrio(2);
    }
}

function addPrio(status) {
    resetPrioActive(status);
}


function resetPrioActive(status) {
    let buttonId = ['urgentBtn', 'mediumBtn', 'lowBtn'];
    let imageId = ['urgentImage', 'mediumImage', 'lowImage']
    let color = ['#FB3D01', '#FFA800', '#7AE22A']
    for (let i = 0; i < buttonId.length; i++) {
        document.getElementById(buttonId[i]).style = '';
        document.getElementById(imageId[i]).style = '';
        document.getElementById(buttonId[i]).classList.remove('prioActive');
    }
    document.getElementById(buttonId[status]).style = `background-color: ${color[status]}`;
    document.getElementById(imageId[status]).style = 'filter: brightness(0) invert(1);';
    document.getElementById(buttonId[status]).classList.add('prioActive');
    prio = status + 1;
}


function getAssignedTo(column, i) {
    let assignedNames = tasks[column][i].assignedTo;
    if (contacts && contacts.length > 0) {
        for (let p = 0; p < contacts.length; p++) {
            const contactName = contacts[p].name;
            if (assignedNames.includes(contactName)) {
                assignedPeopleForEditTask(contactName, true);
            } else {
                assignedPeopleForEditTask(contactName, false);
            }
        }
    }
}

function assignedPeopleForEditTask(name, checked) {
    let assign = {
        'name': name,
        'assigned': checked
    };
    assignedPeople.push(assign);
}


function renderAssignetPeopleForEdit() {
    let assignedList = document.getElementById('assignedList');
    assignedList.innerHTML = '';
    for (let i = 0; i < assignedPeople.length; i++) {
        const assign = assignedPeople[i];
        assignedList.innerHTML += createHtmlForAssignedList(assign, i)
    }
}

function changeAssignedStatus(i) {
    let checked = document.getElementById(`checkbox${i}`).checked;
    assignedPeople[i].assigned = checked;
}


function getSubtasks(column, i) {
    let subtaskList = document.getElementById('subtasksList');
    subtaskList.innerHTML = '';
    if (tasks[column][i].subtask && tasks[column][i].subtask.length > 0) {
        for (let s = 0; s < tasks[column][i].subtask.length; s++) {
            const task = tasks[column][i].subtask[s];
            if (task.status == true) {
                subtaskList.innerHTML += createHtmlForSubtask(task, true, column, i, s);
            } else {
                subtaskList.innerHTML += createHtmlForSubtask(task, false, column, i, s);
            }
        }
    }
}

function changeSubtaskStatus(column, i, id, s) {
    let subtaskStatus = document.getElementById(id).checked;
    tasks[column][i].subtask[s].status = subtaskStatus;
}


function addSubtask(column, i) {
    let subtaskInput = document.getElementById('inputSubtask').value;
    let id = generateRandomId();
    let newSubtast = {
		id: id,
		title: subtaskInput,
		status: false,
	};
    tasks[column][i].subtask.push(newSubtast);
    getSubtasks(column, i);
}


async function saveChangesForTask(column, i) {
    let title = document.getElementById('inputEditTitle').value;
    let description = document.getElementById('inputEditDescription').value;
    let dueDate = document.getElementById('editDate').value;
    let prioStatus = prio;
    tasks[column][i].title = title;
    tasks[column][i].description = description;
    tasks[column][i].date = dueDate;
    tasks[column][i].prio = prioStatus;
    saveAssignedPeopleList(column, i);
    await setItem('tasks', JSON.stringify(tasks));
    init();
    openTask(column, i);
}


function saveAssignedPeopleList(column, i) {
    let changes = [];
    for (let i = 0; i < assignedPeople.length; i++) {
        const person = assignedPeople[i];
        if (person.assigned == true) {
            changes.push(person.name);
        } else {
            continue;
        }
    }
    tasks[column][i].assignedTo = changes;
}


