"use strict";

const tableRound = document.getElementById("tableRound");
const tableLeaderboard = document.getElementById("tableLeaderboard");
const teamNumber = tableLeaderboard.rows.length;
//adding matches

function generateMatches(firstName, firstScore, secondScore, SecondName) {
  const parentElement = document.querySelector(".tbody");
  const markup = `
<tr>
      <td>${firstName}</td>
      <td>${firstScore}</td>
      <td>:</td>
      <td>${secondScore}</td>
      <td>${SecondName}</td>
    </tr>
    `;
  parentElement.insertAdjacentHTML("afterbegin", markup);
}

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
    let teamGoalsScored = parseInt(cellsLeaderboard[4].innerText);
    let teamGoalsLose = parseInt(cellsLeaderboard[5].innerText);
    let win = parseInt(cellsLeaderboard[6].innerText);
    let lose = parseInt(cellsLeaderboard[8].innerText);
    let draw = parseInt(cellsLeaderboard[7].innerText);
    if (teamName == searchName) {
      teamGoalsScored = teamGoalsScored + parseInt(goalsScored);
      cellsLeaderboard[4].innerText = teamGoalsScored;
      teamGoalsLose = teamGoalsLose + parseInt(goalsLose);
      cellsLeaderboard[5].innerText = teamGoalsLose;
      if (goalsScored > goalsLose) {
        teamPoints = teamPoints + 3;
        cellsLeaderboard[2].innerText = teamPoints;
        win += 1;
        cellsLeaderboard[6].innerText = win;
      } else if (goalsLose > goalsScored) {
        lose += 1;
        cellsLeaderboard[8].innerText = lose;
      } else if (goalsLose == goalsScored) {
        teamPoints += 1;
        cellsLeaderboard[2].innerText = teamPoints;
        draw += 1;
        cellsLeaderboard[7].innerText = draw;
      }
    }
    cellsLeaderboard[3].innerText =
      parseInt(cellsLeaderboard[4].innerText) -
      parseInt(cellsLeaderboard[5].innerText);
  }
}

//compare a values to higlight a winner and adding points
function compareValuesInRow(rowIndex) {
  const rowRound = tableRound.rows[rowIndex];
  if (!rowRound) {
    console.error("Incorrect row index");
    return;
  }
  // get a value from cells in a row
  const cellsRound = rowRound.getElementsByTagName("td");
  const firstTeamScore = parseInt(cellsRound[1].innerText);
  const secondTeamScore = parseInt(cellsRound[3].innerText);
  const firstTeamName = cellsRound[0].innerText;
  const SecondTeamName = cellsRound[4].innerText;
  if (firstTeamScore > secondTeamScore) {
    cellsRound[1].style.color = "rgb(52, 212, 52)";
    searchInTeams(firstTeamName, firstTeamScore, secondTeamScore);
    cellsRound[3].style.color = "red";
    searchInTeams(SecondTeamName, secondTeamScore, firstTeamScore);
  } else if (secondTeamScore > firstTeamScore) {
    cellsRound[3].style.color = "rgb(52, 212, 52)";
    searchInTeams(SecondTeamName, secondTeamScore, firstTeamScore);
    cellsRound[1].style.color = "red";
    searchInTeams(firstTeamName, firstTeamScore, secondTeamScore);
  } else if (secondTeamScore == firstTeamScore) {
    cellsRound[3].style.color = "rgb(204, 138, 38)";
    searchInTeams(firstTeamName, firstTeamScore, secondTeamScore);
    cellsRound[1].style.color = "rgb(204, 138, 38)";
    searchInTeams(SecondTeamName, secondTeamScore, firstTeamScore);
  }
}

