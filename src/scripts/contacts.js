async function init() {
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


function openAndCloseNewContactWindow() {
    let contactContainer = document.getElementById('addContactMainContainer');
    let addContactContainer = document.getElementById('addContactContainer');
    contactContainer.classList.toggle('dNone');
    contactContainer.classList.toggle('fadeInMainContainer');
    setTimeout(function () {
        addContactContainer.classList.toggle('fadeInContainer');
    }), 500;
}


function addContact() {
    let name = document.getElementById('inputName');
    let email = document.getElementById('inputEmail');
    let phone = document.getElementById('inputPhone');
    let contact = {
        'name': name.value,
        'email': email.value,
        'phone': phone.value
    };
    contacts.push(contact);
    emptyInputFields(name, email, phone);
    init();
    openAndCloseNewContactWindow();
}

function emptyInputFields(name, email, phone) {
    name.value = '';
    email.value = '';
    phone.value = '';
}

// OPEN-CONTACT FUNCTIONS 

function openContact(i, j) {
    let fullContactCard = document.getElementById('fullContactCard');
    let contact = groups[i][j];
    fullContactCard.innerHTML = createHtmlForContactCard(contact);
    addActiveClass(i, j);
}


function addActiveClass(i, j) {
    const elements = document.querySelectorAll('.active');
    elements.forEach((element) => {
        element.classList.remove('active');
    });
    let active = document.getElementById(`contactCard${i}${j}`);
    active.classList.add('active');
}