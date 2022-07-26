// Constantes
const input = document.querySelector('#element-name');
const list = document.querySelector('#elements-list');
const generateButton = document.querySelector('#generate-button');
const cleanButton = document.querySelector('#clean-button');
const bingoGrid = document.querySelector('#bingo-grid');

// Variables globales
let bingoElements = [];

// EventListeners
input.addEventListener('keyup', switchKey);
generateButton.addEventListener('click', generateGrid);
cleanButton.addEventListener('click', cleanAll);

if(localStorage.savedGrid) {
	// console.log(localStorage.savedGrid.split(","));

	displayGrid(localStorage.savedGrid.split(","), localStorage.gridX, localStorage.gridY);
}

// Fonctions
function switchKey (event)
{
	switch (event.code) {
		case "Enter":
		case "NumpadEnter":
			addElement(input.value);
			input.value = null;
		break;

	}
}

function removeElement (evt)
{
	let elementName = evt.target.parentNode.childNodes[0].textContent;
	evt.target.parentNode.remove();
	console.log(elementName);

	let index = bingoElements.findIndex(element => element == elementName);
	bingoElements.pop(index);

}

function addElement (element)
{
	if (element) {
		bingoElements.push(element);
		console.log(bingoElements);

		let listElt = document.createElement('div');
		listElt.className = "list-element";

		let  eltName = document.createElement('div');
		eltName.innerHTML = element;
		eltName.className = "list-element-name";
		listElt.appendChild(eltName);
	 
		let delButton = document.createElement('button');
		delButton.className = "list-element-del-button cliquable";
		delButton.innerHTML = "x";
		delButton.addEventListener('click', removeElement);
		listElt.appendChild(delButton);

		list.appendChild(listElt);							
	}
}

function generateGrid ()
{
	bingoGrid.innerHTML = null;
	let localElements = JSON.parse(JSON.stringify(bingoElements));
	let resultElements = [];

	let y = Math.floor(bingoElements.length ** 0.5);
	let x = Math.floor(bingoElements.length / y);

	for (var i = 0; i < x * y; i++) {
		let index = Math.floor(Math.random()*localElements.length);
		resultElements.push(localElements.pop(index));
	}

	localStorage.setItem("savedGrid", resultElements);
	localStorage.setItem("gridX", x);
	localStorage.setItem("gridY", y);

	displayGrid(resultElements, x, y);
}

function displayGrid (grid, x, y)
{
	bingoGrid.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
	bingoGrid.style.gridTemplateRows = `repeat(${y}, 1fr)`;

	grid.forEach( (element) => {
		let gridElement = document.createElement('div');
		gridElement.className = "grid-element";
		gridElement.innerHTML = element;
		bingoGrid.appendChild(gridElement);
	});
}

function cleanAll ()
{
	bingoGrid.innerHTML = null;
	localStorage.removeItem("savedGrid");
	localStorage.removeItem("gridX");
	localStorage.removeItem("gridY");
	list.innerHTML = null;
}