let user = [];
let currentUser =['Guest'];


function init(){
    messageSignIn();
    loadUsers();
    loadEmailPassword();
    signUp();
    
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
users =[];
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
        window.location.href = `summary.html?user=${users.name}`;
    }else{
        alert('try again pls');
    }
    
    
    
}

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

   let currentUser = users.find(u => u.email == email.value && u.password == password.value);
     if(users){
        email.value = '';
        password.value = '';
        window.location.href = `summary.html?user=${currentUser}`;
        
    }
    
    

}

async function loadUsers(){
    users = JSON.parse(await getItem('users'));
    
}



function messageSignIn(){
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    if(msg) {
        msgBox.innerHTML = msg;
        
    }

}




async function register() {
    registerBtn.disabled = true;
    users.push({
        names: names.value,
        email: email.value,
        password: password.value,
    });
     window.location.href = 'index.html?msg=Du hast dich erfolgreich registriert!';
    await setItem('users', JSON.stringify(users));
   
    }
    
    resetForm();
    signUp();
    

function alertMessage(message){
    
    let approvedLogin = document.getElementById('msgBox');

    approvedLogin.innerHTML = message;
    approvedLogin.classList.remove('dNone')
    
    setTimeout(function(){
        approvedLogin.classList.add('dNone')
    },2000) 
} 
    resetForm();


function resetForm() {
    names.value = '';
    email.value = '';
    password.value = '';
    registerBtn.disabled = false;
    
    signUp();
}

function signUp(){
    let registerBtn = document.getElementById('registerBtn');
    if(registerBtn = true){
    alertMessage('Du hast dich erfolgreich registriert');
}   if(registerBtn = false){
    registerBtn.disabled = false;
    registerBtn.classList.add('dNone');
}

    resetForm();
}