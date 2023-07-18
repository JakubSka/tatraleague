"use strict";
//hiding header
window.addEventListener("scroll", function () {
  /*
  const leaderboard = document.querySelector(".leaderboard");
  const lbcoords = leaderboard.getBoundingClientRect();
  console.log(lbcoords);
  */
  const header = document.querySelector(".header");
  const threshold = 100;
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  if (scrollPosition > threshold) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }
});


const tableRound = document.getElementById("tableRound");
const tableLeaderboard = document.getElementById("tableLeaderboard");
const teamNumber=tableLeaderboard.rows.length;
//adding points and wins
function searchInTeams(searchName, goalsScored, goalsLose) {
  for (let i = 1; i < teamNumber; i++) {
    const rowLeaderboard = tableLeaderboard.rows[i];
  if (!rowLeaderboard) {
    console.error("Incorrect row index");
    return;
  }
  const cellsLeaderboard = rowLeaderboard.getElementsByTagName("td");
  const teamName = cellsLeaderboard[1].innerText;
  let teamPoints = parseInt(cellsLeaderboard[2].innerText);
  let teamGoalsScored = parseInt(cellsLeaderboard[3].innerText);
  let teamGoalsLose = parseInt(cellsLeaderboard[4].innerText);
  let win = parseInt(cellsLeaderboard[5].innerText);
  let lose = parseInt(cellsLeaderboard[7].innerText);
  let draw = parseInt(cellsLeaderboard[6].innerText);
    if (teamName == searchName) {
      teamGoalsScored += parseInt(goalsScored);
      cellsLeaderboard[3].innerText=teamGoalsScored;
      teamGoalsLose += goalsLose;
      cellsLeaderboard[4].innerText=goalsLose;
      if (goalsScored > goalsLose) {
        teamPoints += 3;
        cellsLeaderboard[2].innerText=teamPoints;
        win += 1;
        cellsLeaderboard[5].innerText=win;
      } else if (goalsLose > goalsScored) {
        lose+=1
        cellsLeaderboard[7].innerText =lose;
      } else if (goalsLose == goalsScored) {
        teamPoints += 1;
        cellsLeaderboard[2].innerText=teamPoints;
        draw += 1;
        cellsLeaderboard[6].innerText=draw;
      }
    }
  }
}

//compare a values to higlight a winner and adding points
function compareValuesInRow(rowIndex){
  const rowRound=tableRound.rows[rowIndex];
  if (!rowRound) {
    console.error('Incorrect row index');
    return;
  }
  // get a value from cells in a row
  const cellsRound = rowRound.getElementsByTagName('td');
  const firstTeamScore = cellsRound[1].innerText;
  const secondTeamScore = cellsRound[3].innerText;
  const firstTeamName=cellsRound[0].innerText;
  const SecondTeamName=cellsRound[4].innerText;
  if(firstTeamScore>secondTeamScore){
    cellsRound[1].style.color="rgb(52, 212, 52)";
    searchInTeams(firstTeamName,firstTeamScore,secondTeamScore);
    cellsRound[3].style.color="red";
    searchInTeams(SecondTeamName,secondTeamScore,firstTeamScore)
  }else if(secondTeamScore>firstTeamScore){
    cellsRound[3].style.color="rgb(52, 212, 52)";
    searchInTeams(SecondTeamName,secondTeamScore,firstTeamScore)
    cellsRound[1].style.color="red";
    searchInTeams(firstTeamName,firstTeamScore,secondTeamScore);
  }else if(firstTeamScore&&secondTeamScore==="-"){}
  else if(secondTeamScore===firstTeamScore){
    cellsRound[3].style.color="rgb(204, 138, 38)";
    searchInTeams(firstTeamName,firstTeamScore,secondTeamScore);
    cellsRound[1].style.color="rgb(204, 138, 38)";
    searchInTeams(SecondTeamName,secondTeamScore,firstTeamScore);
  }else{
    console.log('incorrect value');
  }
}
//implement comparing
for(let i=0;i<tableRound.rows.length;i++){
  compareValuesInRow(i);
}

//sorting points in leaderboard by mergesort
function mergeSort(arr, colIndex) {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left, colIndex), mergeSort(right, colIndex), colIndex);
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  let nextVal=1;

  while (leftIndex < left.length && rightIndex < right.length) {
    let leftValue = left[leftIndex].getElementsByClassName("sortValue"+nextVal)[0].textContent;
    let rightValue = right[rightIndex].getElementsByClassName("sortValue"+nextVal)[0].textContent;

    if (parseFloat(leftValue) === parseFloat(rightValue)) {
      // Jeśli wartości są równe, porównaj po kolejnej kolumnie
      nextVal=2;
      leftValue = left[leftIndex].getElementsByClassName("sortValue" + nextVal)[0].textContent;
      rightValue = right[rightIndex].getElementsByClassName("sortValue" + nextVal)[0].textContent;
    }

    if (parseFloat(leftValue) > parseFloat(rightValue)) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function sortTable() {
  const table = document.getElementById("tableLeaderboard");
  const rows = table.getElementsByTagName("tr");

  const sortedRows = mergeSort(Array.from(rows).slice(1), 1); // Pomijamy pierwszy wiersz z nagłówkami
  for (let i = 0; i < sortedRows.length; i++) {
    table.appendChild(sortedRows[i]);
  }
}
 sortTable();

//numbering a places
for(let i= 1; i<teamNumber;i++){
  const rowLeaderboard = tableLeaderboard.rows[i];
  if (!rowLeaderboard) {
    console.error("Incorrect row index");
    
  }
  const cellsLeaderboard = rowLeaderboard.getElementsByTagName("td");
  cellsLeaderboard[0].innerText=`${i}`
}