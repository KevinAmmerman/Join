/**
 * Truncates the text to a specified maximum length and adds ellipsis if necessary.
 * 
 * @param {string} text - The text to truncate.
 * @returns {string} - The truncated text.
 */
function truncateText(text) {
    let maxLength = 30; 
    if (text.length > maxLength) {
        let abridgedText = text.slice(0, maxLength) + '...';
        return abridgedText;
    } else {
        return text;
    }
}

/**
 * Checks the number of finished subtasks.
 * 
 * @param {Array} subtask - An array of subtasks.
 * @returns {number} - The number of finished subtasks.
 */
function checkIfSubtaskIsDone(subtask) {
    let finishedSubtasks = 0;
    for (let i = 0; i < subtask.length; i++) {
        const status = subtask[i].status;
        if(status == true) {
            finishedSubtasks++
        } else {
            continue;
        }
    }
    return finishedSubtasks;
}

/**
 * Calculates the progress percentage based on the number of finished subtasks and the total subtask length.
 * 
 * @param {number} subtasklength - The total number of subtasks.
 * @param {number} finishedSubtasks - The number of finished subtasks.
 * @returns {number} - The progress percentage rounded to two decimal places.
 */
function calculateProgress(subtasklength, finishedSubtasks) {
    let result = finishedSubtasks / subtasklength * 100;
    let roundedResult = result.toFixed(2);
    return roundedResult;
}

/**
 * Checks the priority status and returns either the image path or the corresponding word.
 * 
 * @param {number} prio - The priority value.
 * @param {string} returnTyp - The return type: 'path' for image path, 'word' for corresponding word.
 * @returns {string} - The image path or corresponding word based on the priority.
 */
function checkPrioStatus(prio, returnTyp) {
    if(prio == 1) {
        if (returnTyp == 'path') {
            return 'src/img/img_board/urgent_prio.png';
        } else if (returnTyp == 'word') {
            return 'Urgent';
        } 
    }
    if (prio == 2) {
        if (returnTyp == 'path') {
            return 'src/img/img_board/medium_prio.png'
        } else if (returnTyp == 'word') {
            return 'Medium';
        }    
    } 
    if (returnTyp == 'path') {
        return 'src/img/img_board/low_prio.png'
    } else if (returnTyp == 'word') {
        return 'Low';
    }
}

/**
 * Gets the color for the priority based on its value.
 * 
 * @param {number} prio - The priority value.
 * @returns {string} - The color code for the priority.
 */
function getPrioColor(prio) {
    if (prio == 1) {
        return '#FB3D01';
    }
    if (prio == 2) {
        return '#FFA800';
    } else {
        return '#7AE22A';
    }
}

/**
 * Gets the color for the initials of a name based on the second part of the name.
 * 
 * @param {string} name - The name to get the initials color for.
 * @returns {string} - The color for the initials.
 */
function getColorForInitials(name) {
    let firstLetter = name.split(' ')[1][0].toLowerCase();
    let index = firstLetter.charCodeAt(0) - 'a'.charCodeAt(0);
    return initialsColors[index];
}

/**
 * Replaces umlaut characters in a string with their respective ASCII representations.
 * 
 * @param {string} value - The input string to process.
 * @returns {string} - The input string with umlaut characters replaced.
 */
function deUmlaut(value) {
    value = value.toLowerCase();
    value = value.replace(/ä/g, 'ae');
    value = value.replace(/ö/g, 'oe');
    value = value.replace(/ü/g, 'ue');
    return value;
}

/**
 * Prevents the event from propagating further.
 * 
 * @param {Event} event - The event object.
 */
function doNotClose(event) {
    event.stopPropagation();
}


/**
 * Closes the task information container.
 */
function closeTaskInfo() {
    let taskInfoContainer = document.getElementById('taskInfoContainer');
    taskInfoContainer.classList.add('dNone');
    preventScrollingInBackground();
}

/**
 * Toggles the visibility of the assigned input field.
 */
function toggleAssigned() {
    document.getElementById('assignedToInput').classList.toggle('openAssigned');
}

/**
 * Checks the boolean value and returns 'checked' if true, otherwise returns undefined.
 * 
 * @param {boolean} value - The boolean value to check.
 * @returns {string|undefined} - 'checked' if the value is true, undefined otherwise.
 */
function checkBooleanValue(value) {
    if (value == true) {
        return 'checked';
    } else {
        return;
    }
}

/**
 * Generates a random ID for tasks or elements.
 * 
 * @returns {string} - The randomly generated ID.
 */
function generateRandomId() {
	const random = Math.floor(Math.random() * 1000000);
	return random.toString();
}

/**
 * Toggles the prevention of background scrolling by adding/removing the CSS class 'preventScrolling' to the main container.
 */
function preventScrollingInBackground() {
    let mainContainer = document.getElementById('boardMainContainer');
    mainContainer.classList.toggle('preventScrolling');
}

/**
 * Checks if a task has subtasks and updates the visibility of the subtask progress bar.
 * 
 * @param {Object} task - The task object.
 * @param {string} column - The column the task belongs to.
 * @param {number} i - The index of the task within the column.
 */
function checkIfSubtask(task, column, i) {
    let progressBar = document.getElementById(`subtaskBar${column}${i}`);
    let subtask = task.subtask.length;
    if(subtask == 0) {
        progressBar.classList.add('dNone');
    } else {
        return;
    }
}