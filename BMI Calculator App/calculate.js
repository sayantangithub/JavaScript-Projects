const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const height = parseInt(document.getElementById("height").value);
  const weight = parseInt(document.getElementById("weight").value);
  const result = document.getElementById("results");

  if (isNaN(height) || height <= 0 || height === "") {
    result.innerHTML = `Please give a valid height ${height}`;
  } else if (isNaN(weight) || weight <= 0 || weight === "") {
    result.innerHTML = `Please give a valid weight ${weight}`;
  } else {
    const bmi = (weight / ((height * height) / 10000)).toFixed(2);
    result.innerHTML = `<span>${bmi}</span>`;
  }
});
