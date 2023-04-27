let users = [];


async function init(){
    loadUsers();
    signUp();
}

async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
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

    
    resetForm();
}

function resetForm() {
    names.value = '';
    email.value = '';
    password.value = '';
    registerBtn.disabled = false;
}

function signUp(){
  let registerBtn = document.getElementById('registerBtn');

  if(registerBtn = true){
    document.getElementById('msgBox').classList.remove('d-none');

  }else{
    document.getElementById('msgBox').classList.add('d-none');
  }


}