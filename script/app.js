// Constantes
const input = document.querySelector('#element-name');
const list = document.querySelector('#elements-list');
const generateButton = document.querySelector('#generate-button');

// Variables globales
let bingoElements = [];

// EventListeners
input.addEventListener('keyup', switchKey);
generateButton.addEventListener('click', generateGrid);


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

function generateGrid ()
{

}