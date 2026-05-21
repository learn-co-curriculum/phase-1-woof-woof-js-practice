const baseUrl = "http://localhost:3000/pups/"

document.addEventListener("DOMContentLoaded", async () => {
  const doggos = await getDoggos()
  let filterBtn = document.getElementById('good-dog-filter')
  updateDogBar(JSON.parse(filterBtn.getAttribute('data-filtered')))

  filterBtn.addEventListener('click', (e) => {
    JSON.parse(filterBtn.getAttribute('data-filtered')) ? e.target.textContent = "Filter good dogs: OFF" : e.target.textContent = "Filter good dogs: ON"
    filterBtn.setAttribute('data-filtered', !JSON.parse(filterBtn.getAttribute('data-filtered')))
    updateDogBar(JSON.parse(filterBtn.getAttribute('data-filtered')))
  })
})

async function getDoggos() {
   const res = await fetch(baseUrl)
   const data = await res.json()

   return data
}

function getDoggo(dogSpan) {
  const doggoId = parseInt(dogSpan.id.slice(7))

  fetch(baseUrl + doggoId)
  .then(res => res.json())
  .then(doggo => {
    let doggoDiv = document.createElement('div')
    let doggoImg = document.createElement('img')
    let doggoH2 = document.createElement('h2')
    let doggoBtn = document.createElement('button')

    doggoImg.setAttribute('src', doggo.image)
    doggoH2.textContent = doggo.name
    if(doggo.isGoodDog) {
      doggoBtn.textContent = 'Good Dog!'
      doggoBtn.setAttribute('data-good-dog', 'true')  
    } else {
      doggoBtn.textContent = 'Bad Dog!'
      doggoBtn.setAttribute('data-good-dog', 'false') 
    }
    doggoBtn.addEventListener('click', () => {
      fetch(baseUrl + doggo.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({isGoodDog: !doggo.isGoodDog})
      }).then(res => res.json())
      .then(data => {
        console.log(data)
        getDoggo(dogSpan)
        updateDogBar(JSON.parse(document.getElementById('good-dog-filter').getAttribute('data-filtered')))
      })
    })

    doggoDiv.appendChild(doggoImg)
    doggoDiv.appendChild(doggoH2)
    doggoDiv.appendChild(doggoBtn)
    document.getElementById('dog-info').replaceChildren(doggoDiv)
  })
} 

async function updateDogBar(filtered) {
  const doggos = await getDoggos()
  const dogSpans = []
  
  if(filtered) {
    for(const dog of await doggos.filter(dog => dog.isGoodDog)) {
      let dogSpan = document.createElement('span')
      dogSpan.textContent = dog.name
      dogSpan.id = "dogSpan" + dog.id
      dogSpan.setAttribute('data-good-dog', dog.isGoodDog)
      dogSpan.addEventListener('click', e => getDoggo(e.target))

      dogSpans.push(dogSpan)
    }
  } else {
    for(const dog of await doggos) {
      let dogSpan = document.createElement('span')
      dogSpan.textContent = dog.name
      dogSpan.id = "dogSpan" + dog.id
      dogSpan.setAttribute('data-good-dog', dog.isGoodDog)
      dogSpan.addEventListener('click', e => getDoggo(e.target))

      dogSpans.push(dogSpan)
    }
  }
  document.getElementById('dog-bar').replaceChildren(...dogSpans)
}
