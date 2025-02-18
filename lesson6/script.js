const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const formBtn = document.querySelector("button");
let inEditMode = false;

function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value.trim();

    if (newItem === "") {
        alert("Please enter an item!");
        return;
    }

    if (inEditMode) {
        const itemToEdit = itemList.querySelector(".edit-mode");

        removeItemFromStorage(itemToEdit.textContent.trim());
        itemToEdit.classList.remove("edit-mode");
        itemToEdit.remove();

        inEditMode = false;
    } else {
        if (checkIfItemExists(newItem)) {
            alert("Item already exists!");
            return;
        }
    }

    addItemToDOM(newItem);
    addItemToStorage(newItem);

    checkUI();
}



function addItemToDOM(item) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(item));

    const button = createButton("remove-item btn-link text-red");
    li.appendChild(button);

    itemList.appendChild(li);
    itemInput.value = "";
}

function addItemToStorage(item) {
    let itemsForStorage = getItemsFromStorage();

    itemsForStorage.push(item);
    localStorage.setItem("items", JSON.stringify(itemsForStorage));
}

function getItemsFromStorage() {
    let itemsForStorage;

    if (localStorage.getItem("items") == null) {
        itemsForStorage = [];
    } else {
        itemsForStorage = JSON.parse(localStorage.getItem("items"));
    }

    return itemsForStorage;
}

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => {
        addItemToDOM(item);
        checkUI();
    });
}

function createButton(classes) {
    const button = document.createElement("button");
    button.className = classes;

    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
}

function onClickItem(e) {
    if (e.target.classList.contains("fa-xmark")) {
        removeItem(e.target.closest("li"));
    } else {
        setItemToEdit(e.target);
    }
}

let currentItemBeingEdited = null;

function setItemToEdit(item) {
    inEditMode = true;
    currentItemBeingEdited = item;

    itemList.querySelectorAll("li").forEach((i) => i.classList.remove("edit-mode"));

    item.classList.add("edit-mode");

    itemInput.value = item.textContent.trim();

    formBtn.innerHTML = "<i class='fa-solid fa-pen'></i> Update Item";
    formBtn.style.backgroundColor = "#228B22";
    itemInput.focus();
}


function removeItem(item) {
    if (confirm("Are you sure?")) {
        item.remove();
        removeItemFromStorage(item.textContent.trim());
        checkUI();
    }
}

function removeItemFromStorage(removedItem) {
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.filter((item) => item.trim() !== removedItem);
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems() {
    if (confirm("Are you sure?")) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
    }
    
    localStorage.removeItem("items");
    checkUI();
}

function checkIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}

function checkUI() {
    itemInput.value = "";

    const items = itemList.querySelectorAll("li");

    clearBtn.style.display = items.length === 0 ? "none" : "block";
    itemFilter.style.display = items.length === 0 ? "none" : "block";

    formBtn.innerHTML = "<i class=\"fa-solid fa-plus\"></i> Add Item";
    formBtn.style.backgroundColor = "#333";
}

function filterItems(e) {
    const items = itemList.querySelectorAll("li");
    const text = e.target.value.toLowerCase();

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if (itemName.indexOf(text) != -1) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
}

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", onClickItem);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", displayItems);
checkUI();