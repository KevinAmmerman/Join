let prio = null; //initial state
let subTasks = [];
// let tasks = [];

let selectedCategoryName = null;
let selectedCatColor = null;

const prios = ['Urgent', 'Medium', 'Low'];
const CATEGORY_MENU_EL = document.querySelector('.toggle-menu');
const SELECT_CATEGORY_EL = document.querySelector('#select-task-category');
const CATEGORY_LIST_EL = document.querySelector('.category-list');
const SELECTED_CATEGORY_EL = document.querySelector('#selected-category');
const NEW_CATEGORY_EL = document.querySelector('.new-category');
const BTN_CHECK_NEW_CATEGORY_EL = document.querySelector(
	'.new-category__button--check'
);
const NEW_CATEGORY_INPUT_EL = document.querySelector('.new-catgory__input');

const COLOR_CONTAINER_EL = document.querySelector('.color-container');
const ALL_COLORS_INPUTS = document.querySelectorAll(
	'.color-container input[type="radio"]'
);

const ASSIGNED_TO_EL = document.querySelector('.assigned-to');
const ASSIGNED_TO_LIST_EL = document.querySelector('.assigned-to__list');
const ASSIGNED_TO_ACTION_EL = document.querySelector(
	'.assigned-to__list-action'
);

// subtask editors
const SUBTASK_ACTIONS = document.querySelector('.subtask__actions');
const SUBTASK_CLOSE_BTN_EL = document.querySelector('.subtask__close');
const SUBTASK_CHECK_BTN_EL = document.querySelector('.subtask__check');
const SUBTASK_PLUS_BTN_EL = document.querySelector('.subtask__plus');
const SUBTASK_INPUT_EL = document.querySelector('.subtask__input');
const SUBTASK_LIST_EL = document.querySelector('.subtasks-list');

async function createTask() {
	const title = document.getElementById('title').value;
	const description = document.getElementById('description').value;	
	const dueDate = document.getElementById('due-date').value;
	const selectedCategory = {
		name: selectedCategoryName,
		color: selectedCatColor,
	};
	const assignees = [];
	const contactChecks = document.querySelectorAll('.contact__checkbox');

	for (let i = 0; i < contactChecks.length; i++) {
		if (contactChecks[i].checked) {
			assignees.push(contactChecks[i].value);
		}
	}

	const newTask = {
		'category': { ...selectedCategory },
		'assignedTo': [assignees],
		'title': title,
		'description': description,
		'prio': prio,
		'date': dueDate,
		'subtask': [subTasks] // spread operator
	};
	console.log(newTask);

	tasks.toDo.push(newTask);

	setItem('tasks', tasks);	
	
}

/**
 * this function checks which button is clicked
 * @param {number} prioValue - number of the prio button
 */
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

/**
 * This function changes the color of the Urgent button
 */
function selectUrgent() {
	document.getElementById('urgent-btn').classList.add('urgent-aktiv');
	document.getElementById('urgent-image').style.filter =
		'brightness(0) invert(1)';
	prio = 1;
}

/**
 * This function changes the color of the Medium button
 */
function selectMedium() {
	document.getElementById('medium-btn').classList.add('medium-aktiv');
	document.getElementById('medium-image').style.filter =
		'brightness(0) invert(1)';
	prio = 2;
}

/**
 * This function changes the color of the Low button
 */
function selectLow() {
	document.getElementById('low-btn').classList.add('low-aktiv');
	document.getElementById('low-image').style.filter = 'brightness(0) invert(1)';
	prio = 3;
}

/**
 * This function is used to reset all prio buttons
 */
function resetPrio() {
	document.getElementById('urgent-btn').classList.remove('urgent-aktiv');
	document.getElementById('urgent-image').style.filter = '';
	document.getElementById('medium-btn').classList.remove('medium-aktiv');
	document.getElementById('medium-image').style.filter = '';
	document.getElementById('low-btn').classList.remove('low-aktiv');
	document.getElementById('low-image').style.filter = '';
}

/**
 * This function is used to reset the required alert
 */
