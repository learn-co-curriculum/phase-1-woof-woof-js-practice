class DogController {
  static init(){
    DogController.addDogsToDogBar()
    const filterButton = document.querySelector("#good-dog-filter")
    filterButton.dataset.filter = false
    filterButton.addEventListener("click", DogController.filterDogs)
  }

  static addDogsToDogBar(){
    const dogBar = document.querySelector("#dog-bar")
    const filterButton = document.querySelector("#good-dog-filter")
    const filter = filterButton.dataset.filter === "true" ? true : false
    dogBar.innerHTML = ""
    Adapter.getDogs()
      .then(dogs => {
        dogs.forEach(dogObj => {
          if (!filter || dogObj.isGoodDog) {
            const dog = new Dog(dogObj)
            dogBar.append(dog.spanEl())
          }
        })
      })
  }

  static showDog(dog){
    const dogInfo = document.querySelector("#dog-info")
    dogInfo.innerHTML = ""
    dogInfo.append(dog.imageEl(), dog.h2El(), dog.buttonEl())
  }

  static toggleGoodDog(dog, e){
    if (dog.isGoodDog){
      e.target.innerText = "Bad Dog!"
    } else {
      e.target.innerText = "Good Dog!"
    }
    dog.isGoodDog = !dog.isGoodDog
    Adapter.updateDog(dog)
      .then(DogController.addDogsToDogBar)
  }

  static filterDogs(e){
    if (e.target.dataset.filter === "true") {
      e.target.innerText =  "Filter good dogs: OFF"
      e.target.dataset.filter =  "false"
    } else {
      e.target.innerText = "Filter good dogs: ON"
      e.target.dataset.filter = "true"
    }
    DogController.addDogsToDogBar()
  }
}
