let user = [];



function init(){
    loadUsers();
    loadEmailPassword();
    messageSignIn();
    
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
    loadUsers();
    
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    msgBox.innerHTML = msg;
    if(user.length === 0){
        msgBox.classList.add('dNone');
    }
           
    if(user.length === 1){
         
        setTimeout(function(){
        msgBox.classList.remove('dNone');
    },3000)
} 
}






async function register() {
    const registerBtn = document.getElementById('registerBtn');
    registerBtn.disabled = true;

    users.push({
        names: names.value,
        email: email.value,
        password: password.value,
    });
    window.location.href = 'index.html?msg=Du hast dich erfolgreich registriert!';
    await setItem('users', JSON.stringify(users));
    
    const registerForm = document.getElementById('register-form');
        registerForm.addEventListener('submit'), function(event) {
        event.preventDefault();}
    messageSignIn();
       
}
    


function resetForm() {
    names.value = '';
    email.value = '';
    password.value = '';
    registerBtn.disabled = false;
    
    
}

