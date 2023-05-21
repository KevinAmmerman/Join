let allTasksAmount = 0;
let allPrioOne = 0;
let mostUrgentDates = [];
let upcomingDeadline;

async function getSummary() {
    tasks = JSON.parse(await getItem('tasks'));
    users = JSON.parse(await getItem('users'));
    generateSummaryTemplate();
    showGreetings();
    showGreetingName();
    renderAmountOfTasks();
    filterForPrio();
    mostUrgent();
}


function showGreetings() {
    const currentHour = new Date().getHours();
    greetings;
    if (currentHour >= 4 && currentHour < 12) {
        greetings = 'Good morning,';
    }
    else if (currentHour >= 12 && currentHour < 18) {
        greetings = 'Good afternoon,';
    }
    else {
        greetings = 'Good evening,';
    }
    document.getElementById('greetings').innerHTML = greetings;
};


async function showGreetingName() {
    let user = JSON.parse(await getItem('users'));
    let userName = user.names;
    const guestNames = guestUser[0]['guestName'];
    let greetUser = document.getElementById('userGreeting');
    if (userName === undefined) {
        greetUser.innerHTML = `<span>${guestNames}</span>`;
    }
    else {
        greetUser.innerHTML = `<span>${userName}</span>`;
    }
}


function goToBoard() {
    window.location.href = 'board.html';
}


function renderAmountOfTasks() {
    let id = ['summarytoDo', 'summaryTaskInProgress', 'summaryTaskInAwaitingFeedback', 'summarytoDoDone'];
    let categories = ['toDo', 'inProgress', 'feedback', 'done'];
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        let number = tasks[category].length;
        document.getElementById(id[i]).innerHTML = createHtmlforTasksAmount(number);
        allTasksAmount += number;
    }
    renderAllAmountOfTasks();
}


function renderAllAmountOfTasks() {
    document.getElementById('summaryTaskInBoard').innerHTML = createHtmlforTasksAmount(allTasksAmount);
}

function filterForPrio() {
    let categories = ['toDo', 'inProgress', 'feedback', 'done'];
    for (let i = 0; i < categories.length; i++) {
        const catergory = categories[i];
        for (let j = 0; j < tasks[catergory].length; j++) {
            const prio = tasks[catergory][j].prio;
            if (prio == 1) {
                allPrioOne += prio;
            }
        }
    }
    document.getElementById('summaryUrgentCount').innerHTML = allPrioOne;
}


function mostUrgent() {
    let categories = ['toDo', 'inProgress', 'feedback', 'done'];
    for (let i = 0; i < categories.length; i++) {
        const catergory = categories[i];
        for (let j = 0; j < tasks[catergory].length; j++) {
            const date = tasks[catergory][j].date;
            mostUrgentDates.push(parseInt(convertToInteger(date)));
        }
    }
    upcomingDeadline = Math.min(...mostUrgentDates);
    convertToDate();
}


function convertToInteger(date) {
    return date.replace(/-/g, '');
}


function convertToDate() {
    let year = Math.floor(upcomingDeadline / 10000);
    let month = Math.floor((upcomingDeadline % 10000) / 100) - 1;
    let day = upcomingDeadline % 100;
    let date = new Date(year, month, day).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });;
    document.getElementById('summaryDate').innerHTML = date;
}
