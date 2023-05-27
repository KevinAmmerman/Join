// global variables
let isMobil;
let prio = null;
let subTasks = [];
let selectedCategoryName = null;
let selectedCatColor = null;
const prios = ['urgent', 'medium', 'low'];

/**
 * Initializes the addition of a task.
 * Calls the "loadUsers" function.
 */
async function initAddTask() {
	loadUsers();
}

/**
 * Loads user data from the backend.
 */
async function loadUsers() {
	tasks = JSON.parse(await getItem('tasks'));
}

/**
 * Initializes the task addition functionality.
 * Adds event listeners and loads categories and contacts.
 */
function initAddTasks() {
	document.querySelector('#select-task-category').addEventListener('click', categoryToggler);
	document.querySelector('.new-category__button--check').addEventListener('click', addNewCategory);
	document.querySelector('.assigned-to').addEventListener('click', assignToHandler);
	(() => {
		loadCategories();
		loadContacts();
	})();
}

/**
 * Creates a new task with the provided data and saves it in the backend.11
 * Displays a success message and navigates to the board page.
 */
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
	alertMessage('Task succesfully created');
	if (isMobil == true) {
		closeWindow('modalAddtask');
		resetForm();
		init();
	} else {
		goToBoard();
	}
}

/**
 * Navigates to the board page after a task is created.
 */
function goToBoard() {
	setTimeout(function () {
		window.location.href = "board.html";
	}, 2000)
}


/**
 * Adds priority to the task based on the provided value.
 * Updates the UI to reflect the selected priority.
 * @param {number} prioValue - The priority value (0: urgent, 1: medium, 2: low).
 */
function addPrio(priorityValue) {
	resetPrio();
	selectPriority(priorityValue);
}

/**
 * Selects a priority level and applies corresponding styles to the elements.
 * @param {number} priorityValue - The selected priority value.
 */
function selectPriority(priorityValue) {
	document.getElementById(`${prios[priorityValue]}-btn`).classList.add(`${prios[priorityValue]}-aktiv`);
	document.getElementById(`${prios[priorityValue]}-image`).style.filter = 'brightness(0) invert(1)';
	prio = priorityValue + 1;
}

// /**
//  * Resets the priority buttons to their default state.
//  */

function resetPrio() {
	for (let i = 0; i < prios.length; i++) {
		const priority = prios[i];
		document.getElementById(`${priority}-btn`).classList.remove(`${priority}-aktiv`);
		document.getElementById(`${priority}-image`).style.filter = '';
	}
}

/**
 * Resets the required alert messages in the form.
 */

function resetRequired() {
	for (let i = 0; i <= 5; i++) {
		document.getElementById(`required${i}`).innerText = '';
	}
}

/**
 * Resets the form to its default state.
 */

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
	resetPrio();
	subTasks = [];
	composeSubTasks(subTasks);
	closeSubtaskEditor();

}

/**
 * Removes the selected contact checkboxes.
 */

function removeContactCheckboxes() {
	const contactCheckboxes = document.querySelectorAll('.contact__checkbox');
	for (let i = 0; i < contactCheckboxes.length; i++) {
		const element = contactCheckboxes[i];
		if (element.checked) {
			element.checked = false;
		}
	}
}

/**
 * Loads the task categories from the backend and displays them in a dropdown menu.
 */

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

/**
 * Toggles the display of the category dropdown menu.
 */

function categoryToggler() {
	const categoryList = document.querySelector('.category-list');
	const selectCategory = document.querySelector('.select-task-category');

	if (categoryList.style.display === 'none') {
		categoryList.style.display = 'block';
		selectCategory.style.borderBottom = '0px';
		selectCategory.style.borderRadius = '10px 10px 0px 0px';
	} else {
		categoryList.style.display = 'none';
		resetSelectCategory();
	}
}

/**
 * Closes the category toggler by hiding the category list and resetting the select category element.
 */

function closeCategoryToggler() {
	document.querySelector('.category-list').style.display = 'none';
	resetSelectCategory()
}


/**
 * Generates the HTML markup for a task category.
 * @param {string} category - The category name.
 * @param {string} color - The category color.
 * @returns {string} The HTML markup for the category.
 */

function categoryHTML(category, color) {
	return /*html*/ `
        <li class='category-task' onclick="selectCategory('${category}', '${color}')">
            <div>${category}</div>
            <div class="color-dot ${color}" style="background-color: ${color}"></div>
        </li>`;
}

/**
 * Generates the HTML markup for adding a new category.
 * @returns {string} The HTML markup for adding a new category.
 */

function addCategoryHTML() {
	return /*html*/ `
        <li class='category-task' onclick="newCategoryHandler()">
            <div>New Category</div>
        </li>`;
}

/**
 * Handles the creation of a new category.
 */

function newCategoryHandler() {
	document.querySelector('.category-list').style.display = 'none';
	document.querySelector('#select-task-category').style.display = 'none';
	document.querySelector('.new-category').style.display = 'flex';
	document.querySelector('.color-container').style.display = 'flex';
}

/**
 * Cancels the creation of a new category.
 */

function cancelNewCategory() {
	document.querySelector('.new-category').style.display = 'none';
	document.querySelector('.color-container').style.display = 'none';
	document.querySelector('#select-task-category').style.display = 'flex';
}

/**
 * Adds a new category with the provided name and color.
 */

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

/**
 * Clears the input fields and color selection for creating a new category.
 */

function clearInputs() {
	document.querySelector('.new-catgory__input').value = '';
	for (let i = 0; i < document.querySelectorAll('.color-container input[type="radio"]').length; i++) {
		document.querySelectorAll('.color-container input[type="radio"]')[i].checked = false;
	}
}

/**
 * Selects a category and updates the UI to reflect the selected category.
 * @param {string} category - The selected category name.
 * @param {string} color - The selected category color.
 */

