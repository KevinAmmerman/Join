

function getSummary() {
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


    if (currentHour >= 4 && currentHour < 12) {
        return greetings.morning;
    }
    else if (currentHour >= 12 && currentHour < 18) {
        return greetings.afternoon;
    }
    else {
        return greetings.evening;
    }
};

function greet() {
    loadUsers();
    const urlParams = new URLSearchParams(window.location.search);
    const userNames = urlParams.get('users');
    const guestNames = guestUser[0]['guestName'];
    let greetUser = document.getElementById('userSign');
    let greetinghtml = document.getElementById('greetings');
    greetinghtml.innerHTML = greetings();

    if (userNames) {

        greetUser.innerHTML = `<span>${userNames}</span>`;

    } else {
        greetUser.innerHTML = `<span>${guestNames}</span>`;
    }
    if (urlParams.has('users')) {
        greetUser.innerHTML = `<span>${userName}</span>`;
        localStorage.setItem('userName', userName);
    } else if (userName) {
        localStorage.getItem('userName', userName);
        greetUser.innerHTML = `<span>${userName}</span>`;
    } else {
        greetUser.innerHTML = `<span>Guest</span>`;
    }

}


function deadlineTime() {
    const time = new Date().getHours();

}


function goToBoard() {
    window.location.href = 'board.html';
}


