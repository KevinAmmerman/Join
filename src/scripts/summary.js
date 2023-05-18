

async function getSummary(){
    loadUsers();
    generateSummaryTemplate();
    showGreetings();
    changeGreetingName();
    
    
}
function setUserName(user){
    let now = getCookieExpireTime();
    const lowercaseName = user.toLowerCase().replace(' ', '');
    document.userName =
    'user = ' + lowercaseName + '; expires=' + now.toUTCString() + '; path=/';
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


function changeGreetingName(){
    let nameFromUser = document.userName;

    showGreetingName(nameFromUser);
}


function showGreetingName(nameFromUser){
    if (nameFromUser === undefined) {
        document.getElementById('userGreeting').innerHTML = 'Guest';    
    } else {
        const selectedUser = users.find(user => user.name.toLowerCase().replace(' ', '') === nameUserFormatted);
        document.getElementById('userGreeting').innerHTML = selectedUser.users;
        
    }
}



function deadlineTime(){
    const time = new Date().getHours();

}


function goToBoard(){
    window.location.href = 'board.html';
}


