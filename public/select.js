const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");

function selectInput(list) {
  inputBox.value = list.innerHTML;
  resultsBox.innerHTML = "";
  window.location.href = '/player?name=' + inputBox.value;
}
