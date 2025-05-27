const url = "http://localhost:3000/pups"
let filterGood = false;
document.addEventListener('DOMContentLoaded', () => {
  const goodDogFilter = document.querySelector('#good-dog-filter');
  loadDogs()
  goodDogFilter.addEventListener('click', toggleDogFilter)
})

const loadDogs = () => {
  fetch(url)
    .then(resp => resp.json())
    .then(addDogToDogBar)
}

const toggleDogFilter = () => {
  const goodDogFilter = document.querySelector('#good-dog-filter');
  const offMessage = 'Filter good dogs: OFF';
  const onMessage = 'Filter good dogs: ON'
  if (filterGood) {
    filterGood = false;
    goodDogFilter.textContent = offMessage
  } else {
    filterGood = true;
    goodDogFilter.textContent = onMessage
  }
  loadDogs()
}

const addDogToDogBar = (dogs) => {
  const dogBar = document.querySelector('#dog-bar')
  dogBar.innerHTML = ''
  dogs.forEach(dog => {
    if (filterGood) {
      if (dog.isGoodDog) {
        const dogSpan = document.createElement('span')
        dogSpan.textContent = dog.name
        dogSpan.addEventListener('click', displayDogInfo)
        dogBar.appendChild(dogSpan)
      }
    } else {
      const dogSpan = document.createElement('span')
      dogSpan.textContent = dog.name
      dogSpan.addEventListener('click', displayDogInfo)
      dogBar.appendChild(dogSpan)
    }
  })
}

function displayDogInfo() {
  fetch(url)
    .then(resp => resp.json())
    .then((dogs) => {
      const dog = dogs.find(dog => dog.name === this.textContent)
      const dogInfoDiv = document.querySelector('#dog-info')
      dogInfoDiv.innerHTML = ''
      const image = document.createElement('img')
      image.src = dog.image
      dogInfoDiv.appendChild(image)
      const header2 = document.createElement('h2')
      header2.textContent = dog.name;
      dogInfoDiv.appendChild(header2)
      const statusButton = document.createElement('button')
      statusButton.textContent = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
      statusButton.addEventListener('click', toggleStatus)
      dogInfoDiv.appendChild(statusButton)
      const currentDogId = document.createElement('input')
      currentDogId.hidden = true
      currentDogId.setAttribute('dog-id', dog.id)
      currentDogId.id = 'hidden-dog-id'
      dogInfoDiv.appendChild(currentDogId)
    })
}

function toggleStatus() {
  const dogId = Number.parseInt(this.parentNode.querySelector("#hidden-dog-id").getAttribute('dog-id'))
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      isGoodDog: this.textContent === "Good Dog!" ? false : true
    })
  }

  fetch(`${url}/${dogId}`, options)
    .then(resp => resp.json())
    .then(updatedDog => {
      this.textContent = updatedDog.isGoodDog ? "Good Dog!" : "Bad Dog!"
    })
    .catch(error => console.error('Error updating dog status:', error))
}
