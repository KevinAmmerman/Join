function truncateText(text) {
    let maxLength = 30; 
    if (text.length > maxLength) {
        let abridgedText = text.slice(0, maxLength) + '...';
        return abridgedText;
    } else {
        return text;
    }
}


function checkIfSubtaskIsDone(subtask) {
    let finishedSubtasks = 0;
    for (let i = 0; i < subtask.length; i++) {
        const status = subtask[i].status;
        if(status == false) {
            finishedSubtasks++
        } else {
            continue;
        }
    }
    return finishedSubtasks;
}


function calculateProgress(subtasklength, finishedSubtasks) {
    let result = finishedSubtasks / subtasklength * 100;
    let roundedResult = result.toFixed(2);
    return roundedResult;
}


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


function getColorForInitials(name) {
    let firstLetter = name.split(' ')[1][0].toLowerCase();
    let index = firstLetter.charCodeAt(0) - 'a'.charCodeAt(0);
    return initialsColors[index];
}


function deUmlaut(value) {
    value = value.toLowerCase();
    value = value.replace(/ä/g, 'ae');
    value = value.replace(/ö/g, 'oe');
    value = value.replace(/ü/g, 'ue');
    return value;
}


function closeTaskInfo() {
    let taskInfoContainer = document.getElementById('taskInfoContainer');
    taskInfoContainer.classList.add('dNone');
}