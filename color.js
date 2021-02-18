"use strict";
document.addEventListener("DOMContentLoaded", start);

function start() {
  //get initial color
  getColorInput();
  //when color value changes -> getColorInput and then show info
  document
    .querySelector("#colorinput input")
    .addEventListener("input", getColorInput);

  //when harmony choice changes -> getColorInput and so on
  document.querySelector("#harmonies").addEventListener("input", getColorInput);
}

function getColorInput() {
  // Getting a selected color from the user - hexvalue
  let color = document.querySelector("#colorinput input").value;
  getColorValuesInArray(color);
}

//gets harmony, turns base color into hsl and makes arrays for all the colors before then calling the show function
function getColorValuesInArray(color) {
  let harmony = getHarmony();
  console.log(harmony);
  let hslArray = calculateColorArray(harmony, color);
  let rgbArray = [];
  hslArray.forEach((hsl) => {
    let rgb = hslToRGB(hsl[0], hsl[1], hsl[2]);
    rgbArray.push(rgb);
  });
  let hexArray = [];
  rgbArray.forEach((rgb) => {
    let hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
    hexArray.push(hex);
  });
  let rgbStringArray = [];
  rgbArray.forEach((rgb) => {
    let rgbString = rgbToCssString(rgb[0], rgb[1], rgb[2]);
    rgbStringArray.push(rgbString);
  });

  let i = [0, 1, 2, 3, 4];
  i.forEach((i) => {
    showColorValues(hexArray[i], rgbStringArray[i], hslArray[i], i);
  });
}

//returns harmonyChoice from checked radio button
function getHarmony() {
  let harmonyChoice;
  document.querySelectorAll("#harmonies input").forEach((harmony) => {
    if (harmony.checked) {
      harmonyChoice = harmony.value;
    }
  });
  return harmonyChoice;
}

//returns array of arrays with hsl values for the five colors
function calculateColorArray(harmonyChoice, basecolor) {
  if (harmonyChoice == "analogous") {
    return calculateAnalogous(basecolor);
  } else if (harmonyChoice == "monochromatic") {
    return calculateMonocromatic(basecolor);
  } else if (harmonyChoice == "triad") {
    return calculateTriad(basecolor);
  } else if (harmonyChoice == "complementary") {
    return calculateComplementary(basecolor);
  } else if (harmonyChoice == "compound") {
    return calculateCompound(basecolor);
  } else if (harmonyChoice == "shades") {
    return calculateShades(basecolor);
  }
}

//returns array of arrays with hsl values for the five colors
function calculateAnalogous(color) {
  const baseRGB = hexToRGB(color);
  const baseHSL = rgbToHSL(baseRGB.r, baseRGB.g, baseRGB.b);
  const baseH = Number.parseInt(baseHSL[0]);

  let colorArray = [baseH - 40, baseH - 20, baseH, baseH + 20, baseH + 40];
  let hslArray = [];
  colorArray.forEach((hsl) => {
    hsl = hsl.toString();
    hslArray.push([hsl, baseHSL[1], baseHSL[2]]);
  });
  return hslArray;
}
//calculations for each harmony
function calculateMonocromatic(color) {
  const baseRGB = hexToRGB(color);
  const baseHSL = rgbToHSL(baseRGB.r, baseRGB.g, baseRGB.b);
  const baseS = Number.parseInt(baseHSL[1]);

  let colorArray = [baseS - 40, baseS - 20, baseS, baseS + 20, baseS + 40];
  let hslArray = [];
  colorArray.forEach((hsl) => {
    hsl = hsl.toString();
    hslArray.push([baseHSL[0], hsl, baseHSL[2]]);
  });
  return hslArray;
}
function calculateTriad(color) {
  const baseRGB = hexToRGB(color);
  const baseHSL = rgbToHSL(baseRGB.r, baseRGB.g, baseRGB.b);
  const baseH = Number.parseInt(baseHSL[0]);

  let colorArray = [baseH + 10, baseH + 120, baseH, baseH + 60, baseH + 80];
  let hslArray = [];
  colorArray.forEach((hsl) => {
    hsl = hsl.toString();
    hslArray.push([hsl, baseHSL[1], baseHSL[2]]);
  });
  return hslArray;
}
function calculateComplementary(color) {
  const baseRGB = hexToRGB(color);
  const baseHSL = rgbToHSL(baseRGB.r, baseRGB.g, baseRGB.b);
  const baseH = Number.parseInt(baseHSL[0]);

  let colorArray = [baseH + 40, baseH + 180, baseH, baseH + 160, baseH + 100];
  let hslArray = [];
  colorArray.forEach((hsl) => {
    hsl = hsl.toString();
    hslArray.push([hsl, baseHSL[1], baseHSL[2]]);
  });
  return hslArray;
}
function calculateCompound(color) {
  const baseRGB = hexToRGB(color);
  const baseHSL = rgbToHSL(baseRGB.r, baseRGB.g, baseRGB.b);
  const baseH = Number.parseInt(baseHSL[0]);

  let colorArray = [baseH + 10, baseH + 20, baseH, baseH + 160, baseH + 180];
  let hslArray = [];
  colorArray.forEach((hsl) => {
    hsl = hsl.toString();
    hslArray.push([hsl, baseHSL[1], baseHSL[2]]);
  });
  return hslArray;
}
function calculateShades(color) {
  const baseRGB = hexToRGB(color);
  const baseHSL = rgbToHSL(baseRGB.r, baseRGB.g, baseRGB.b);
  const baseL = Number.parseInt(baseHSL[2]);

  let colorArray = [baseL + 10, baseL + 20, baseL, baseL + 30, baseL + 40];
  let hslArray = [];
  colorArray.forEach((hsl) => {
    hsl = hsl.toString();
    hslArray.push([baseHSL[0], baseHSL[1], hsl]);
  });
  return hslArray;
}

//with the arrays and the index this functions calls all the show functions
function showColorValues(hex, rgb, hsl, i) {
  showColoredBox(hex, i);
  showHex(hex, i);
  showRGB(rgb, i);
  showHSL(hsl, i);
}
function showColoredBox(color, i) {
  document.querySelectorAll(".box")[i].style.backgroundColor = color;
}
function showHex(color, i) {
  document.querySelectorAll(".hex")[i].textContent = color;
}
function showRGB(color, i) {
  document.querySelectorAll(".rgb")[i].textContent = color;
}
function showHSL(color, i) {
  document.querySelectorAll(".hsl")[i].textContent =
    "(" + color[0] + ", " + color[1] + "%, " + color[2] + "%)";
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
function rgbToHex(r, g, b) {
  let rToHex = r.toString(16).padStart(2, "0");
  let gToHex = g.toString(16).padStart(2, "0");
  let bToHex = b.toString(16).padStart(2, "0");
  let hexColor = "#" + rToHex + gToHex + bToHex;

  return hexColor;
}
//rgb to hsl returns string with hsl array (from assignment description)
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

  return [h, s, l];
}
//hsl to rgb returns rgb-array (from assignment description)
function hslToRGB(h, s, l) {
  h = h;
  s = s / 100;
  l = l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return [r, g, b];
}
