// global variables

let prio = null;
let subTasks = [];
let selectedCategoryName = null;
let selectedCatColor = null;
const prios = ['Urgent', 'Medium', 'Low'];

// CSS selector for the "category" part




// CSS selector for the "assigned to" part





// CSS selector for the "subtask" part



// this function loads the user when the page gets loaded

async function init() {
	loadUsers();
}
async function loadUsers() {
	tasks = JSON.parse(await getItem('tasks'));
}

function initAddTasks() {
	document.querySelector('#select-task-category').addEventListener('click', categoryToggler);
	document.querySelector('.new-category__button--check').addEventListener('click', addNewCategory);
	document.querySelector('.assigned-to').addEventListener('click', assignToHandler);
	(() => {
		loadCategories();
		loadContacts();
	})();
}

// this function gets all values, creates the task and saves it in the backend

async function createTask() {
	const { value: title } = document.getElementById('title');
	const { value: description } = document.getElementById('description');
	const { value: dueDate } = document.getElementById('due-date');
	const selectedCategory = { name: selectedCategoryName, color: selectedCatColor };
	const assignees = Array.from(document.querySelectorAll('.contact__checkbox:checked')).map(input => input.value);
	const newTask = {
		category: { ...selectedCategory },
		assignedTo: assignees,
		title,
		description,
		prio,
		date: dueDate,
		subtask: subTasks
	};

	tasks.toDo.push(newTask);
	await setItem('tasks', JSON.stringify(tasks));
	resetForm();
}


// this function checks which button is clicked

function addPrio(prioValue) {
	resetPrio();
	if (prioValue == 0) {
		selectUrgent();
	}
	if (prioValue == 1) {
		selectMedium();
	}
	if (prioValue == 2) {
		selectLow();
	}

}


// This function changes the color of the Urgent button

function selectUrgent() {
	document.getElementById('urgent-btn').classList.add('urgent-aktiv');
	document.getElementById('urgent-image').style.filter =
		'brightness(0) invert(1)';
	prio = 1;
}

// This function changes the color of the Medium button

function selectMedium() {
	document.getElementById('medium-btn').classList.add('medium-aktiv');
	document.getElementById('medium-image').style.filter =
		'brightness(0) invert(1)';
	prio = 2;
}


// This function changes the color of the Low button

function selectLow() {
	document.getElementById('low-btn').classList.add('low-aktiv');
	document.getElementById('low-image').style.filter = 'brightness(0) invert(1)';
	prio = 3;
}


// This function is used to reset all prio buttons

function resetPrio() {
	document.getElementById('urgent-btn').classList.remove('urgent-aktiv');
	document.getElementById('urgent-image').style.filter = '';
	document.getElementById('medium-btn').classList.remove('medium-aktiv');
	document.getElementById('medium-image').style.filter = '';
	document.getElementById('low-btn').classList.remove('low-aktiv');
	document.getElementById('low-image').style.filter = '';
}


// This function is used to reset the required alert

function resetRequired() {
	for (let i = 0; i <= 5; i++) {
		document.getElementById(`required${i}`).innerText = '';
	}
}


// This function reset the complete form

function resetForm() {
	resetRequired();
	document.getElementById('title').value = '';
	document.getElementById('description').value = '';
	document.getElementById('selected-category').innerHTML = 'Select task category';
	document.getElementById('inicial-circles').innerHTML = '';
	document.querySelector('.assigned-to').style.display = 'flex';
	document.querySelector('.assigned-to__list').style.display = 'none';
	removeContactCheckboxes();
	document.getElementById('due-date').value = '';
	addPrio(null);
	subTasks = [];
	composeSubTasks(subTasks);
}

// This function removes the selected Contact Checkboxes

function removeContactCheckboxes() {
	const contactCheckboxes = document.querySelectorAll('.contact__checkbox');
	for (let i = 0; i < contactCheckboxes.length; i++) {
		const element = contactCheckboxes[i];
		if (element.checked) {
			element.checked = false;
		}
	}

}

// This function load the categories in the drop down menu

async function loadCategories() {

	let list = document.querySelector('.category-list');
	list.innerHTML = '';

	list.innerHTML += addCategoryHTML();
	for (let i = 0; i < categories.length; i++) {
		let category = categories[i]['name'];
		let color = categories[i]['color'];
		list.innerHTML += categoryHTML(category, color);
	}
}

// This function loads the contacts 

function categoryToggler() {
	const computedStyle = getComputedStyle(document.querySelector('.category-list'));
	if (computedStyle.display === 'none') {
		document.querySelector('.category-list').style.display = 'block';
	} else {
		document.querySelector('.category-list').style.display = 'none';
	}
}

// (() => {
// 	loadCategories();
// 	loadContacts();
// })();

// EVENT LISTENERS
/*document.querySelector('#select-task-category').addEventListener('click', categoryToggler);
document.querySelector('.new-category__button--check').addEventListener('click', addNewCategory);
document.querySelector('.assigned-to').addEventListener('click', assignToHandler); */

// utility funtion for add task html view

function categoryHTML(category, color) {
	return /*html*/ `
        <li class='category-task' onclick="selectCategory('${category}', '${color}')">
            <div>${category}</div>
            <div class="color-dot ${color}" style="background-color: ${color}"></div>
        </li>`;
}

// This function adds a new field for adding a new category

function addCategoryHTML() {
	return /*html*/ `
        <li class='category-task' onclick="newCategoryHandler()">
            <div>New Category</div>
        </li>`;
}

