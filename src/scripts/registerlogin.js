function init(){
    loadUsers();
    loadEmailPassword();
    messageSignIn(); 
}




function getCookieExpireTime() {
    let now = new Date();
    let time = now.getTime();
   
    let expireTime = time + 1 * 60 * 60 * 1000; 
    now.setTime(expireTime); 
    return now;
  }

async function loadUsers(){
    users = JSON.parse(await getItem('users'));
    
}





async function login(){
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find( (u) => u.email == email.value && u.password == password.value);

    if(user){
        email.value = '';
        password.value = '';
        rememberLogin(email.value, password.value);
        window.location.href = `summary.html?user=${user.name}`;
    } else{
        showError();
    }
}


function guestLogin(){
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    
   

    if(guestUser){
        email.value = guestUser[0]['email'];
        password.value = guestUser[0]['Password'];
    
    window.location.href = `summary.html?guestUser=${guestUser.name}`;
}
}

function showError(){
    document.getElementById('login-user-error').classList.remove('dNone');
    setTimeout(hideError, 3000);
}

function hideError(){
    document.getElementById('login-user-error').classList.add('dNone');
}


function loadEmailPassword(){
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let checkbox = document.getElementById('loginCheckbox');
    let rememberMeChecked = localStorage.getItem('rememberMeChecked');

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


async function messageSignIn(){
     await loadUsers();
    
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
   
    if(msgBox){
    msgBox.innerHTML = msg;
}        
    const alreadyShown = await getItem('users', JSON.stringify(users));  
    if(!alreadyShown && !user.length){
        await setItem('alreadyShown', true)
        setTimeout ( () => {
        msgBox.classList.remove('dNone');
        
    }, 2000);
    
}  

setTimeout(() => {
    msgBox.classList.add('dNone');
}, 5000); 

}






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


