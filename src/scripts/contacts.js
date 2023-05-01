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


function getColorForInitials(contact) {
    let name = contact.name;
    let firstLetter = name.split(' ')[1][0].toLowerCase();
    let index = firstLetter.charCodeAt(0) - 'a'.charCodeAt(0);
    return index;
}


function deUmlaut(value){
    value = value.toLowerCase();
    value = value.replace(/ä/g, 'ae');
    value = value.replace(/ö/g, 'oe');
    value = value.replace(/ü/g, 'ue');
    return value;
  }


// CREATE-CONTACT FUNCTIONS


function openNewContactWindow() {
    let contactContainer = document.getElementById('addContactMainContainer');
    let addContactContainer = document.getElementById('addContactContainer');
    contactContainer.classList.remove('dNone');
    contactContainer.classList.add('fadeInMainContainer');
    setTimeout(function () {
        addContactContainer.classList.add('fadeInContainer');
    }), 500;
}