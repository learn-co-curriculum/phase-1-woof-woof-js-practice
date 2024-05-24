document.addEventListener("DOMContentLoaded", () =>  {

  const url = "http://localhost:3000/pups"
  const dogBar = document.querySelector("#dog-bar")
  const dogInfo = document.querySelector("#dog-info")

  fetch(url)
  .then ((response) => response.json())
  .then((dogData) => dogData.forEach((dog) => renderDogBar(dog)))

  function renderDogBar(dog) {

    const span = document.createElement("span")
    const img = document.createElement("img")
    const h2 = document.createElement("h2")
    const goodButton = document.createElement("button")

    span.textContent = `${dog.name}`
    span.style.cursor = "pointer"

    dogBar.appendChild(span)

    span.addEventListener("click" , () => {
      showDog(dog)
    })

    function showDog(dog) {

      dogInfo.textContent = ""

      const img = document.createElement("img")
      const h2 = document.createElement("h2")
      const goodButton = document.createElement("button")

      img.src = `${dog.image}`
      h2.textContent = `${dog.name}`
      goodButton.textContent = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"

      dogInfo.appendChild(img)
      dogInfo.appendChild(h2)
      dogInfo.appendChild(goodButton)


      goodButton.addEventListener("click", () => {

        let isGoodDog = (goodButton.textContent === "Good Dog!")
        let dogStatus = {
          isGoodDog: !isGoodDog
        }

        fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(dogStatus)
      })
      .then((response) => response.json())
      .then(() => {
        if (isGoodDog) {
          goodButton.textContent = "Bad Dog!"
        } else {
          goodButton.textContent = "Good Dog!"
        }
      })
      .catch((e) => alert(e.message))
    });
    }
  }
})

