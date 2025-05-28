document.addEventListener("DOMContentLoaded", () => {
  const dogsUrl = "http://localhost:3000/pups";
  const dogBar = document.querySelector("div#dog-bar");
  const dogInfo = document.querySelector("div#dog-info");

  const dogImg = document.createElement("img");
  const dogName = document.createElement("h2");
  const goodOrBad = document.createElement("button");
  goodOrBad.setAttribute("hidden", true);
  dogInfo.append(dogImg, dogName, goodOrBad);

  fetch(dogsUrl)
    .then((response) => response.json())
    .then((dogs) => {
      dogs.forEach((dog) => {
        const pup = document.createElement("span");
        pup.textContent = dog.name;
        dogBar.append(pup);

        pup.addEventListener("click", () => {
          dogImg.src = dog.image;
          dogName.textContent = dog.name;
          goodOrBad.removeAttribute("hidden");
          goodOrBad.textContent = dog.isGoodDog ? "Good Dog!" : "Bad Dog!";
          goodOrBad.id = dog.id;
        });
      });
    });

  goodOrBad.addEventListener("click", () => {
    const id = goodOrBad.id;

    fetch(`${dogsUrl}/${id}`)
      .then((response) => response.json())
      .then((dog) => {
        const updatedDog = {
          isGoodDog: !dog.isGoodDog
        };

        return fetch(`${dogsUrl}/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json",
          },
          body: JSON.stringify(updatedDog)
        });
      })
      .then((response) => response.json())
      .then((updatedDog) => {
        goodOrBad.textContent = updatedDog.isGoodDog ? "Good Dog!" : "Bad Dog!"
      })
  });
});
