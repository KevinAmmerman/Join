function guestLogin(){
    let guest = {'firstname': 'Guest', 
    'lastname': '', 
    'email': 'guest-login@join.com', 
    'password': 12345, 
    'remember': false
};
    
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