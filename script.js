"use strict";
document.addEventListener("DOMContentLoaded", start);

function start() {
  //get initial color
  getSelectedColor();
  //when color value changes -> getSelectedColor and then show info
  document.querySelector("input").addEventListener("input", getSelectedColor);
}

function getSelectedColor() {
  // Getting a selected color from the user - hexvalue
  let color = document.querySelector("input").value;

  //get rgb from hex
  let rgbOb = hexToRGB(color);
  let rgbString = rgbToCssString(rgbOb.r, rgbOb.g, rgbOb.b);

  //get hsl from rgb
  let hsl = rgbToHSL(rgbOb.r, rgbOb.g, rgbOb.b);

  showSelectedColor(color, rgbString, hsl);
}

function showSelectedColor(hex, rgb, hsl) {
  showColoredBox(hex);
  showHex(hex);
  showRGB(rgb);
  showHSL(hsl);
}
function showColoredBox(color) {
  document.querySelector("#color").style.backgroundColor = color;
}
function showHex(color) {
  document.querySelector("#hex").textContent = color;
}
function showRGB(color) {
  document.querySelector("#rgb").textContent = color;
}
function showHSL(color) {
  document.querySelector("#hsl").textContent = color;
}
//hex to rgb returns object with r, g, b
function hexToRGB(hexColor) {
  let hashtagLocation = hexColor.indexOf("#");
  let r = parseInt(
    hexColor.substring(hashtagLocation + 1, hashtagLocation + 3),
    16
  );
  let g = parseInt(
    hexColor.substring(hashtagLocation + 3, hashtagLocation + 5),
    16
  );
  let b = parseInt(
    hexColor.substring(hashtagLocation + 5, hashtagLocation + 7),
    16
  );

  return { r, g, b };
}
//rgb to string returns string in css format
function rgbToCssString(r, g, b) {
  return `rgb(${r},${g},${b})`;
}
//rgb to hex returns string with hexvalue
function rgbToHex({ r, g, b }) {
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
//rgb to hsl returns string with hsl values
function rgbToHSL(r, g, b) {
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
