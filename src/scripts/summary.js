let allTasksAmount = 0;
let allPrioOne = 0;
let mostUrgentDates = [];
let upcomingDeadline;

/**
 * Retrieves a summary.
 * - Loads tasks and users from storage.
 * - Generates a summary template.
 * - Displays greeting messages.
 * - Displays the user's name in the greeting.
 * - Renders the number of tasks.
 * - Filters by priority.
 * - Finds the most urgent task.
 */
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

/**
 * Displays greeting messages based on the current time of day.
 */
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

/**
 * Displays the user's name in the greeting.
 */
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

/**
 * Redirects to the 'board.html' page.
 */
function goToBoard() {
    window.location.href = 'board.html';
}

/**
 * Renders the number of tasks for different categories.
 */
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

/**
 * Renders the total number of tasks.
 */
function renderAllAmountOfTasks() {
    document.getElementById('summaryTaskInBoard').innerHTML = createHtmlforTasksAmount(allTasksAmount);
}

/**
 * Filters tasks by priority.
 */
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

/**
 * Finds the most urgent task.
 */
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

/**
 * Converts a date to an integer by removing the hyphens.
 * @param {string} date - The date to convert in the format "YYYY-MM-DD".
 * @returns {number} The integer representation of the date.
 */
function convertToInteger(date) {
    return date.replace(/-/g, '');
}

/**
 * Converts the upcoming deadline to the date format "Month Day, Year".
 */
function convertToDate() {
    let year = Math.floor(upcomingDeadline / 10000);
    let month = Math.floor((upcomingDeadline % 10000) / 100) - 1;
    let day = upcomingDeadline % 100;
    let date = new Date(year, month, day).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });;
    document.getElementById('summaryDate').innerHTML = date;
}
