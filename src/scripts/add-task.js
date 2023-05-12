// global variables

let prio = null;
let subTasks = [];
let selectedCategoryName = null;
let selectedCatColor = null;
const prios = ['Urgent', 'Medium', 'Low'];

// CSS selector for the "category" part
const CATEGORY_MENU_EL = document.querySelector('.toggle-menu');
const SELECT_CATEGORY_EL = document.querySelector('#select-task-category');
const CATEGORY_LIST_EL = document.querySelector('.category-list');
const SELECTED_CATEGORY_EL = document.querySelector('#selected-category');
const NEW_CATEGORY_EL = document.querySelector('.new-category');
const BTN_CHECK_NEW_CATEGORY_EL = document.querySelector('.new-category__button--check');
const NEW_CATEGORY_INPUT_EL = document.querySelector('.new-catgory__input');
const COLOR_CONTAINER_EL = document.querySelector('.color-container');
const ALL_COLORS_INPUTS = document.querySelectorAll('.color-container input[type="radio"]');

// CSS selcetor for the "assigned to" part

const ASSIGNED_TO_EL = document.querySelector('.assigned-to');
const ASSIGNED_TO_LIST_EL = document.querySelector('.assigned-to__list');
const ASSIGNED_TO_ACTION_EL = document.querySelector('.assigned-to__list-action');

// CSS selector for the "subtask" part

const SUBTASK_ACTIONS = document.querySelector('.subtask__actions');
const SUBTASK_CLOSE_BTN_EL = document.querySelector('.subtask__close');
const SUBTASK_CHECK_BTN_EL = document.querySelector('.subtask__check');
const SUBTASK_PLUS_BTN_EL = document.querySelector('.subtask__plus');
const SUBTASK_INPUT_EL = document.querySelector('.subtask__input');
const SUBTASK_LIST_EL = document.querySelector('.subtasks-list');

// this function loads the user when the page gets loaded

async function init() {
	loadUsers();
}
async function loadUsers() {
	tasks = JSON.parse(await getItem('tasks'));
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
	document.getElementById('selected-category').innerHTML =
		'Select task category';
	document.getElementById('inicial-circles').innerHTML = '';
	document.getElementById('due-date').value = '';
	addPrio(null);
	document.getElementById('subtasks-container').innerHTML = '';
}

// This function load the categories in the drop down menu

async function loadCategories() {

	let list = CATEGORY_LIST_EL;
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
	const computedStyle = getComputedStyle(CATEGORY_LIST_EL);
	if (computedStyle.display === 'none') {
		CATEGORY_LIST_EL.style.display = 'block';
	} else {
		CATEGORY_LIST_EL.style.display = 'none';
	}
}

(() => {
	loadCategories();
	loadContacts();
})();

// EVENT LISTENERS
SELECT_CATEGORY_EL.addEventListener('click', categoryToggler);
BTN_CHECK_NEW_CATEGORY_EL.addEventListener('click', addNewCategory);
ASSIGNED_TO_EL.addEventListener('click', assignToHandler);

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
	CATEGORY_LIST_EL.style.display = 'none';
	SELECT_CATEGORY_EL.style.display = 'none';
	NEW_CATEGORY_EL.style.display = 'flex';
	COLOR_CONTAINER_EL.style.display = 'flex';
}

// This function is to cancel the new category

function cancelNewCategory() {
	NEW_CATEGORY_EL.style.display = 'none';
	COLOR_CONTAINER_EL.style.display = 'none';
	SELECT_CATEGORY_EL.style.display = 'flex';
}

// This functions adds the new category

