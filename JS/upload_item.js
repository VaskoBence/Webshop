let storage = localStorage.getItem("ItemList");
let items;

// Check if the local storage is empty
storage == null ? (items = []) : (items = JSON.parse(storage));

// Sumbit item
const addItem = (e) => {
	e.preventDefault();

	let inputName = document.getElementById("name").value;
	let inputQuantity = document.getElementById("quantity").value;
	let inputItemID = document.getElementById("itemID").value;
	let inputPrice = document.getElementById("price").value;
	let inputDescription = document.getElementById("description").value;

	// Input validation
	if (
		inputName == "" ||
		inputQuantity == "" ||
		inputItemID == "" ||
		inputPrice == "" ||
		inputDescription == ""
	) {
		return alert("Minden mezőt ki kell tölteni!");
	}

	// Adding the item to the items array
	let item = {
		name: inputName,
		quantity: inputQuantity,
		itemID: inputItemID,
		price: inputPrice,
		description: inputDescription,
	};

	items.push(item);
	document.querySelector("form").reset();

	// Feedback messages
	alert("A termék hozzáadva");
	console.log("Item has been added: ");
	console.table([items[items.indexOf(item)]]);

	// Saving the item list in the local storage
	localStorage.setItem("ItemList", JSON.stringify(items));
};

// Delete items
const deleteItems = (e) => {
	e.preventDefault();

	localStorage.removeItem("ItemList");
	items = [];

	alert("A local storage törölve lett.");
	console.log("The local storage has been cleared.");
};

// List items
const listItems = (e) => {
	e.preventDefault();

	let storage = localStorage.getItem("ItemList");

	// Check if the local storage is empty
	storage == null
		? console.log("Local storage is empty!")
		: console.table(items);
};

// Eventhandlers
document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("button-submit").addEventListener("click", addItem);
	document
		.getElementById("button-delete")
		.addEventListener("click", deleteItems);
	document.getElementById("button-list").addEventListener("click", listItems);
});
