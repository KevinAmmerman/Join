function createHtmlForTasks(task, column, i) {
    let title = task.title;
    let description = truncateText(task.description);
    let category = task.category.name;
    let categoryColor = task.category.color;
    let prio = checkPrioStatus(task.prio, 'path');
    let subtasklength = task.subtask.length;
    let finishedSubtasks = checkIfSubtaskIsDone(task.subtask); 
    let progress = calculateProgress(subtasklength, finishedSubtasks);
    return `
        <div class="task" onclick="openTask('${column}', ${i})">
            <div class="category" style="background-color: ${categoryColor}">${category}</div>
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
    let category = tasks[column][i].category.name;
    let categoryColor = tasks[column][i].category.color;
    let date = tasks[column][i].date;
    let prioImage = checkPrioStatus(tasks[column][i].prio, 'path');
    let prio =  checkPrioStatus(tasks[column][i].prio, 'word');
    let prioColor = getPrioColor(tasks[column][i].prio);
    return `
        <div class="taskEditContainer">
            <img src="src/img/img_board/cross.png" alt="cross for closing the window" class="closeBtn" onclick="closeTaskInfo()">
            <div class="category" style="background-color: ${categoryColor}">${category}</div>
            <h3 class="title titleEditWindow">${title}</h3>
            <div class="description">${description}</div>
            <div class="dateContainer">
                <div class="subheadlineStyle">Due date:</div>
                <div class="dateValue">${date}</div>
            </div>
            <div class="priorityContainer">
                <div class="subheadlineStyle">Priority:</div>
                <div class="priorityValue" style="background-color: ${prioColor}">${prio}<img src="${prioImage}"></div>
            </div>
            <div class="assignedToMainContainer">
                <div class="subheadlineStyle">Assigned to:</div>
                <div id="assignedToContainer"></div>
            </div>
            <div class="editDeleteContainer">
                <div class="left"></div>
                <div onclick="editTask('${column}', ${i})" class="right">
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

function createHtmlForAssignedPeopleTask(person, p) {
    let initialsColor = getColorForInitials(person)
    let nameWithoutUmlauts = deUmlaut(person);
    let initials = nameWithoutUmlauts.match(/\b\w/g).join('').toUpperCase();
    return `
        <div class="assignedPersonInitials">
            <div class="initials" style="background-color: ${initialsColor}">${initials}</div>
        </div>
    `;
}


function createHtmlForAdditional(amount) {
    return `
        <div class="assignedPersonInitials">
            <div class="initials" style="background-color: #2A3647">+${amount}</div>
        </div>
    `;
}


function createHtmlForEditTask() {
    return `
        <div class="taskEditContainer editTaskGap">
            <img src="src/img/img_board/cross.png" alt="cross for closing the window" class="closeBtn" onclick="closeTaskInfo()">
            <div class="leftEditContainer">
                <label class="editTitle">Title</label>
                <input type="text" id="inputEditTitle" placeholder="Enter a title" required>
                <label class="editDescription">Description</label>
                <textarea id="inputEditDescription" placeholder="Enter a description" method="dialog" required></textarea>
                <div class="AssignetToContainer">
                    <label>Assigned to</label>
                    <div id="assignedToInput">
                        <div>Select Contacts to assign</div>
                        <ul class="assignedList" id="assignedList">
                            
                        </ul>
                    </div>
                </div>
            </div>
            <div class="rightEditContainer">
                <label class="editDate">Due date</label>
                <input type="date" id="editDate" required>
                <div class="inputContainer">
                    <label>Prio</label>
                    <div class="prioBtn">
                        <button id="urgentBtn" onclick="addPrio(0)"><span>Urgent</span><img class="prioImg"
                                id="urgentImage" src="/src/img/img_board/urgent_prio.png"></button>
                        <button id="mediumBtn" onclick="addPrio(1)"><span>Medium</span><img class="prioImg"
                                id="mediumImage" src="/src/img/img_board/medium_prio.png"></button>
                        <button id="lowBtn" onclick="addPrio(2)"><span>Low</span><img class="prioImg"
                                id="lowImage" src="/src/img/img_board/low_prio.png"></button>
                    </div>
                    <p class="required" id="required5"></p>
                </div>
            </div>
            <button class="applyEditBtn">Ok<img src="src/img/img_contacts/ok_chop.png"alt="image of a chop"></button>          
        </div>
    `;
}


function createHtmlForAssignedList(name, p, checked) {
    return `
        <li>${name}<input type="checkbox" id="${p}" ${checked}></li>
    `;
}