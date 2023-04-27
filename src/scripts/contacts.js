async function init() {
    await orderContacts();
    renderContacts();
}

// CONTACT-LIST FUNCTIONS

async function orderContacts() {

    contacts.forEach(function (contact) {
        let firstLetter = contact.name.charAt(0).toLowerCase();
        let index = firstLetter.charCodeAt(0) - 'a'.charCodeAt(0);
        if (!groups[index]) {
            groups[index] = [contact];
        } else {
            groups[index].push(contact);
        }
    });
    return groups;
}


function renderContacts() {
    let contactList = document.getElementById('contactList');
    for (let i = 0; i < groups.length; i++) {
        if (!groups[i]) continue;
        if (groups[i].length > 0) {
            let firstLetter = groups[i][0].name.charAt(0).toUpperCase();
            contactList.innerHTML += createHtmlForOrder(firstLetter);
            for (let j = 0; j < groups[i].length; j++) {
                const contact = groups[i][j];
                contactList.innerHTML += createHtmlForContact(contact);
            }
        }
    }
}


function createHtmlForOrder(letter) {
    return `
        <div class="contactOrder">
            <span>${letter}</span>
        </div>
    `;
}


function createHtmlForContact(contact) {
    let initials = contact.name.match(/\b\w/g).join('').toUpperCase();
    let name = contact.name;
    let email = contact.email;
    return `
        <div class="contactCard" id="contactCard">
            <div class="leftPart">
                <div class="circalInitials">${initials}</div>
            </div>
            <div class="rightPart">
                <span>${name}</span>
                <span class="emailStyle">${email}</span>
            </div>
        </div>
    `;
}


// CREATE-CONTACT FUNCTIONS


function openNewContactWindow() {
    let contactContainer = document.getElementById('addContactMainContainer');
    let addContactContainer = document.getElementById('addContactContainer');
    contactContainer.classList.remove('dNone');
    contactContainer.classList.add('fadeInMainContainer');
    setTimeout(function() {
        addContactContainer.classList.add('fadeInContainer');
    }), 500;
}