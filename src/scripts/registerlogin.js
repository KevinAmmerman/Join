let userName;

/**
 * Initializes the login process.
 * - Loads user data.
 * - Loads email and password from storage.
 * - Displays sign-in messages.
 */
function logininit() {
    loadUser();
    loadEmailPassword();
    messageSignIn();
}

/**
 * Retrieves the expiration time for a cookie.
 * @returns {Date} The expiration time for the cookie.
 */
function getCookieExpireTime() {
    let now = new Date();
    let time = now.getTime();
    let expireTime = time + 1 * 60 * 60 * 1000;
    now.setTime(expireTime);
    return now;
}

/**
 * Loads user data from storage.
 */
async function loadUser() {
    users = JSON.parse(await getItem('users'));
}

/**
 * Handles the login process.
 */
async function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find((u) => u.email == email.value && u.password == password.value);
    if (user) {
        email.value = '';
        password.value = '';
        rememberLogin(email.value, password.value);
        userName = user.names;
        saveUserNameInLocalStorage();
        window.location.href = 'summary.html';
    } else {
        showError();
    }
}

/**
 * Handles the guest login process.
 */
function guestLogin() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    if (guestUser) {
        email.value = guestUser[0]['email'];
        password.value = guestUser[0]['Password'];
        userName = 'guest';
        saveUserNameInLocalStorage();
        window.location.href = `summary.html?guestUser=${guestUser.guestName}`;
    }
}

/**
 * Displays an error message for login failure.
 */
function showError() {
    document.getElementById('login-user-error').classList.remove('dNone');
    setTimeout(hideError, 3000);
}

/**
 * Hides the login error message.
 */
function hideError() {
    document.getElementById('login-user-error').classList.add('dNone');
}

/**
 * Loads the email and password from storage.
 */
function loadEmailPassword() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let checkbox = document.getElementById('loginCheckbox');
    let rememberMeChecked = localStorage.getItem('rememberMeChecked');
    if (rememberMeChecked === 'true') {
        checkbox.checked === true;
        email.value = localStorage.getItem('email');
        password.value = localStorage.getItem('password');
    } else {
        checkbox.checked = false;
        email.value = '';
        password.value = '';
    }
}

/**
 * Stores the login email and password in local storage.
 * @param {string} email - The login email.
 * @param {string} password - The login password.
 */
function rememberLogin(email, password) {
    let checkbox = document.getElementById("loginCheckbox");
    if (checkbox.checked) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("rememberMeChecked", "true");
    } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.setItem("rememberMeChecked", "false");
    }
}

/**
 * Displays sign-in messages and handles their visibility.
 */
async function messageSignIn() {
    await loadUsers();
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    if (msgBox) {
        msgBox.innerHTML = msg;
    }
    const alreadyShown = await getItem('users', JSON.stringify(users));
    if (!alreadyShown && !user.length) {
        await setItem('alreadyShown', true)
        setTimeout(() => {
            msgBox.classList.remove('dNone');
        }, 2000);
    }
    setTimeout(() => {
        msgBox.classList.add('dNone');
    }, 5000);
}

/**
 * Handles the registration process.
 */
async function register() {
    const registerBtn = document.getElementById('registerBtn');
    registerBtn.disabled = true;
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    users.push({
        names: name.value,
        email: email.value,
        password: password.value,
    });
    window.location.href = 'index.html?msg=Du hast dich erfolgreich registriert!';
    await setItem('users', JSON.stringify(users));
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit'), function (event) {
        event.preventDefault();
    }
    messageSignIn();
}

/**
 * Resets the registration form fields.
 */
function resetForm() {
    names.value = '';
    email.value = '';
    password.value = '';
    registerBtn.disabled = false;
}

/**
 * Saves the user's name in local storage.
 */
function saveUserNameInLocalStorage() {
    let userNameAsString = JSON.stringify(userName);
    localStorage.setItem('userName', userNameAsString);
}