function getColorForInitials(contact) {
    let name = contact.name;
    let firstLetter = name.split(' ')[1][0].toLowerCase();
    let index = firstLetter.charCodeAt(0) - 'a'.charCodeAt(0);
    return index;
}


function openAndCloseNewContactWindow() {
    let contactContainer = document.getElementById('addContactMainContainer');
    let addContactContainer = document.getElementById('addContactContainer');
    contactContainer.classList.toggle('dNone');
    contactContainer.classList.toggle('fadeInMainContainer');
    setTimeout(function () {
        addContactContainer.classList.toggle('fadeInContainer');
    }), 500;
}


function alertMessage(message) {
    let contactCreatedAlert = document.getElementById('contactCreatedAlert');
    contactCreatedAlert.innerHTML = message;
    contactCreatedAlert.classList.remove('dNone')
    setTimeout(function () {
        contactCreatedAlert.classList.add('dNone')
    }, 4000);
}


function emptyInputFields(name, email, phone) {
    name.value = '';
    email.value = '';
    phone.value = '';
}

function emptyContainer() {
    let fullContactCard = document.getElementById('fullContactCard');
    fullContactCard.innerHTML = '';
}


function changeContactLocalForCard(i, j, contactsIndex) {
    groups[i][j] = contacts[contactsIndex];
    openContact(i, j);
}


function checkIfContactsExists(name) {
    let checkName = name.toLowerCase();
    for (let i = 0; i < contacts.length; i++) {
        const contactName = contacts[i].name.toLowerCase();
        if (contactName == checkName) {
            alertMessage('Contact exists already');
            return true;
        }
    }
}


function checkIndexContacts(name) {
    for (let i = 0; i < contacts.length; i++) {
        const contactName = contacts[i].name;
        if (contactName == name) {
            return i;
        }
    }
}


function addActiveClass(i, j) {
    let elements = document.querySelectorAll('.active');
    elements.forEach((element) => {
        element.classList.remove('active');
    });
    let active = document.getElementById(`contactCard${i}${j}`);
    active.classList.add('active');
}


function fadeInCard(status) {
    if (status == 'on') {
        let card = document.getElementById('fullContactCard');
        card.classList.add('fadeInCard');
    } else {
        let card = document.getElementById('fullContactCard');
        card.classList.remove('fadeInCard');
    }

}


function deUmlaut(value) {
    value = value.toLowerCase();
    value = value.replace(/ä/g, 'ae');
    value = value.replace(/ö/g, 'oe');
    value = value.replace(/ü/g, 'ue');
    return value;
}


function doNotClose(event) {
    event.stopPropagation();
}