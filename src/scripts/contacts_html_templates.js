function createHtmlForOrder(letter) {
    return `
        <div class="contactOrder">
            <span>${letter}</span>
        </div>
    `;
}


function createHtmlForContact(contact) {
    let nameWithoutUmlauts = deUmlaut(contact.name);
    let initials = nameWithoutUmlauts.match(/\b\w/g).join('').toUpperCase();
    let name = contact.name;
    let email = contact.email;
    let contactColor = initialsColors[getColorForInitials(contact)];
    return `
        <div class="contactCard" id="contactCard">
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