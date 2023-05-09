function createHtmlForTasks(task, column, i) {
    let title = task.title;
    let description = truncateText(task.description);
    let category = task.category;
    // let assignedTo = task.assignedTo;
    // let date = task.date;
    let prio = checkPrioStatus(task.prio);
    let subtasklength = task.subtask.length;
    let finishedSubtasks = checkIfSubtaskIsDone(task.subtask); 
    let progress = calculateProgress(subtasklength, finishedSubtasks);
    return `
        <div class="task" onclick="openTask('${column}', ${i})">
            <div class="category">${category}</div>
            <h3 class="title">${title}</h3>
            <div class="description">${description}</div>
            <div class="subtaskBar">
                <div class="progressBar">
                    <div class="progress" style="width: ${progress}%"></div>
                </div>
                <div class="progressInNumbers" id="progressInNumbers">${finishedSubtasks}/${subtasklength}</div>
            </div>
            <div class="statusContainer">
                <div class="assignedToContainer" id="assignedTo${column}${i}"></div>
                <img src="${prio}" class="prioImage">
            </div>
        </div>
    `;
}


function createHtmlForTaskInfo(column, i) {
    let title = tasks[column][i].title;
    let description = tasks[column][i].description;
    let category = tasks[column][i].category;
    let date = tasks[column][i].date;
    // let prio = tasks[column][i].prio;
    return `
        <div class="taskEditContainer">
            <img src="src/img/img_board/cross.png" alt="cross for closing the window" class="closeBtn" onclick="closeTaskInfo()">
            <div class="category">${category}</div>
            <h3 class="title titleEditWindow">${title}</h3>
            <div class="description">${description}</div>
            <div class="dateContainer">
                <div class="subheadlineStyle">Due date:</div>
                <div class="dateValue">${date}</div>
            </div>
            <div class="priorityContainer">
                <div class="subheadlineStyle">Priority:</div>
                <div class="priorityValue"></div>
            </div>
            <div class="assignedToMainContainer">
                <div class="subheadlineStyle">Assigned to:</div>
                <div id="assignedToContainer"></div>
            </div>
            <div class="editDeleteContainer">
                <div class="left"></div>
                <div class="right">
                    <img src="src/img/img_board/pencil.png" alt="image of a pencil">
                </div>
            </div>
        </div>
    `;
}

function createHtmlForAssignedPeople(person) {
    let initialsColor = getColorForInitials(person)
    let nameWithoutUmlauts = deUmlaut(person);
    let initials = nameWithoutUmlauts.match(/\b\w/g).join('').toUpperCase();
    return `
        <div class="assignedPerson">
            <div class="initials" style="background-color: ${initialsColor}">${initials}</div>
            <span>${person}</span>
        </div>
    `;
}