function finishedMatches(rowIndex) {
  const firstRowRound = tableRound.rows[rowIndex];
  const anotherRowRound = tableRound.rows[rowIndex + 1];
  if (!firstRowRound) {
    console.error("Incorrect first row index");
    return;
  }
  if (!anotherRowRound) {
    console.log(anotherRowRound);
    console.error("Incorrect another row index");
    return;
  }
  // get a value from cells in a row
  const cellsFirstRound = firstRowRound.getElementsByTagName("td");
  const cellsAnotherRound = anotherRowRound.getElementsByTagName("td");
  const firstScore = parseInt(cellsFirstRound[1].innerText);
  const anotherScore = parseInt(cellsAnotherRound[1].innerText);

  if (isNaN(firstScore)) {
    if (!isNaN(anotherScore)) {
      tableRound.rows[rowIndex].parentNode.insertBefore(
        tableRound.rows[rowIndex + 1],
        tableRound.rows[rowIndex]
      );
    } else if (isNaN(anotherRowRound)) {
      for (
        let rowIndex = 0;
        rowIndex < tableRound.rows.length - 1;
        rowIndex++
      ) {
        const searchedFinishedMatch = tableRound.rows[rowIndex + 1];
        const searchedFinishedRound =
          searchedFinishedMatch.getElementsByTagName("td");
        const searchedFinishedScore = parseInt(
          searchedFinishedRound[1].innerText
        );
        if (!isNaN(searchedFinishedScore)) {
          tableRound.rows[rowIndex].parentNode.insertBefore(
            tableRound.rows[rowIndex + 1],
            tableRound.rows[rowIndex]
          );
        }
      }
    }
  }
}
//implement comparing

generateMatches("Dzikie Smerfy", "10", "0", "Tatrzanka");
generateMatches("Promil Makowiec", "19", "1", "PKS Jarnice");
generateMatches("Tatrzanka Emeryci", "-", "-", "Big Milfs");
generateMatches("Mafia Pniewnik", "10", "12", "Dzikie Smerfy 2");
generateMatches("FC Bronx", "2", "3", "Tornado Stawiska");
generateMatches("Dzikie Smerfy", "11", "7", "PKS Jarnice");
generateMatches("Tatrzanka", "-", "-", "Big Milfs");
generateMatches("Promil Makowiec", "10", "3", "Dzikie Smerfy 2");
generateMatches("Tatrzanka Emeryci", "2", "3", "Tornado Stawiska");
generateMatches("Mafia Pniewnik", "-", "-", "FC Bronx");
generateMatches("Dzikie Smerfy", "-", "-", "Big Milfs");
generateMatches("PKS Jarnice", "-", "-", "Dzikie Smerfy 2");
generateMatches("Tatrzanka", "-", "-", "Tornado Stawiska");
generateMatches("Promil Makowiec", "-", "-", "FC Bronx");
generateMatches("Tatrzanka Emeryci", "-", "-", "Mafia Pniewnik");
generateMatches("Dzikie Smerfy", "-", "-", "Dzikie Smerfy 2");
generateMatches("Big Milfs", "-", "-", "Tornado Stawiska");
generateMatches("PKS Jarnice", "-", "-", "FC Bronx");
generateMatches("Tatrzanka", "6", "8", "Mafia Pniewnik");
generateMatches("Promil Makowiec", "12", "2", "Tatrzanka Emeryci");
generateMatches("Dzikie Smerfy", "-", "-", "Tornado Stawiska");
generateMatches("Dzikie Smerfy 2", "-", "-", "FC Bronx");
generateMatches("Spawacze Z Polnej", "-", "-", "Big Milfs");
generateMatches("Big Milfs", "-", "-", "Mafia Pniewnik");
generateMatches("PKS Jarnice", "-", "-", "Tatrzanka Emeryci");
generateMatches("Tatrzanka", "-", "-", "Promil Makowiec");
generateMatches("Dzikie Smerfy", "-", "-", "FC Bronx");
generateMatches("Tornado Stawiska", "-", "-", "Mafia Pniewnik");
generateMatches("Dzikie Smerfy 2", "6", "7", "Tatrzanka Emeryci");
generateMatches("Big Milfs", "6", "7", "Promil Makowiec");
generateMatches("PKS Jarnice", "8", "5", "Tatrzanka");
generateMatches("Dzikie Smerfy", "-", "-", "Mafia Pniewnik");
generateMatches("FC Bronx", "-", "-", "Tatrzanka Emeryci");
generateMatches("Tornado Stawiska", "-", "-", "Promil Makowiec");
generateMatches("Big Milfs", "-", "-", "PKS Jarnice");
generateMatches("Dzikie Smerfy", "9", "7", "Tatrzanka Emeryci");
generateMatches("Mafia Pniewnik", "5", "16", "Promil Makowiec");
generateMatches("Tatrzanka", "-", "-", "FC Bronx");
generateMatches("Tornado Stawiska", "17", "1", "PKS Jarnice");
generateMatches("Dzikie Smerfy 2", "-", "-", "Big Milfs");
generateMatches("Dzikie Smerfy", "3", "6", "Promil Makowiec");
generateMatches("Tatrzanka", "9", "16", "Tatrzanka Emeryci");
generateMatches("Spawacze Z Polnej", "-", "-", "Tatrzanka");
generateMatches("Mafia Pniewnik", "16", "6", "PKS Jarnice");
generateMatches("FC Bronx", "-", "-", "Big Milfs");
generateMatches("Tornado Stawiska", "-", "-", "Dzikie Smerfy 2");
generateMatches("Spawacze Z Polnej", "-", "-", "PKS Jarnice");
generateMatches("Spawacze Z Polnej", "-", "-", "Tatrzanka Emeryci");
generateMatches("Mafia Pniewnik", "-", "-", "Tatrzanka");
generateMatches("Spawacze Z Polnej", "-", "-", "FC Bronx");
generateMatches("Spawacze Z Polnej", "-", "-", "Dzikie Smerfy");
generateMatches("Spawacze Z Polnej", "-", "-", "Dzikie Smerfy 2");
generateMatches("Spawacze Z Polnej", "-", "-", "Tornado Stawiska");
generateMatches("Promil Makowiec", "-", "-", "Spawacze Z Polnej");
generateMatches("Dzikie Smerfy 2", "12", "6", "Tatrzanka");

