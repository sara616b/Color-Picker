"use strict";
document.addEventListener("DOMContentLoaded", start);

function start() {
  //get initial color
  getSelectedColor();
  //when color value changes -> getSelectedColor
  document.querySelector("input").addEventListener("input", getSelectedColor);
}

function getSelectedColor() {
  // Getting a selected color from the user
  let color = document.querySelector("input").value;
  // let rgbOb = hexToRGB(color);
  // let rgbString = rgbToCssString(rgbOb.r, rgbOb.g, rgbOb.b);

  // let colorValues = {
  //   hex: color;
  //   rgb:
  // }
  showSelectedColor(color);
}

function showSelectedColor(color) {
  // Showing a selected color (possibly a delegator for the following function calls)
  showColoredBox(color);
  showHex(color);
  showRGB(color);
  showHSL(color);
}
function showColoredBox(color) {
  // Showing the color as a colored box in CSS
  document.querySelector("#color").style.backgroundColor = color;
}
function showHex(color) {
  // Showing the color as hex
  document.querySelector("#hex").textContent = color;
}
function showRGB(color) {
  // Showing the color as RGB
  let rgbOb = hexToRGB(color);
  let rgbString = rgbToCssString(rgbOb.r, rgbOb.g, rgbOb.b);
  document.querySelector("#rgb").textContent = rgbString;
}
function showHSL(color) {
  // Showing the color as HSL
  let rgb = hexToRGB(color);
  let hsl = rgbToHSL(rgb.r, rgb.g, rgb.b);
  document.querySelector("#hsl").textContent = hsl;
}
function hexToRGB(hexColor) {
  // Converting hex to RGB
  let hashLocal = hexColor.indexOf("#");
  let r = parseInt(hexColor.substring(hashLocal + 1, hashLocal + 3), 16);
  let g = parseInt(hexColor.substring(hashLocal + 3, hashLocal + 5), 16);
  let b = parseInt(hexColor.substring(hashLocal + 5, hashLocal + 7), 16);

  return { r, g, b };
}
function rgbToCssString(r, g, b) {
  // Converting RGB to CSS usable string, like rgb(100, 123, 192);
  return `rgb(${r},${g},${b})`;
}
function rgbToHex({ r, g, b }) {
  // Converting RGB to hex
  let rToHex = r.toString(16);
  if (rToHex.length == 1) {
    rToHex = "0" + rToHex;
  }
  let gToHex = g.toString(16);
  if (gToHex.length == 1) {
    gToHex = "0" + gToHex;
  }
  let bToHex = b.toString(16);
  if (bToHex.length == 1) {
    bToHex = "0" + bToHex;
  }
  let hexColor = "#" + rToHex + gToHex + bToHex;

  return hexColor;
}
function rgbToHSL(r, g, b) {
  // Converting RGB to HSL
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

  return h + " " + s + "% " + l + "%";
}
