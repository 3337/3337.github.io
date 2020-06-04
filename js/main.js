let boardPositions = [];
let shipPositions = [];
let shipCount;
let shipFound;
let torpedosFiredCount;
let efficiency;
let allAreasCount;
let diffPercentage;
let torpedosWastedCount;
init();

function init() {

  document.querySelector("#startButton").addEventListener("click", gameStart);
  document.querySelector("#deleteButton").addEventListener("click", tableDelete);

  toggleDisplay(false);

  document.querySelector("#PlayFieldX").value = 15;
  document.querySelector("#PlayFieldY").value = 15;

}

function gameStart() {
  boardPositions = [];
  shipPositions = [];
  shipCount = 0;
  shipFound = 0;
  torpedosFiredCount = 0;
  efficiency = 0;
  allAreasCount = 0;
  diffPercentage = 0;
  torpedosWastedCount = 0;

  toggleDisplay(true);
  tableCreate()
  addShips();
  document.querySelector("#allAreasSpan").innerHTML = allAreasCount;
  document.querySelector("#torpedosFiredSpan").innerHTML = 0;
  document.querySelector("#efficiencySpan").innerHTML = 100.00;
  document.querySelector("#torpedosWastedSpan").innerHTML = 0;
  
}

function tableDelete() {
  document.querySelector("tbody").innerHTML = "";
  toggleDisplay(false);
}

function tableCreate() {
  let gameFieldX = document.querySelector("#PlayFieldX").value;
  let gameFieldY = document.querySelector("#PlayFieldY").value;
  let difficulity = document.querySelector("#difficulityFormControlSelect").value;



  switch (difficulity) {
    case "Easy":
      diffPercentage = 7;
      break;
    case "Medium":
      diffPercentage = 3;
      break;
    case "Hard":
      diffPercentage = 1;
      break;

  }


  let tBody = document.querySelector("#enemyTable tbody");
  for (let i = 0; i < gameFieldX; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < gameFieldY; j++) {
      allAreasCount++;
      let td = document.createElement("td");
      let button = document.createElement("button");
      let buttonId = allAreasCount;
      boardPositions.push(buttonId);
      button.setAttribute("id", "area" + buttonId);
      button.setAttribute("class", "btn btn-primary");

      button.innerHTML = "O";
      td.appendChild(button);
      tr.appendChild(td);

    }
    tBody.appendChild(tr);
  }
  return gameFieldX * gameFieldY;
}

function addShips() {
  for (let position of boardPositions) {
    if (Math.random() * 10 <= diffPercentage) {
      shipPositions.push(position);
      shipCount++;
    }
  }

  for (let position of boardPositions) {
    document.querySelector("#area" + position).addEventListener("click", hitOrMiss);
  }

  document.querySelector("#remainingSpan").innerHTML = shipCount;
}

function hitOrMiss() {
  let strippedId = this.id.replace("area", "");
  if (shipPositions.includes(parseInt(strippedId))) {
    document.querySelector("#area" + strippedId).setAttribute("class", "btn btn-danger");
    if (shipCount >= shipFound) {
      shipFound++;
    }
    if (shipFound == shipCount) {
      alert("Congratulations, you found all the ships!");
    }
  } else {
    document.querySelector("#area" + strippedId).setAttribute("class", "btn btn-dark");
    torpedosWastedCount++;
  }
  torpedosFiredCount++;
  efficiency = (shipFound / torpedosFiredCount) * 100;
  efficiency = efficiency.toFixed(2);

  if (efficiency < 30.00) {
    document.querySelector("#alertInfo").style.display = "initial";
  } else {
    document.querySelector("#alertInfo").style.display = "none";
  }
  

  refreshInfoDisplayData();

}

function refreshInfoDisplayData() {
  document.querySelector("#remainingSpan").innerHTML = shipCount - shipFound + " / " + shipFound;
  document.querySelector("#torpedosFiredSpan").innerHTML = torpedosFiredCount;
  document.querySelector("#efficiencySpan").innerHTML = efficiency;
  document.querySelector("#torpedosWastedSpan").innerHTML = torpedosWastedCount;
}

function toggleDisplay(isGameStarted) {
  if (isGameStarted) {
    document.querySelector("#startButton").style.display = "none";
    document.querySelector("#deleteButton").style.display = "initial";
    document.querySelector("#gameForm").style.display = "none";
    document.querySelector("#remainingInfo").style.display = "initial";



  } else {
    document.querySelector("#startButton").style.display = "initial";
    document.querySelector("#gameForm").style.display = "initial";
    document.querySelector("#deleteButton").style.display = "none";
    document.querySelector("#remainingInfo").style.display = "none";
    document.querySelector("#alertInfo").style.display = "none";

  }
}




