class Adapter {
  static getDogs(){
    return fetch("http://localhost:3000/pups")
      .then(r => r.json())
  }

  static updateDog(dog){
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({isGoodDog: dog.isGoodDog})
    }
    return fetch(`http://localhost:3000/pups/${dog.id}`, options)
      .then(r => r.json())
  }
}
