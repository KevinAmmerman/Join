let rememberMe = false;

/**
 * Initializes the login process.
 * - Loads user data.
 * - Loads email and password from storage.
 * - Displays sign-in messages.
 */
async function logininit(login) {
    await loadUser();
    if (login) loadEmailPassword();
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
        rememberLogin(email.value, password.value);
        userName = user.names;
        email.value = '';
        password.value = '';
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
        userName = 'Guest';
        saveUserNameInLocalStorage();
        window.location.href = `summary.html`;
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
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const checkbox = document.getElementById('remember-me-checkbox');
    let rememberMeChecked = JSON.parse(localStorage.getItem('rememberMeChecked'));
    if (rememberMeChecked === true) {
        checkbox.src = 'src/img/checked.png';
        rememberMe = true;
        email.value = localStorage.getItem('email');
        password.value = localStorage.getItem('password');
    } else {
        checkbox.src = 'src/img/unchecked.png';
        email.value = '';
        password.value = '';
    }
}

/**
 * Stores or removes user login information in localStorage based on the 'rememberMe' flag.
 * If 'rememberMe' is true, the user's email and password are stored. Otherwise, they are removed.
 * This function also updates the 'rememberMeChecked' item in localStorage to reflect the user's choice.
 * 
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 */
function rememberLogin(email, password) {
    if (rememberMe) {
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
 * Toggles the 'rememberMe' boolean flag and updates the checkbox image source accordingly.
 * If 'rememberMe' is true, it sets the checkbox image to indicate a checked state.
 * If false, it changes the image to an unchecked state.
 */
function toggleRememberMe() {
    const checkbox = document.getElementById('remember-me-checkbox');
    rememberMe = !rememberMe;
    if (rememberMe) {
        checkbox.src = 'src/img/checked.png';
    } else {
        checkbox.src = 'src/img/unchecked.png';
    }
}

/**
 * Displays sign-in messages and handles their visibility.
 */
async function messageSignIn() {
    let regMsg = document.getElementById('regMsg');
    if (getNewRegistration()) {
        regMsg.classList.remove('dNone');
        setTimeout(() => regMsg.classList.add('dNone'), 2000);
    }
    setNewRegistration(false);
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
    let confirmPassword = document.getElementById('confirm-password');
    if (password.value === confirmPassword.value) {
        addUser(name, email, password);
        await setItem('users', JSON.stringify(users));
        setNewRegistration(true);
        window.location.href = 'index.html';
    }
}

function checkPassword() {
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirm-password');
    let error = document.getElementById('password-error');
    if (password.value !== confirmPassword.value) {
        error.classList.remove('dNone');
    } else {
        error.classList.add('dNone');
    }

}

/**
 * Adds a new user to the users array.
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 */
function addUser(name, email, password) {
    users.push({
        names: name.value,
        email: email.value,
        password: password.value,
    });
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
 * Sets the value of new registration in local storage.
 * @param {boolean} value - The value of new registration.
 */
function setNewRegistration(value) {
    let isNewRegistered = value;
    localStorage.setItem('newReg', isNewRegistered);
}

/**
 * Retrieves the value of new registration from local storage.
 * @returns {boolean} - The value of new registration.
 */
function getNewRegistration() {
    let value = localStorage.getItem('newReg');
    return isNewRegistered = JSON.parse(value);
}