async function addNewCategory() {
	NEW_CATEGORY_EL.style.display = 'none';
	COLOR_CONTAINER_EL.style.display = 'none';
	SELECT_CATEGORY_EL.style.display = 'flex';
	let selectedColor = null;
	let categoryName = '';
	categoryName = NEW_CATEGORY_INPUT_EL.value;
	for (let i = 0; i < ALL_COLORS_INPUTS.length; i++) {
		if (ALL_COLORS_INPUTS[i].checked) {
			selectedColor = ALL_COLORS_INPUTS[i].value;
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
function clearInputs(){
	NEW_CATEGORY_INPUT_EL.value = '';
	for (let i = 0; i < ALL_COLORS_INPUTS.length; i++) {
		ALL_COLORS_INPUTS[i].checked = false;
	}
}


// This function is for selecting a category and to display the selected category
function selectCategory(category, color) {
	SELECTED_CATEGORY_EL.innerHTML = `<span class='selected-category-heading'>${category} <span class='color-dot' style="background-color: ${color}"></span></span>`;
	CATEGORY_LIST_EL.style.display = 'none';

	selectedCatColor = color;
	selectedCategoryName = category;
}

// this function loads the contacts from the backend and displays it in a li element

async function loadContacts() {
	let contactsSingleQuote = await getItem('contacts');	
	contacts = JSON.parse(contactsSingleQuote.replace(/'/g, '"'));

	ASSIGNED_TO_LIST_EL.innerHTML = '';
	ASSIGNED_TO_LIST_EL.innerHTML += `<li onclick="assignToHandlerInList()" class="assigned-to__list-action">
	<div class="assigned-to__in-list">
			<span>Select contact to assign</span>
			<img src="/src/img/img_add_task/triangle.svg">
	</div>
</li>`;

	for (let i = 0; i < contacts.length; i++) {
		ASSIGNED_TO_LIST_EL.innerHTML += `<li class="contact"><label>${contacts[i].name}</label> <input value="${contacts[i].name}" type='checkbox' class='contact__checkbox' /></li>`;
	}
}

// This function open the toggle menu for the contacts

function assignToHandler() {
	ASSIGNED_TO_LIST_EL.style.display = 'flex';

	ASSIGNED_TO_EL.style.display = 'none';
}


// This function is used to select a contact
function assignToHandlerInList() {
	ASSIGNED_TO_LIST_EL.style.display = 'none';

	ASSIGNED_TO_EL.style.display = 'flex';
}

// This function adds a new subtask

function addSubtask() {
	const subTaskId = generateRandomId();
	const value = SUBTASK_INPUT_EL.value;
	const subTask = {
		id: subTaskId,
		title: value,
		status: false,
	};
	subTasks.push(subTask);
	composeSubTasks(subTasks);

	SUBTASK_INPUT_EL.style.display = 'none';
	SUBTASK_ACTIONS.style.display = 'none';
	SUBTASK_PLUS_BTN_EL.style.display = 'block';
}

// This function opens the Subtask editor

function openSubtaskEditor() {
	SUBTASK_INPUT_EL.value = '';
	SUBTASK_INPUT_EL.style.display = 'inline';
	SUBTASK_ACTIONS.style.display = 'flex';
	SUBTASK_PLUS_BTN_EL.style.display = 'none';
}
// This function closess the Subtask editor

function closeSubtaskEditor() {
	SUBTASK_INPUT_EL.style.display = 'none';
	SUBTASK_ACTIONS.style.display = 'none';
	SUBTASK_PLUS_BTN_EL.style.display = 'block';
}

// This functions displays the added subtask

function composeSubTasks(subTasks) {
	SUBTASK_LIST_EL.style.display = 'block';
	SUBTASK_LIST_EL.innerHTML = '';

	for (let i = 0; i < subTasks.length; i++) {
		SUBTASK_LIST_EL.innerHTML += `
		<li class='subtask'> <div class='subtask__title-box'><span class='subtask__square'></span>${subTasks[i].title}</div> <span class='subtask__remove' onclick='removeSubtask(${subTasks[i].id})'>X</span></li>
		`;
	}
}

// This function is for removing the added subtasks

function removeSubtask(id) {
	const filteredSubtasks = subTasks.filter((sub) => sub.id !== id.toString());
	composeSubTasks(filteredSubtasks);
}



// This function creates a random id for the added subtask to remove it later on
function generateRandomId() {
	const random = Math.floor(Math.random() * 1000000);
	return random.toString();
}
