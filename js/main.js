let boardPositions = [];
let shipPositions = [];
let shipCount;
let shipFound;
init();

function init() {

  document.querySelector("#startButton").addEventListener("click", gameStart);
  document.querySelector("#deleteButton").addEventListener("click", tableDelete);

  toggleDisplay(false);

  document.querySelector("#PlayFieldX").value = 5;
  document.querySelector("#PlayFieldY").value = 5;
}

function gameStart() {
  boardPositions = [];
  shipPositions = [];
  shipCount = 0;
  shipFound = 0;

  toggleDisplay(true);
  tableCreate()
  addShips();
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
    // TODO: difficulity settings will going to change the "ai" behaviour,
    // on Easy it will going to pick randomly only
    // on Medium if a ship is hit, then it will randomly pick around the hit and after random again
    // on Hard if a ship is hit, then it will randomly pick around until not found all the connected ship
    // currently it just ship numbers
    case "Easy":
      break;
    case "Medium":
      break;
    case "Hard":
      break;

  }


  let tBody = document.querySelector("#enemyTable tbody");
  for (let i = 0; i < gameFieldX; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < gameFieldY; j++) {

      let td = document.createElement("td");
      let button = document.createElement("button");
      let buttonId = i + "" + j;
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
    if (Math.random() * 10 <= 3) {
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
  if (shipPositions.includes(strippedId)) {
    document.querySelector("#area" + strippedId).setAttribute("class", "btn btn-danger");
    if (shipCount > shipFound) {
      shipFound++;
    }
    if (shipFound == shipCount) {
      alert("Congratulations, you found all the ships!");
    }
  } else {
    document.querySelector("#area" + strippedId).setAttribute("class", "btn btn-dark");
  }
  document.querySelector("#remainingSpan").innerHTML = shipCount - shipFound;

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

  }
}




