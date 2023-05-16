function init(){
    loadUsers();
    loadEmailPassword();
    messageSignIn(); 
}





async function loadUsers(){
    users = JSON.parse(await getItem('users'));
    
}


async function login(){
    await loadUsers();
    
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find( u => u.email == email.value && u.password == password.value);

    if(user && user.email === email.value && user.password === password.value){
        rememberLogin(email.value, password.value);
        email.value = '';
        password.value = '';
        window.location.href = `summary.html?users=${user.names}`;
    }else{
        alert('Try again, please.');
    }
    
    
    
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


async function guestLogin(){
  
   let email = document.getElementById('email');
   let password = document.getElementById('password');
       // email.value = 'guest@guest.com';
        //password.value = '123456';

     if(guestUser){
        email.value = guestUser[0]['guestName'];
        password.value = guestUser[0]['guestPassword'];
        window.location.href = `summary.html?guestUser=${guestUser.name}`;
         }else{
            email.value = '';
            password.value = '';
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
