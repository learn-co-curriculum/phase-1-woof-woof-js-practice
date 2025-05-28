document.addEventListener("DOMContentLoaded", () => {
  const dogsUrl = "http://localhost:3000/pups";
  const dogBar = document.querySelector("div#dog-bar");
  const dogInfo = document.querySelector("div#dog-info");
  const goodDogFilter = document.querySelector("#good-dog-filter");

  const dogImg = document.createElement("img");
  const dogName = document.createElement("h2");
  const goodOrBad = document.createElement("button");
  goodOrBad.setAttribute("hidden", true);
  dogInfo.append(dogImg, dogName, goodOrBad);

  let goodDogsOnly = true;

  function addDogs(dogs) {
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
  }

  function fetchDogs() {
    const currentDogs = Array.from(dogBar.children);
    currentDogs.forEach((dog) => dog.remove());
    fetch(dogsUrl)
      .then((response) => response.json())
      .then((dogs) => {
        if (!goodDogsOnly) {
          goodDogFilter.textContent = "Filter good dogs: OFF";
          addDogs(dogs);
        } else if (goodDogsOnly) {
          goodDogFilter.textContent = "Filter good dogs: ON";
          const goodDogs = [];
          dogs.forEach((dog) => {
            if (dog.isGoodDog) {
              goodDogs.push(dog);
            }
          });
          addDogs(goodDogs);
        }
      });
  }

  fetchDogs();

  goodOrBad.addEventListener("click", () => {
    const id = goodOrBad.id;

    fetch(`${dogsUrl}/${id}`)
      .then((response) => response.json())
      .then((dog) => {
        const updatedDog = {
          isGoodDog: !dog.isGoodDog,
        };

        return fetch(`${dogsUrl}/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(updatedDog),
        });
      })
      .then((response) => response.json())
      .then((updatedDog) => {
        goodOrBad.textContent = updatedDog.isGoodDog ? "Good Dog!" : "Bad Dog!";
        if (goodDogsOnly) {
          fetchDogs();
        }
      });
  });

  goodDogFilter.addEventListener("click", () => {
    goodDogsOnly = !goodDogsOnly;
    fetchDogs();
  });
});