for (let i = 0; i < tableRound.rows.length; i++) {
  compareValuesInRow(i);
}
for (let i = 0; i < tableRound.rows.length - 1; i++) {
  finishedMatches(i);
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
  let nextVal = 1;

  while (leftIndex < left.length && rightIndex < right.length) {
    let leftValue = left[leftIndex].getElementsByClassName(
      "sortValue" + nextVal
    )[0].textContent;
    let rightValue = right[rightIndex].getElementsByClassName(
      "sortValue" + nextVal
    )[0].textContent;

    if (parseFloat(leftValue) === parseFloat(rightValue)) {
      nextVal = 2;
      leftValue = left[leftIndex].getElementsByClassName(
        "sortValue" + nextVal
      )[0].textContent;
      rightValue = right[rightIndex].getElementsByClassName(
        "sortValue" + nextVal
      )[0].textContent;
      nextVal = 1;
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
for (let i = 1; i < teamNumber; i++) {
  const rowLeaderboard = tableLeaderboard.rows[i];
  if (!rowLeaderboard) {
    console.error("Incorrect row index");
  }
  const cellsLeaderboard = rowLeaderboard.getElementsByTagName("td");
  cellsLeaderboard[0].innerText = `${i}`;
  if (cellsLeaderboard[0].innerText == "1") {
    cellsLeaderboard[0].style.color = "yellow";
  } else if (cellsLeaderboard[0].innerText == "2") {
    cellsLeaderboard[0].style.color = "rgb(207, 203, 203)";
  } else if (cellsLeaderboard[0].innerText == "2") {
    cellsLeaderboard[0].style.color = "rgb(207, 203, 203)";
  } else if (cellsLeaderboard[0].innerText == "3") {
    cellsLeaderboard[0].style.color = "rgb(189, 83, 12)";
  }
  cellsLeaderboard[9].innerText =
    parseInt(cellsLeaderboard[6].innerText) +
    parseInt(cellsLeaderboard[7].innerText) +
    parseInt(cellsLeaderboard[8].innerText);
}

let input, filter, table, tr, td, i, j, txtValue;
input = document.getElementById("searchInput");
table = document.getElementById("tableRound");

input.addEventListener("input", (e) => {
  tr = table.getElementsByTagName("tr");
  filter = e.target.value.toUpperCase();
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td");
    for (j = 0; j < td.length; j++) {
      if (td[j]) {
        txtValue = td[j].textContent || td[j].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
});
