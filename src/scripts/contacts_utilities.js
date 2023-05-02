function getColorForInitials(contact) {
    let name = contact.name;
    let firstLetter = name.split(' ')[1][0].toLowerCase();
    let index = firstLetter.charCodeAt(0) - 'a'.charCodeAt(0);
    return index;
}


function deUmlaut(value) {
    value = value.toLowerCase();
    value = value.replace(/ä/g, 'ae');
    value = value.replace(/ö/g, 'oe');
    value = value.replace(/ü/g, 'ue');
    return value;
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


function successMessage() {
    let contactCreatedAlert = document.getElementById('contactCreatedAlert');
    contactCreatedAlert.classList.remove('dNone')
    setTimeout(function() {
        contactCreatedAlert.classList.add('dNone')
    }, 4000);
}


function emptyInputFields(name, email, phone) {
    name.value = '';
    email.value = '';
    phone.value = '';
}


function addActiveClass(i, j) {
    let elements = document.querySelectorAll('.active');
    elements.forEach((element) => {
        element.classList.remove('active');
    });
    let active = document.getElementById(`contactCard${i}${j}`);
    active.classList.add('active');
}


function fadeInCard() {
    let card = document.getElementById('fullContactCard');
    card.classList.add('fadeInCard');
}