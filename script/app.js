// Constantes
const input = document.querySelector('#element-name');
const list = document.querySelector('#elements-list');
const generateButton = document.querySelector('#generate-button');
const cleanButton = document.querySelector('#clean-button');
const bingoGrid = document.querySelector('#bingo-grid');
const darkToggle = document.querySelector('#dark-toggle');

// Variables globales
let bingoElements = [];
let favTheme = "dark";

// EventListeners
input.addEventListener('keyup', switchKey);
generateButton.addEventListener('click', generateGrid);
cleanButton.addEventListener('click', cleanAll);
darkToggle.addEventListener('click', toggleDarkMode);

// Au chargement de la page.
if(localStorage.savedGrid) {
	displayGrid(localStorage.savedGrid.split(","), localStorage.gridX, localStorage.gridY);
}

if(localStorage.favTheme) {
	favTheme = localStorage.favTheme;
	toggleDarkMode();
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

	let index = bingoElements.findIndex(element => element == elementName);
	bingoElements.pop(index);

}

function addElement (element)
{
	if (element) {
		bingoElements.push(element);

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
	if (bingoElements.length) {	
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
	} else {
		console.warn("No grid to display and save.");
	}

	scrollTo(0, window.innerHeight);
}

function displayGrid (grid, x, y)
{
	bingoGrid.innerHTML = null;
	bingoGrid.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
	bingoGrid.style.gridTemplateRows = `repeat(${y}, 1fr)`;

	grid.forEach( (element) => {
		let gridElement = document.createElement('div');
		gridElement.className = "grid-element";
		gridElement.innerHTML = element;
		gridElement.addEventListener('click',function () {
			gridElement.classList.toggle('grid-element-active');
		});
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

function toggleDarkMode () {
	document.body.classList.toggle("dark-mode");
	localStorage.setItem("favTheme", favTheme);
}