function newCategoryHandler() {
	document.querySelector('.category-list').style.display = 'none';
	document.querySelector('#select-task-category').style.display = 'none';
	document.querySelector('.new-category').style.display = 'flex';
	document.querySelector('.color-container').style.display = 'flex';
}

// This function is to cancel the new category

function cancelNewCategory() {
	document.querySelector('.new-category').style.display = 'none';
	document.querySelector('.color-container').style.display = 'none';
	document.querySelector('#select-task-category').style.display = 'flex';
}

// This functions adds the new category

async function addNewCategory() {
	document.querySelector('.new-category').style.display = 'none';
	document.querySelector('.color-container').style.display = 'none';
	document.querySelector('#select-task-category').style.display = 'flex';
	let selectedColor = null;
	let categoryName = '';
	categoryName = document.querySelector('.new-catgory__input').value;
	for (let i = 0; i < document.querySelectorAll('.color-container input[type="radio"]').length; i++) {
		if (document.querySelectorAll('.color-container input[type="radio"]')[i].checked) {
			selectedColor = document.querySelectorAll('.color-container input[type="radio"]')[i].value;
		}
	}
	const newCategory = {
		name: categoryName,
		color: selectedColor,
	};
	categories.push(newCategory);
	loadCategories();
	clearInputs();
}

// This function clears the inputs if a new category is created
function clearInputs() {
	document.querySelector('.new-catgory__input').value = '';
	for (let i = 0; i < document.querySelectorAll('.color-container input[type="radio"]').length; i++) {
		document.querySelectorAll('.color-container input[type="radio"]')[i].checked = false;
	}
}


// This function is for selecting a category and to display the selected category
function selectCategory(category, color) {
	document.querySelector('#selected-category').innerHTML = `<span class='selected-category-heading'>${category} <span class='color-dot' style="background-color: ${color}"></span></span>`;
	document.querySelector('.category-list').style.display = 'none';

	selectedCatColor = color;
	selectedCategoryName = category;
}

// this function loads the contacts from the backend and displays it in a li element

async function loadContacts() {
	let contactsSingleQuote = await getItem('contacts');
	contacts = JSON.parse(contactsSingleQuote.replace(/'/g, '"'));

	document.querySelector('.assigned-to__list').innerHTML = '';
	document.querySelector('.assigned-to__list').innerHTML += `<li onclick="assignToHandlerInList()" class="assigned-to__list-action">
	<div class="assigned-to__in-list">
			<span>Select contact to assign</span>
			<img src="/src/img/img_add_task/triangle.svg">
	</div>
</li>`;

	for (let i = 0; i < contacts.length; i++) {
		document.querySelector('.assigned-to__list').innerHTML += `<li class="contact"><label>${contacts[i].name}</label> <input value="${contacts[i].name}" type='checkbox' class='contact__checkbox' /></li>`;
	}
}

// This function open the toggle menu for the contacts

function assignToHandler() {
	document.querySelector('.assigned-to__list').style.display = 'flex';

	document.querySelector('.assigned-to').style.display = 'none';
}


// This function is used to select a contact
function assignToHandlerInList() {
	document.querySelector('.assigned-to__list').style.display = 'none';

	document.querySelector('.assigned-to').style.display = 'flex';
}

// This function adds a new subtask

function addSubtask() {
	const subTaskId = generateRandomId();
	const value = document.querySelector('.subtask__input').value;
	const subTask = {
		id: subTaskId,
		title: value,
		status: false,
	};
	subTasks.push(subTask);
	composeSubTasks(subTasks);

	document.querySelector('.subtask__input').style.display = 'none';
	document.querySelector('.subtask__actions').style.display = 'none';
	document.querySelector('.subtask__plus').style.display = 'block';
}

// This function opens the Subtask editor

function openSubtaskEditor() {
	document.querySelector('.subtask__input').value = '';
	document.querySelector('.subtask__input').style.display = 'inline';
	document.querySelector('.subtask__actions').style.display = 'flex';
	document.querySelector('.subtask__plus').style.display = 'none';
}
// This function closess the Subtask editor

function closeSubtaskEditor() {
	document.querySelector('.subtask__input').style.display = 'none';
	document.querySelector('.subtask__actions').style.display = 'none';
	document.querySelector('.subtask__plus').style.display = 'block';
}

// This functions displays the added subtask

function composeSubTasks(subTasks) {
	document.querySelector('.subtasks-list').style.display = 'block';
	document.querySelector('.subtasks-list').innerHTML = '';

	if (subTasks) {
		for (let i = 0; i < subTasks.length; i++) {
			document.querySelector('.subtasks-list').innerHTML += `
		<li class='subtask'> <div class='subtask__title-box'><span class='subtask__square'></span>${subTasks[i].title}</div> <span class='subtask__remove' onclick='removeSubtask(${subTasks[i].id})'>X</span></li>
		`;
		}
	} else {
		document.querySelector('.subtasks-list').innerHTML = '';
	}
}

// This function is for removing the added subtasks

function removeSubtask(id) {
	const filteredSubtasks = subTasks.filter((sub) => sub.id !== id.toString());
	subTasks = filteredSubtasks;
	composeSubTasks(filteredSubtasks);
}



// This function creates a random id for the added subtask to remove it later on
function generateRandomId() {
	const random = Math.floor(Math.random() * 1000000);
	return random.toString();
}
