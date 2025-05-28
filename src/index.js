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
        });
      });
    });
});
