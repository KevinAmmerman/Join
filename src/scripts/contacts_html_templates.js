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

function createHtmlForContactCard(contact) {
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
                <span>
                    <div></div>Edit Contact
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