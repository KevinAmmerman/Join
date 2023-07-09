function init() {
    loadUsers();
}


async function loadUsers() {
    users = JSON.parse(await getItem('users'));
}


async function forgetPassword() {
    loadUsers();
    setTimeout(() => window.location.href = 'resetpassword.html', 4000)
    sendEmailAlert();
}



function resetPassword() {
    const continuePassword = document.getElementById('confirmPasswordReset');
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (newPassword === confirmPassword) {
        continuePassword.classList.remove('dNone');
        setTimeout(() => continuePassword.classList.add('dNone'), 2500)
        setTimeout(() => window.location.href = 'index.html', 2000)
    } else {
        alert('Password is not identic')
    }
}

function sendEmailAlert() {
    let sendEmail = document.getElementById('sendMail');
    let sendButton = document.getElementById('sendButton');
    let passwordContinue = document.getElementById('confirmPasswordReset');
    if (sendButton) {
        setTimeout(function () {
            sendEmail.classList.remove('dNone')
            passwordContinue.classList.remove('dNone');
        }, 900)
        setTimeout(function () {
            sendEmail.classList.add('dNone');
            passwordContinue.classList.add('dNone');
        }, 200)
    }
}









