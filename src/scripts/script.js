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
                    initAddTasks()
                } catch (error) {
                }
                resolve();
            }
        }
    });
}


function openLogout() {
    document.getElementById('legalNoticeMobile').classList.remove('dNone');
    document.getElementById('logoutMobile').classList.remove('dNone');
    document.getElementById('logout').classList.remove('dNone');
    setTimeout(() => document.addEventListener('click', checkLogout), 0);
}


function legalNoticeMobile() {
    document.getElementById('');
}


function closeLogout() {
    document.getElementById('legalNoticeMobile').classList.add('dNone');
    document.getElementById('logoutMobile').classList.add('dNone');
    document.getElementById('logout').classList.add('dNone');
    document.removeEventListener('click', checkLogout);
}


function checkLogout(event) {
    if (event.target.id !== 'logout', 'logoutMobile', 'legalNoticeMobile') closeLogout();
}


function logout() {
    window.location.href = 'login.html';
}


function addActiveToMenu(id) {
    if (id == undefined) id = 'impressumLink';
    let active = document.getElementById(id);
    active.classList.add('activeLink');
}