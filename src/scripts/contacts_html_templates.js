function createHtmlForOrder(letter) {
    return `
        <div class="contactOrder">
            <span>${letter}</span>
        </div>
    `;
}


function createHtmlForContact(contact, i, j) {
    let nameWithoutUmlauts = deUmlaut(contact.name);
    let initials = nameWithoutUmlauts.match(/\b\w/g).join('').toUpperCase();
    let name = contact.name;
    let email = contact.email;
    let contactColor = initialsColors[getColorForInitials(contact)];
    return `
        <div onclick="openContact(${i}, ${j})" class="contactCard" id="contactCard${i}${j}">
            <div class="leftPart">
                <div class="circalInitials" style="background-color: ${contactColor}">${initials}</div>
            </div>
            <div class="rightPart">
                <span>${name}</span>
                <span class="emailStyle">${email}</span>
            </div>
        </div>
    `;
}

function createHtmlForContactCard(contact, i, j) {
    let nameWithoutUmlauts = deUmlaut(contact.name);
    let initials = nameWithoutUmlauts.match(/\b\w/g).join('').toUpperCase();
    let name = contact.name;
    let email = contact.email;
    let phone = contact.phone;
    let contactColor = initialsColors[getColorForInitials(contact)];
    return `
        <div class="cardContainer" id="cardContainer">
            <div class="cardTopPart">
                <div class="circalInitialsBig" style="background-color: ${contactColor}">${initials}</div>
                <div class="contactName">
                    <span>${name}</span>
                    <div class="contactAddTask">
                        <div>+</div>Add Task
                    </div>
                </div>
            </div>
            <div class="cardMidPart">
                <div class="contactInformation">Contact Information</div>
                <span onclick="renderEditContactWindow(${i}, ${j})">
                    <div></div>Edit contact
                </span>
            </div>
            <div class="cardBottomPart">
                <span class="FontWeightBold">Email</span>
                <span class="emailStyle">${email}</span>
                <span class="FontWeightBold">Phone</span>
                <span>${phone}</span>
            </div>
        </div>
    `;
}


function createHtmlForCreateContact() {
    return `
        <div class="addContactLeft">
            <img class="joinLogoContact" src="src/img/img_contacts/logo_join_white.png" alt="join logo">
            <h1 class="addContactHeadline">Add Contact</h1>
            <span>Tasks are better with a team!</span>
            <img class="blueLineContact" src="src/img/img_contacts/login-blue-line.png" alt="blue line">
        </div>
        <img class="defaultUserImg" src="src/img/img_contacts/defaultUser_img.png" alt="default user image">
        <img class="closeCross" src="src/img/img_contacts/cross.svg" onclick="openAndCloseNewContactWindow()">
        <div class="addContactRight">
            <form class="contactInputForm" onsubmit="addContact(); return false">
                <div class="inputSection">
                    <input class="contactInput" id="inputName" type="text" placeholder="Name" pattern="[a-zA-ZäöüÄÖÜ]+\s[a-zA-ZäöüÄÖÜ]+" required>
                    <img class="inputImg" src="src/img/img_contacts/small_line_Human.png" alt="small line person">
                </div>
                <div class="inputSection">
                    <input class="contactInput" id="inputEmail" type="email" placeholder="Email" required>
                    <img class="inputImg" src="src/img/img_contacts/mail.png" alt="logo of a mail">
                </div>
                <div class="inputSection">
                    <input class="contactInput" id="inputPhone" type="tel" placeholder="Phone" required>
                    <img class="inputImg" src="src/img/img_contacts/phone.png" alt="logo of a phone">
                </div>
                <div class="btnSection">
                    <button class="submitBtn coloredBtn">Create contact<img src="src/img/img_contacts/ok_chop.png"
                            alt="image of a chop"></button>
                </div>
            </form>
            <button onclick="openAndCloseNewContactWindow()" class="cancelBtn transparentBtn">Cancel<img src="src/img/img_contacts/cross.svg"></button>
        </div>
    `;
}


function createHtmlForEditContact(contact) {
    let nameWithoutUmlauts = deUmlaut(contact.name);
    let initials = nameWithoutUmlauts.match(/\b\w/g).join('').toUpperCase();
    let contactColor = initialsColors[getColorForInitials(contact)];
    document.getElementById('inputName').value = contact.name;
    document.getElementById('inputEmail').value = contact.email;
    document.getElementById('inputPhone').value = contact.phone;
    return `
        <div class="addContactLeft">
            <img class="joinLogoContact" src="src/img/img_contacts/logo_join_white.png" alt="join logo">
            <h1 class="addContactHeadline">Add Contact</h1>
            <img class="blueLineContact" src="src/img/img_contacts/login-blue-line.png" alt="blue line">
        </div>
        <div class="circalInitialsBig editInitials" style="background-color: ${contactColor}">${initials}</div>
        <img class="closeCross" src="src/img/img_contacts/cross.svg" onclick="openAndCloseNewContactWindow()">
        <div class="addContactRight">
            <form class="contactInputForm" onsubmit="editContact(); return false">
                <div class="inputSection">
                    <input class="contactInput" id="inputName" type="text" placeholder="Name" pattern="[a-zA-ZäöüÄÖÜ]+\s[a-zA-ZäöüÄÖÜ]+" required>
                    <img class="inputImg" src="src/img/img_contacts/small_line_Human.png" alt="small line person">
                </div>
                <div class="inputSection">
                    <input class="contactInput" id="inputEmail" type="email" placeholder="Email" required>
                    <img class="inputImg" src="src/img/img_contacts/mail.png" alt="logo of a mail">
                </div>
                <div class="inputSection">
                    <input class="contactInput" id="inputPhone" type="tel" placeholder="Phone" required>
                    <img class="inputImg" src="src/img/img_contacts/phone.png" alt="logo of a phone">
                </div>
                <div class="btnSection">
                    <button class="submitBtn coloredBtn">Save</button>
                </div>
            </form>
            <button onclick="deleteContact()" class="cancelBtn transparentBtn">Delete</button>
        </div>
    `;
}