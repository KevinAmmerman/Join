let menuToggle = false;

/**
 * Includes HTML content from external files.
 * @returns {Promise} - A promise that resolves when the HTML content has been included.
 */
async function includeHTML() {
    return new Promise(async function (resolve) {
        let includeElements = document.querySelectorAll('[w3-include-html]');
        for (let i = 0; i < includeElements.length; i++) {
            const element = includeElements[i];
            file = element.getAttribute("w3-include-html"); // "includes/header.html"
            let resp = await fetch(file);
            if (resp.ok) {
                element.innerHTML = await resp.text();
            } else {
                element.innerHTML = 'Page not found';
            }
            // Need this to initialize event listeners after addTaskContainer Template was rendered to HTML 
            if (i === includeElements.length - 1) {
                try {
                    initAddTasks();
                } catch (error) {
                }
                resolve();
            }
        }
    });
}

/**
 * Toggles the visibility of a menu. This function changes the display state of the menu
 * based on a boolean flag 'menuToggle'. It also sets up an event listener to handle clicks outside the menu.
 */
function toggleMenu() {
    const menu = document.getElementById('logo-container');
    startEventListener(menu);
    menuToggle = !menuToggle;
    if (menuToggle) {
        menu.classList.remove('dNone');
    } else {
        menu.classList.add('dNone');
    }

}

/**
 * Sets up an event listener to close the menu when clicking outside of it. This function is called 
 * to ensure the menu is closed when the user interacts with other parts of the application.
 * 
 * @param {HTMLElement} menu - The DOM element representing the menu to be toggled.
 */
function startEventListener(menu) {
    const button = document.getElementById('guestLogin');
    document.addEventListener('click', (event) => {
        if (menuToggle && !button.contains(event.target) && !menu.contains(event.target)) {
            menu.classList.add('dNone');
            menuToggle = false;
        }
    })
}

/**
 * Logs out the user and redirects to the login page.
 */
function logout() {
    window.location.href = 'index.html';
}

/**
 * Adds the 'activeLink' class to the specified menu item, defaulting to 'impressumLink' if no ID is provided.
 * @param {string} id - The ID of the menu item.
 */
function addActiveToMenu(id) {
    if (id.includes('Link')) {
        let active = document.getElementById(id);
        active.classList.add('activeLink');
    }
    if (id.includes('mobile')) {
        let active = document.getElementById(id);
        active.classList.add('activeLinkMobil');
    }
}

/**
 * Generates the logo for the logged-in user based on their username.
 */
function generateLoggedinUserLogo() {
    getUserNameFromLocalStorage();
    let logoContainer = document.getElementById('guestLogin');
    if (userName.toLowerCase() === 'guest') {
        logoContainer.classList.add('guestUserLogo');
    } else {
        let nameWithoutUmlauts = deUmlaut(userName);
        let loggedinUser = nameWithoutUmlauts.match(/\b\w/g).join('').toUpperCase();
        logoContainer.classList.add('loggedinUserLogo');
        logoContainer.innerHTML = `<div>${loggedinUser}</div>`;
    }
}

/**
 * Removes umlauts from a given value.
 * @param {string} value - The value to remove umlauts from.
 * @returns {string} - The value without umlauts.
 */
function deUmlaut(value) {
    value = value.toLowerCase();
    value = value.replace(/ä/g, 'ae');
    value = value.replace(/ö/g, 'oe');
    value = value.replace(/ü/g, 'ue');
    return value;
}

/**
 * Saves the user's name in local storage.
 */
function saveUserNameInLocalStorage() {
    let userNameAsString = JSON.stringify(userName);
    localStorage.setItem('userName', userNameAsString);
}

/**
 * Retrieves the user's name from the local storage.
 */
function getUserNameFromLocalStorage() {
    let userNameAsString = localStorage.getItem('userName');
    userName = JSON.parse(userNameAsString);
}

/**
 * Initializes the impressum page by adding the 'activeLink' class to the menu item and generating the logged-in user logo.
 */
function initImpressum() {
    addActiveToMenu('impressumLink');
    generateLoggedinUserLogo();
}


function initPrivacy() {
    addActiveToMenu('privacyLink');
    generateLoggedinUserLogo();
}