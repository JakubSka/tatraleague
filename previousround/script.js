"use strict";
//hiding header
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  const threshold = 50;
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  if (scrollPosition > threshold) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }
});
