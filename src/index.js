// Fetch all dog data ***
// Display all dog names in bar in spans ***
// Clicking dog apan displays dog details(see below) ***
// Clicking button on detail toggles "Good/Bad Dog" ***


const baseURL = "http://localhost:3000/pups";

//DOM Selectors
const bar = document.querySelector('dog-bar')
const details = document.querySelector('dog-info')
const filterButton = document.querySelector('good-dog-filter')

//Fetches
function getAllDogs (){
fetch(baseUrl)
.then(res => res.json())
.then(renderAllInBar)

}

function getOneDog(id){
return fetch(baseURL + `${id}`)
.then(res => res.json())
}

//Rendering
function renderAllInBar(dogsArray){
bar.innerHTML = ''
dogsArray.forEach(addOneDogToBar)
}

function addOneDogToBar(dogObject){
const dogSpan - document.createElement('span')
dogSpan.innerText = dogObject.name 
dogSpan.dataset.id = dogObject.id
dogSpan.addEventListener('click', handleSpanClick)
bar.append(dogSpan)
}

function showOneDog(dogObject){
    details.innerHTML = ''
    const dogDiv = document.createElement('div')
    dogDiv.innerHTML = `
    <img src=${dogObject.image}>
    <h2>${dogObject.name}</h2>`
    const pupButton = document.createElement('button')
    let string 
    if(dogObject.isGoodDog){
        string = "Good Dog"}
        else{
            string = "Bad Dog"
        }
    }
    pupButton.textContent 
    details.append(dogDiv, pupButton)
}

//Event Handlers
function handleSpanClick(event){
const id = event.target.dataset.id
getOneDog(id).then(showOneDog)
details.append(dogDiv)

}

//Initialize
getAllDogs()