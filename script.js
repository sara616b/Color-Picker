"use strict";
document.addEventListener("DOMContentLoaded", start);

let r;
let g;
let b;
let hex;
let hsl;

function start() {
  //get color input value
  let inputField = document.querySelector("#colorvalue");
  let colorFromInput = inputField.value;
  console.log("color: " + colorFromInput);
  colorChanges(colorFromInput);

  //extract hex, rgb, hsl from input
  document.querySelector("input").addEventListener("input", colorChanges);
}

function colorChanges(color) {
  //get hex
  console.log("some change in color");
  hex = document.querySelector("input").value;

  //get rgb and hsl
  hexToRgb(hex);

  //display info
  displayInfo();
}

function displayInfo() {
  document.querySelector("#color").style.backgroundColor = hex;
  document.querySelector("#hex").textContent = hex;
  document.querySelector("#rgb").textContent = `${r}, ${g}, ${b}`;
  document.querySelector("#hsl").textContent = hsl;
}

function hexToRgb(hexColor) {
  let hashLocal = hexColor.indexOf("#");
  r = parseInt(hexColor.substring(hashLocal + 1, hashLocal + 3), 16);
  g = parseInt(hexColor.substring(hashLocal + 3, hashLocal + 5), 16);
  b = parseInt(hexColor.substring(hashLocal + 5, hashLocal + 7), 16);

  rgbToHsl(r, g, b);
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  h = h.toFixed(0);
  s = s.toFixed(0);
  l = l.toFixed(0);

  hsl = h + " " + s + "% " + l + "%";
}
