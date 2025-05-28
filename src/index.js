document.addEventListener("DOMContentLoaded", () => {
  const dogsUrl = "http://localhost:3000/pups";
  const dogBar = document.querySelector("div#dog-bar");

  fetch(dogsUrl)
    .then((response) => response.json())
    .then((dogs) => {
      dogs.forEach((dog) => {
        const dogName = document.createElement("span");
        dogName.textContent = dog.name;
        dogBar.append(dogName);
      });
    });
});
