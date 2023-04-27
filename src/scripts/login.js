let guest =
    {
    'email': 'guest-login@join.com', 
    'password': 12345, 
    'remember': false
};


function init(){
    messageSignIn();

}

function guestLogin(){
    let inputmail = document.getElementById('email');
        inputmail.value = guest['email'];
    let inputpassword = document.getElementById('password');
        inputpassword = guest['password'];
    setTimeout(() => {
        setActiveUser(guest);
    }, 300);


}

async function setActiveUser(user){
    activeUser = user;
    await backend.setItem('activeUser', JSON.stringify(activuser));
    window.location.href = 'summary.html';

}

function messageSignIn(){
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    if(msg) {
        msgBox.innerHTML = msg;
        
    }

}