function resetRequired() {
	for (let i = 0; i <= 5; i++) {
		document.getElementById(`required${i}`).innerText = '';
	}
}

/**
 * this function reset the complete form
 */
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

// load categories in dropdown
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

// load contacts

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

// ASSIGNED_TO_ACTION_EL.addEventListener('click', assignToHandlerInList);

// UTILITIE FUNCTION FOR ADD TASK HTML VIEW

function categoryHTML(category, color) {
	return /*html*/ `
        <li class='category-task' onclick="selectCategory('${category}', '${color}')">
            <div>${category}</div>
            <div class="color-dot ${color}" style="background-color: ${color}"></div>
        </li>`;
}

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

function cancelNewCategory() {
	NEW_CATEGORY_EL.style.display = 'none';
	COLOR_CONTAINER_EL.style.display = 'none';
	SELECT_CATEGORY_EL.style.display = 'flex';
}

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

	// compose new cateogry

	const newCategory = {
		name: categoryName,
		color: selectedColor,
	};
	categories.push(newCategory);
	loadCategories();

	// clear inputs
	NEW_CATEGORY_INPUT_EL.value = '';
	for (let i = 0; i < ALL_COLORS_INPUTS.length; i++) {
		ALL_COLORS_INPUTS[i].checked = false;
	}
}

function selectCategory(category, color) {
	SELECTED_CATEGORY_EL.innerHTML = `<span class='selected-category-heading'>${category} <span class='color-dot' style="background-color: ${color}"></span></span>`;
	CATEGORY_LIST_EL.style.display = 'none';

	selectedCatColor = color;
	selectedCategoryName = category;
}

// assigned to

async function loadContacts() {
	let contactsSingleQuote = await getItem('contacts');
	let tasks = await getItem('tasks');
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
function assignToHandler() {
	ASSIGNED_TO_LIST_EL.style.display = 'flex';

	ASSIGNED_TO_EL.style.display = 'none';
}
function assignToHandlerInList() {
	ASSIGNED_TO_LIST_EL.style.display = 'none';

	ASSIGNED_TO_EL.style.display = 'flex';
}

// sub tasks
function addSubtask() {
	const subTaskId = generateRandomId();
	const value = SUBTASK_INPUT_EL.value;
	const subTask = {
		id: subTaskId,
		title: value,
		status: true,
	};
	subTasks.push(subTask);
	composeSubTasks(subTasks);

	SUBTASK_INPUT_EL.style.display = 'none';
	SUBTASK_ACTIONS.style.display = 'none';
	SUBTASK_PLUS_BTN_EL.style.display = 'block';
}

function openSubtaskEditor() {
	SUBTASK_INPUT_EL.value = '';
	SUBTASK_INPUT_EL.style.display = 'inline';
	SUBTASK_ACTIONS.style.display = 'flex';
	SUBTASK_PLUS_BTN_EL.style.display = 'none';
}

function closeSubtaskEditor() {
	SUBTASK_INPUT_EL.style.display = 'none';
	SUBTASK_ACTIONS.style.display = 'none';
	SUBTASK_PLUS_BTN_EL.style.display = 'block';
}

function composeSubTasks(subTasks) {
	SUBTASK_LIST_EL.style.display = 'block';
	SUBTASK_LIST_EL.innerHTML = '';

	for (let i = 0; i < subTasks.length; i++) {
		SUBTASK_LIST_EL.innerHTML += `
		<li class='subtask'> <div class='subtask__title-box'><span class='subtask__square'></span>${subTasks[i].title}</div> <span class='subtask__remove' onclick='removeSubtask(${subTasks[i].id})'>X</span></li>
		`;
	}
}

function removeSubtask(id) {
	const filteredSubtasks = subTasks.filter((sub) => sub.id !== id.toString());
	composeSubTasks(filteredSubtasks);
}

// utlity functions

// function to create randomid for task so that we can remove the same subtask based on it's id. Id needs to be unique
function generateRandomId() {
	const random = Math.floor(Math.random() * 1000000);
	return random.toString();
}
