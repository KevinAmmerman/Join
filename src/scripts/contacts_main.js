async function init() {
    // let test1 = await getItem('test2');
    // // let test2 = test1.slice(1, -1);
    // contacts = JSON.parse(test1);
    contacts = JSON.parse(await getItem('test4'));
    await orderContacts();
    renderContacts();
}

// CONTACT-LIST FUNCTIONS

async function orderContacts() {
    groups = [];
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
    contactList.innerHTML = '';
    for (let i = 0; i < groups.length; i++) {
        if (!groups[i]) continue;
        if (groups[i].length > 0) {
            let firstLetter = groups[i][0].name.charAt(0).toUpperCase();
            contactList.innerHTML += createHtmlForOrder(firstLetter);
            for (let j = 0; j < groups[i].length; j++) {
                const contact = groups[i][j];
                contactList.innerHTML += createHtmlForContact(contact, i, j);
            }
        }
    }
}


// CREATE-CONTACT FUNCTIONS


function renderCreateContactWindow() {
    let addContactContainer = document.getElementById('addContactContainer');
    addContactContainer.innerHTML = createHtmlForCreateContact();
    setTimeout(openAndCloseNewContactWindow(), 200);
}


function addContact() {
    let name = document.getElementById('inputName');
    let email = document.getElementById('inputEmail');
    let phone = document.getElementById('inputPhone');
    let contact = {
        "name": name.value,
        "email": email.value,
        "phone": phone.value
    };
    if (checkIfContactsExists(name.value)) return;
    contacts.push(contact);
    emptyInputFields(name, email, phone);
    init();
    openAndCloseNewContactWindow();
    alertMessage('Contact succesfully created');
    setItem('test4', contacts);
}


// EDIT-CONTACT FUNCTIONS

function renderEditContactWindow(i, j) {
    let addContactContainer = document.getElementById('addContactContainer');
    let contact = groups[i][j];
    let contactsIndex = checkIndexContacts(contact.name);
    addContactContainer.innerHTML = createHtmlForEditContact(contact, contactsIndex);
    getValuesForInput(contact);
    setTimeout(openAndCloseNewContactWindow(), 200);
}


function getValuesForInput(contact) {
    document.getElementById('inputName').setAttribute('value',contact.name);
    document.getElementById('inputEmail').setAttribute('value',contact.email);
    document.getElementById('inputPhone').setAttribute('value',contact.phone);
}


function saveContactEdits(i) {
    let name = document.getElementById('inputName').value;
    let email = document.getElementById('inputEmail').value;
    let phone = document.getElementById('inputPhone').value;
    contacts[i] = {
        'name': name,
        'email': email,
        'phone': phone
    };
    init();
    openAndCloseNewContactWindow();
    alertMessage('Contact succesfully changed');
}


function deleteContact(i) {
    contacts.splice(i, 1);
    init();
    openAndCloseNewContactWindow();
    alertMessage('Contact succesfully deleted');
}


// OPEN-CONTACT FUNCTIONS 

function openContact(i, j) {
    let fullContactCard = document.getElementById('fullContactCard');
    let contact = groups[i][j];
    fullContactCard.innerHTML = createHtmlForContactCard(contact, i, j);
    addActiveClass(i, j);
    fadeInCard();
}
