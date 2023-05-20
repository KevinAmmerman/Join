

async function getSummary() {
    await init();
   
    generateSummaryTemplate();
    showGreetings();
    showGreetingName();
 
   
}




function greetings(){
    const currentHour = new Date().getHours();
    
    let greetings = {
    morning: 'Good morning,',
    afternoon: 'Good afternoon,',
    evening: 'Good evening,'
  };
    if(currentHour >= 4 && currentHour < 12){
        return greetings.morning;
    }
     else if(currentHour >= 12 && currentHour < 18){
        return greetings.afternoon;
    }
    else {
        return greetings.evening;
    }
    };

    

    function showGreetings(){
        let greetinghtml = document.getElementById('greetings');
            greetinghtml.innerHTML = greetings();
    }


 async function showGreetingName(){
    const loadingUsers = users[0];
    const guestNames = guestUser[0]['guestName'];
    let greetUser = document.getElementById('userGreeting');
    
        

      if(loadingUsers === users) { 
        
        greetUser.innerHTML = `<span>${loadingUsers}</span>`;
            
    } 
    else {
        greetUser.innerHTML = `<span>${guestNames}</span>`;
    }
}



function deadlineTime(){
    const time = new Date().getHours();
    let 

}


function goToBoard(){
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