function selectCategory(category, color) {
	document.querySelector('#selected-category').innerHTML = `<span class='selected-category-heading'>${category} <span class='color-dot' style="background-color: ${color}"></span></span>`;
	document.querySelector('.category-list').style.display = 'none';

	selectedCatColor = color;
	selectedCategoryName = category;
	resetSelectCategory();
}

/**
 * Loads the contacts from the backend and displays them as checkboxes.
 */

async function loadContacts() {
	let contactsSingleQuote = await getItem('contacts');
	contacts = JSON.parse(contactsSingleQuote.replace(/'/g, '"'));

	document.querySelector('.assigned-to__list').innerHTML = '';
	document.querySelector('.assigned-to__list').innerHTML += `<li onclick="assignToHandlerInList()" class="assigned-to__list-action">
	<div class="assigned-to__in-list">
			<span>Select contact to assign</span>
			<img src="./src/img/img_add_task/triangle.svg">
	</div>
</li>`;

	for (let i = 0; i < contacts.length; i++) {
		document.querySelector('.assigned-to__list').innerHTML += `<li class="contact"><label>${contacts[i].name}</label> <input value="${contacts[i].name}" type='checkbox' class='contact__checkbox' /></li>`;
	}
}

/**
 * Handles the click event to display the list of assigned contacts.
 */

function assignToHandler() {
	document.querySelector('.assigned-to__list').style.display = 'flex';
	document.querySelector('.assigned-to').style.display = 'none';
}


/**
 * Handles the click event when selecting a contact from the assigned contacts list.
 */

function assignToHandlerInList() {
	document.querySelector('.assigned-to__list').style.display = 'none';
	document.querySelector('.assigned-to').style.display = 'flex';
}

/**
 * Adds a new subtask to the task.
 * Validates the input value and adds the subtask to the subTasks array.
 */

function addSubtaskAddTask() {
	const subTaskId = generateRandomId();
	const value = document.querySelector('.subtask__input').value;
	if (value !== '') {
		const subTask = {
			id: subTaskId,
			title: value,
			status: false,
		};
		subTasks.push(subTask);
		composeSubTasks(subTasks);
		document.querySelector('.subtask__actions').style.display = 'none';
		document.querySelector('.subtask__plus').style.display = 'block';
	} else {
		alert("Please enter a subtask");
	}
	document.querySelector('.subtask__input').value = '';
}

/**
 * Opens the subtask editor to add a new subtask.
 * Resets the input value and displays the necessary elements.
 */

function openSubtaskEditor() {
	document.querySelector('.subtask__input').value = '';
	document.querySelector('.subtask__actions').style.display = 'flex';
	document.querySelector('.subtask__plus').style.display = 'none';
}

/**
 * Closes the subtask editor without adding a new subtask.
 * Hides the input field and actions, and shows the plus icon.
 */

function closeSubtaskEditor() {
	document.querySelector('.subtask__actions').style.display = 'none';
	document.querySelector('.subtask__plus').style.display = 'block';
	document.querySelector('.subtask__input').value = '';
}

/**
 * Displays the added subtasks on the webpage.
 * Creates HTML markup for each subtask and updates the subtasks-list element.
 * @param {object[]} subTasks - An array of subtask objects.
 */

function composeSubTasks(subTasks) {
	document.querySelector('.subtasks-list').style.display = 'block';
	document.querySelector('.subtasks-list').innerHTML = '';

	if (subTasks) {
		for (let i = 0; i < subTasks.length; i++) {
			document.querySelector('.subtasks-list').innerHTML += `
		<li class='subtask'> <div class='subtask__title-box'><span class='subtask__square'></span>${subTasks[i].title}</div> <div class='subtask__remove' onclick='removeSubtask(${subTasks[i].id})'></div></li>
		`;
		}
	} else {
		document.querySelector('.subtasks-list').innerHTML = '';
	}
}

/**
 * Removes a subtask from the subTasks array and updates the displayed subtasks.
 * @param {string} id - The ID of the subtask to be removed.
 */

function removeSubtask(id) {
	const filteredSubtasks = subTasks.filter((sub) => sub.id !== id.toString());
	subTasks = filteredSubtasks;
	composeSubTasks(filteredSubtasks);
}

/**
 * Generates a random ID for a subtask.
 * @returns {string} A random ID as a string.
 */

function generateRandomId() {
	const random = Math.floor(Math.random() * 1000000);
	return random.toString();
}

/**
 * Adds an event listener to submit the subtask on pressing the Enter key.
 */

function submitOnEnter() {
	let input = document.getElementById('subtask-input');
	input.addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			event.preventDefault();
			addSubtaskAddTask();
		}
	});
}

/**
 * Displays an alert message on the webpage.
 * @param {string} message - The message to be displayed in the alert.
 */

function alertMessage(message) {
	let taskCreatedAlert = document.getElementById('TaskCreatedAlert');
	taskCreatedAlert.innerHTML = message;
	taskCreatedAlert.classList.remove('dNone')
	setTimeout(function () {
		taskCreatedAlert.classList.add('dNone')
	}, 2000);
}

/**
 * Resets the styling of the select task category element.
 * Removes the custom border and border-radius styles.
 */

function resetSelectCategory() {
	document.querySelector('.select-task-category').style.borderBottom = '1px solid #a8a8a8';
	document.querySelector('.select-task-category').style.borderRadius = '10px';
}

/**
 * Sets the minimum value for all elements with the name "due-date" to today's date.
 */

function limitDueDate() {
	let today = new Date().toISOString().split('T')[0];
	for (let i = 0; i < document.getElementsByName("due-date").length; i++) {
		document.getElementsByName("due-date")[i].setAttribute('min', today);
	}
}