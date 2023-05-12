function init(){
    loadUsers();
    
}


async function loadUsers(){
    users = JSON.parse(await getItem('users'));
}


async function forgetPassword(){
    loadUsers();
    document.getElementById('sendMail').classList.remove('dNone')

    setTimeout(()=>{
        document.getElementById('sendMail').classList.add('dNone')
    },2500)
     setTimeout(() =>{
    window.location.href = 'resetpassword.html';
    
    },4000)
      }



function resetPassword() {
    const continuePassword = document.getElementById('confirmPasswordReset');
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

        if(newPassword === confirmPassword){


        continuePassword.classList.remove('dNone');
        setTimeout(() =>{
            continuePassword.classList.add('dNone');
        },2500)
         setTimeout(() =>{
        window.location.href = 'index.html';
        
        },4000)
    } else{
        alert('Password is not identic')
    }        
}

    

    

  


  
    