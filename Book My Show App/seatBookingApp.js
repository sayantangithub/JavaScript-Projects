const movieList = [
  {
    movieName: "Flash",
    price: 7,
  },
  {
    movieName: "Spiderman",
    price: 5,
  },
  {
    movieName: "Batman",
    price: 4,
  },
];
const selectMovieE1 = document.getElementById("selectMovie");
const allSeatCont = document.querySelectorAll("#seatCont .seat");
console.log(allSeatCont);

const selectedSeatHolderE1 = document.getElementById("selectedSeatHolder");

const moviePriceE1 = document.getElementById("moviePrice");

const cancelBtnEL = document.getElementById("cancelBtn");

const proceedBtnE1 = document.getElementById("proceedBtn");

movieList.forEach((movie) => {
  const optionE1 = document.createElement("option");
  optionE1.innerHTML = `${movie.movieName} $${movie.price}`;
  selectMovieE1.appendChild(optionE1);
});

let moviePrice = 7;
let currentMovieName = `Tom and Jerry 2021`;

selectMovieE1.addEventListener("input", (e) => {
  let movieName = e.target.valuesplit("");
  let dollarIndex = movieName.indexOf("$");
  let movie = movieName.splice(0, dollarIndex - 1).join("");
  currentMovieName = movie;
  moviePrice = JSON.parse(movieName.splice(2, dollarIndex).join(""));

  updateMovieName(movie, moviePrice);
  updatePrice(moviePrice, takenSeats.length);
});
let initialSeatValue = 0;
allSeatCont.forEach((seat) => {
  const attr = document.createAttribute("data-seatid");
  attr.value = ++initialSeatValue;
  seat.setAttributeNode(attr);
});
