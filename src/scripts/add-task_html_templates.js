function addCategoryHTML() {
	return /*html*/ `
        <li class='category-task' onclick="newCategoryHandler()">
            <div>New Category</div>
        </li>`;
}


function categoryHTML(category, color) {
	return /*html*/ `
        <li class='category-task' onclick="selectCategory('${category}', '${color}')">
            <div>${category}</div>
            <div class="color-dot ${color}" style="background-color: ${color}"></div>
        </li>`;
}

function contactListHTML() {
    return `
    <li onclick="assignToHandlerInList()" class="assigned-to__list-action">
                <div class="assigned-to__in-list">
                        <span>Select contact to assign</span>
                        <img src="./src/img/img_add_task/triangle.svg">
                </div>
            </li>`;
}

function contactListElementsHTML(contacts, i) {
    return `<li onclick="doNotClose(event); checkbox(${i})" class="contact"><label>${contacts[i].name}</label> <input id="checkbox${i}" value="${contacts[i].name}" type='checkbox' class='contact__checkbox' /></li>`;
}


function subTaskHTML(subTasks, i) {
    return `
    <li class='subtask'> <div class='subtask__title-box'><span class='subtask__square'></span>${subTasks[i].title}</div> <div class='subtask__remove' onclick='removeSubtask(${subTasks[i].id})'></div></li>
    `;
}

function selectedCategoryHTML(category, color) {
    return `<span class='selected-category-heading'>${category} <span class='color-dot' style="background-color: ${color}"></span></span>`;
}