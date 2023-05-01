let user = [];


function init(){
    messageSignIn();
    loadUsers();
    loadEmailPassword();
}

function loadEmailPassword(){
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let checkbox = document.getElementById('loginCheckbox');
    let rememberMeChecked = localStorage.getItem('rememberChecked');

    if(rememberMeChecked === 'true'){
        checkbox.checked === true;
        email.value = localStorage.getItem('email');
        password.value = localStorage.getItem('password');
        }else{
            checkbox.checked = false;
            email.value = '';
            password.value = '';

        }

}

async function login(){
    await loadUsers();
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find( u => u.email == email.value && u.password == password.value);

    if(user){
        rememberLogin(email.value, password.value);
        email.value = '';
        password.value = '';
        window.location.href = `summary.html?users=${user.name}`;
    }else{
        alert('try again');
    }
    user = [];}

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

async function guestLogin(){
   await loadUsers();
   let email = document.getElementById('email');
   let password = document.getElementById('password');

   email.value = 'guest@guest.com';
   password.value = '123456';

   let users = user.find(u => u.email == email.value && u.password == password.value);
    currentUser = user.name;
    if(user){
        email.value = '';
        password.value = '';
        window.location.href = `summary.html?user=${currentUser}`;
    }
    
user = [];

}

async function loadUsers(){
    users = JSON.parse(await getItem('users'))
    
}



function messageSignIn(){
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    if(msg) {
        msgBox.innerHTML = msg;
        
    }

}