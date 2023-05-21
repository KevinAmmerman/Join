let allTasksAmount = 0;

async function getSummary() {
    tasks = JSON.parse(await getItem('tasks'));
    users = JSON.parse(await getItem('users'));
    generateSummaryTemplate();
    showGreetings();
    showGreetingName();
    renderAmountOfTasks();
    
}




function greetings() {
    const currentHour = new Date().getHours();
    
    let greetings = {
    morning: 'Good morning,',
    afternoon: 'Good afternoon,',
    evening: 'Good evening,',
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


 async function showGreetingName(){
    let user = JSON.parse(await getItem('users'));
    let userName = user.names;
    const guestNames = guestUser[0]['guestName'];
    let   greetUser = document.getElementById('userGreeting');
    
      if(userName === undefined) { 
        greetUser.innerHTML = `<span>${guestNames}</span>`;
        
        
    } 
    else {
        greetUser.innerHTML = `<span>${userName}</span>`;
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




function goToBoard() {
    window.location.href = 'board.html';
}


function renderAmountOfTasks(){
    let id = ['summarytoDo','summaryTaskInProgress' ,'summaryTaskInAwaitingFeedback','summarytoDoDone'];
    let categories = ['toDo', 'inProgress', 'feedback', 'done'];
        
    for (let i = 0; i < categories.length; i++) {
        const category= categories[i];
        let number = tasks[category].length;
        document.getElementById(id[i]).innerHTML = countBoardTopSection(number); 

        allTasksAmount += number;
    }
    
    
    renderAllAmountOfTasks(allTasksAmount) ;
}





function renderAllAmountOfTasks(allTasksAmount) {
    document.getElementById('summaryTaskInBoard').innerHTML = countBoardTopSection(allTasksAmount);

}
    
function countBoardTopSection(number){
     tasks = allTasksAmount.length;
     let toDoCount = (number);
     let doneCount = (number);
     let inProgress = (number);
     let feedBack   = (number);
     document.getElementById('summaryTaskInBoard').innerHTML = allTasksAmount;
     document.getElementById('summarytoDo').innerHTML = toDoCount;
     document.getElementById('summarytoDoDone').innerHTML = doneCount;
     document.getElementById('summaryTaskInProgress').innerHTML = inProgress;
     document.getElementById('summaryTaskInAwaitingFeedback').innerHTML = feedBack;
     
 }
 




