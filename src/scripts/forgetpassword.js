async function loadUsers(){
    users = JSON.parse(await getItem('users'));
}


async function forgetPassword(){
    loadUsers();
    const email = document.getElementById('eMail');
    const forgotpassword = document.getElementById('sendButton')
    if(email && forgotpassword === true){
        window.location.href = 'resetpassword.html';
    }
}


function resetPassword() {
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;


    alert("Das Passwort wurde erfolgreich zurückgesetzt.");
  }


  function sendEmail(){
    document.getElementById('sendMail').classList.remove('dNone')

setTimeout(()=>{
    document.getElementById('sendMail').classList.add('dNone')
},2500)
 setTimeout(() =>{
window.location.href = 'resetpassword.html';

},4000)
  }