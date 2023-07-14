"use strict";

window.addEventListener("scroll", function () {
  const leaderboard = document.querySelector(".leaderboard");
  const lbcoords = leaderboard.getBoundingClientRect();
  console.log(lbcoords);
  const header = document.querySelector(".header");
  const threshold = 100;
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  if (scrollPosition > threshold) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }
});
