let currentUser = ['Guest']

function getSummary(){
    generateSummaryTemplate();
    greet();
    greetings();
}



function greetings(){
    const currentHour = new Date().getHours();
    let greeting;

    if(currentHour >= 4 && currentHour < 12){
        greeting = 'Good morning';
    }
     else if(currentHour >= 12 && currentHour < 18){
        greeting = 'Good afternoon';
    }
    else if(currentHour >= 18 && currentHour < 4){
        greeting = 'Good evening';
    }

    return greeting;
}



async function greet(){
    let greetinghtml = document.getElementById('greetings');
        greetinghtml.innerHTML = greetings();
    let greetUser = document.getElementById('user');
    greetUser.innerHTML = `<span>${currentUser}</span>`;
    
}




function generateSummaryTemplate(){
    let content = document.getElementById('summaryContent');

    content.innerHTML = /*html*/`
        <div class="task-container" onclick="goToBoard()">
            <div class="task-container-2">
            <div class="task-progress"><span class="task-number-container"> <p>5</p></span> <span class="task-text-container"> Task in Board</span></div>
            <div class="task-progress"><span class="task-number-container"> <p>2</p></span> <span class="task-text-container"> Tasks in Progress</span></div>
            <div class="task-progress"><span class="task-number-container"> <p>2</p></span> <span class="task-text-container"> Awaiting Feedback</span></div>
            
            
            </div>
            

        <div class="task-Deadline-Container">
            
                <div class="task-Deadline-Info">
                <img src="./src/img/redCircle.png" alt="redCirlce">
               <div class="deadline-text"><p>1</p> Urgent</div>

                </div>
                
                <div class="gray-line"></div>
                <div> 
                    <span class="date"> April 16, 2023</span> <p> Upcoming Deadline</p>
               </div>

              
                 
        </div>      
        <div class="to-do-done-container">
            <div class="to-do-done-container2">
        <div class="to-do-done">  <img src="./src/img/to-do.png" alt=""><span class="to-do-done-text"><p>1</p>To-do</span></div>
       
        <div class="to-do-done"><img src="./src/img/done.png" alt=""><span class="to-do-done-text"><p>1</p>Done</span></div>
        </div>
        </div>
    </div>


    <div class="times-Container">
    <div class="times">
    <span class="time-name"><h2 id="greetings"></h2> <p id="user"></p> </span>
    </div> 

</div> `;}


function deadlineTime(){
    const time = new Date().getHours();

}


function goToBoard(){
    window.location.href = 'board.html';
}


function openLogout(){
    document.getElementById('logout').classList.remove('dNone');
    setTimeout(() => {
        document.addEventListener('click', checkLogout);
    },0)


}

function closeLogout(){
    document.getElementById('logout').classList.add('dNone');
    document.removeEventListener('click', checkLogout);
}

function checkLogout(event){
    if(event.target.id !== 'logout'){
        closeLogout();
}
}

function logout(){
    window.location.href = 'index.html';
}