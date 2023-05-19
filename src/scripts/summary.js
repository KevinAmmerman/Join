

async function getSummary(){
    loadUsers();
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
    const loadingUsers = users;
    const guestNames = guestUser[0]['guestName'];
    let greetUser = document.getElementById('userGreeting');
    
        

      if(loadingUsers) { 
        
        greetUser.innerHTML = `<span>${loadingUsers}</span>`;
            
    } 
    else {
        greetUser.innerHTML = `<span>${guestNames}</span>`;
    }
}



function deadlineTime(){
    const time = new Date().getHours();

}


function goToBoard(){
    window.location.href = 'board.html';
}


