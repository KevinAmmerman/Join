

async function getSummary() {
    await init();
   
    generateSummaryTemplate();
    loadUsers();
    greet();
    
    
}




function greetings() {
    const currentHour = new Date().getHours();
    
    let greetings = {
    morning: 'Good morning,',
    afternoon: 'Good afternoon,',
    evening: 'Good evening,'
  };


    if(currentHour >= 4 && currentHour < 12){
        return greetings.morning;
    }
    else if (currentHour >= 12 && currentHour < 18) {
        return greetings.afternoon;
    }
    else {
        return greetings.evening;
    }
};





function greet(){
    loadUsers();
    const urlParams = new URLSearchParams(window.location.search);
    const userNames = urlParams.get('users');
    const guestNames = guestUser[0]['guestName'];
    let greetUser = document.getElementById('userSign');
    let greetinghtml = document.getElementById('greetings');
        greetinghtml.innerHTML = greetings();

    if(userNames){
        
         greetUser.innerHTML = `<span>${userNames}</span>`;
        
    } else { 
            greetUser.innerHTML = `<span>${guestNames}</span>`;
    }
    if(urlParams.has('users')){
        greetUser.innerHTML = `<span>${userName}</span>`;
        localStorage.setItem('userName', userName);
    }   else if(userName){
            localStorage.getItem('userName', userName);
            greetUser.innerHTML = `<span>${userName}</span>`;
        }else{
              greetUser.innerHTML = `<span>Guest</span>`;
        }
    
}


function deadlineTime() {
    const time = new Date().getHours();
    let 

}


function goToBoard() {
    window.location.href = 'board.html';
}




async function renderSummary(){
    await init();
    let status = ['toDo', 'inProgress', 'feedback', 'done'];
    for (let i = 0; i < status.length; i++) {
        getTasks(status[i]);
        
    }
    getTasksInBoard();
}
function getTasksInBoard() {
    let tasksInBoard = document.getElementById('summaryTaskInBoard');
    tasksInBoard.innerHTML = tasks.length;
 
}

function getTasks(status){
    let task = document.getElementById(status);
    let count = 0;
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        if (element['status'] == status) {
            count++;
        }
    }
    task.innerHTML = count;
}

function getDatesForSummary() {
    if (tasks.length >= 1) {
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            datesForSummary.push(`${task['dueDate']}`);
        }
        datesForSummary.sort();
        let nextDate = null;
        nextDate = datesForSummary[0];
        document.getElementById('summaryDate').innerHTML = nextDate;
    } else {
        document.getElementById('summaryDate').innerHTML = 'No Task in Board';
    }
}

